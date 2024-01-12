document.addEventListener('DOMContentLoaded', function() {
  // Create or get the dog element
  var dog = document.getElementById('runningDog');
  if (!dog) {
      dog = document.createElement('img');
      dog.id = 'runningDog';
      dog.src = './assets/img/dogRunning.gif'; // Replace with your dog image path
      document.body.appendChild(dog);
  }

  // Create or get the coin container
  var coinContainer = document.getElementById('coinContainer');
  if (!coinContainer) {
      coinContainer = document.createElement('div');
      coinContainer.id = 'coinContainer';
      document.body.appendChild(coinContainer);
  }

  // Create or get the audio element for coin sound
  var coinSound = document.getElementById('coinSound');
  if (!coinSound) {
      coinSound = document.createElement('audio');
      coinSound.id = 'coinSound';
      coinSound.src = './assets/mp3/mixkit-hellhound-monster-attack-dog-wolf-creature-3015.mp3'; // Replace with your sound file path
      document.body.appendChild(coinSound);
  }

  // Create a toggle button
  var toggleButton = document.createElement('a');
  toggleButton.id = 'toggleGameButton';
  toggleButton.innerText = 'ON/OFF';
  toggleButton.style.position = 'absolute';
  toggleButton.style.bottom = '20%';
  toggleButton.style.left = '10px';
  document.body.appendChild(toggleButton);

  var position = 0;
  var speed = 5; // Adjust speed as needed
  var direction = 1; // 1 for right, -1 for left
  var coinInterval = 2000; // Time in milliseconds between new coins
  var coinCreationInterval;
  var animationFrameId;

  // Coin Counter
  var coinCount = 0;
  var coinCounterDisplay = document.createElement('div');
  coinCounterDisplay.id = 'coinCounterDisplay';

  // Create an image element for the coin GIF
  var coinImage = document.createElement('img');
  coinImage.src = './assets/img/bone.gif'; // Replace with the path to your coin GIF
  coinImage.style.width = '30px'; // Set this to the desired size of your coin GIF
  coinImage.style.height = 'auto';
  coinImage.style.verticalAlign = 'middle'; // Align the image with the text

  // Add the coin GIF and the coin count to the coin counter display
  coinCounterDisplay.appendChild(coinImage);
  coinCounterDisplay.innerHTML += ' ' + coinCount; // Add a space before the coin count for separation

  document.body.appendChild(coinCounterDisplay);


  // Shop Button
  var shopButton = document.createElement('a');
  shopButton.id = 'shopButton';
  shopButton.innerText = 'Shop';
  shopButton.style.position = 'absolute';
  shopButton.style.bottom = '20%';
  shopButton.style.left = '86px';
  document.body.appendChild(shopButton);

  // Create the shop container
  var shopContainer = document.createElement('div');
  shopContainer.id = 'shopContainer';
  // Existing style setup
  shopContainer.style.position = 'absolute';
  shopContainer.style.top = '8%';
  shopContainer.style.left = '10px';
  shopContainer.style.backgroundColor = '#FFF';
  shopContainer.style.padding = '10px';
  shopContainer.style.border = '1px solid black';
  shopContainer.style.display = 'none'; // Initially hidden

  // Additional styles for scrollable functionality
  shopContainer.style.width = '300px'; // Set a fixed width or use a percentage
  shopContainer.style.maxHeight = '400px'; // Set a max height to enable scrolling
  shopContainer.style.overflowY = 'scroll'; // Enable vertical scrolling

  document.body.appendChild(shopContainer);
    // Assume each item in shopItems now has a 'category' property
  var shopItems = [
      {id: '1', name: 'Barry Skin', cost: 10, type: 'skin', imagePath: './assets/img/barry.gif', category: 'Skins', speed : 5 },
      {id: '2', name: 'Paper Dog Skin', cost: 30, type: 'skin', imagePath: './assets/img/paper-dog.gif', category: 'Skins', speed : 10 },
      {id: '3', name: 'Moonwalk Carlin Skin', cost: 50, type: 'skin', imagePath: './assets/img/carlin.gif', category: 'Skins', speed : 15 },
      {id: '4', name: 'Hover Animation', cost: 5, type: 'animation', className: 'hover-animation', category: 'Animations' },
      {id: '5', name: 'Coin Dropper', cost: 20, type: 'item', category: 'Items' },
      {id: '6', name: 'Strange Bark', cost: 10, type: 'sound', soundPath: './assets/mp3/bark-guez.mp3', category: 'Sounds' },
      {id: '7', name: 'Custom Scrollbar', cost: 5, type: 'scrollbar', imagePath: './assets/img/dog-scroll.png', category: 'Customizations' },
      {id: '8', name: 'Custom Scrollbar 2', cost: 5, type: 'scrollbar', imagePath: './assets/img/scroll2.png', category: 'Customizations' },
      {id: '9', name: 'Magic Cursor', cost: 5, type: 'cursor', cursorPath: 'url(./assets/img/cursorhead.png) 32 32, auto', category: 'Cursors' },
      {id: '10', name: 'Random Dog Word', cost: 5, type: 'function', functionName: 'generateRandomWordShopItem', category: 'Functions' },

      // ... other items
  ];

function isAdminPage() {
return window.location.search.indexOf('admin') > -1;
}
  
function addCursorStyle(cursorPath) {
    // Create a new style element
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    // Set the innerText with the cursor path, ensuring the syntax is correct for CSS
    styleSheet.innerText = `body { cursor: ${cursorPath}; }`;
    // Append the style element to the head of the document
    document.body.style.cursor = cursorPath;
}

function changeCursor(cursorPath) {
    // For macOS, ensure the image size is 32x32 pixels or less
    // cursorPath should be a URL to the cursor image, ending with .cur or .png
    document.body.style.cursor = cursorPath;
}

  // Function to handle item purchase
function handleItemPurchase(item) {
  // Check if the player has enough coins to make the purchase
  if (coinCount >= item.cost) {
      // Deduct the cost of the item from the player's coin count
      coinCount -= item.cost;
      coinCounterDisplay.innerText = 'Coins: ' + coinCount;

      // Handle the purchase based on the item type
        switch (item.type) {
            case 'skin':
                changeDogSkin(item);
                break;
            case 'sound':
                changeCoinSound(item.soundPath);
                break;
            case 'animation':
                applyAnimationToLinks(item.className);
                break;
            case 'scrollbar':
                changeScrollbar(item.imagePath);
                break;
            case 'cursor':
                if (item.type === 'cursor') {
                    // Here, cursorPath should be something like 'url(./assets/img/cursorhead.png), auto'
                    addCursorStyle(item.cursorPath);
                }
                break;
            case 'item':
                if (item.name === 'Coin Dropper') {
                    activateCoinDropper();
                }
                break;
            case 'function':
                if (window[item.functionName]) {
                    window[item.functionName](); // Call the global function
                } else {
                    console.error('Function not found:', item.functionName);
                }
                break;
          // ... add other cases for different item types if necessary
      }
      alert('You have purchased the ' + item.name + '!');
  } else {
      // If the player doesn't have enough coins, alert them
      alert('You do not have enough coins to buy this item!');
  }
}

// Function to change the scrollbar
function changeScrollbar(imagePath) {
    // Update the scrollbar thumb style
    var styleSheet = document.createElement("style")
    styleSheet.innerText = `
        ::-webkit-scrollbar-thumb {
            background: url('${imagePath}') no-repeat center center;
            border-radius: 8px; /* Rounded corners on the scrollbar thumb */
            background-size: contain; /* Cover will make sure the entire scrollbar is filled */
            border: 4px solid transparent; /* Makes sure the image doesn't get cut off */
            background-clip: padding-box; /* Makes sure the border transparent border is considered for the background */
        }
    `;
    document.head.appendChild(styleSheet);
}

function changeCursor(cursorPath) {
    // Set the cursor style for the body
    document.body.style.cursor = cursorPath; // This will directly change the cursor
}


// Function to add a customization button to a shop item element
function addCustomizationButton(itemElement, shopItem) {
    var customizeButton = document.createElement('button');
    customizeButton.innerText = 'Customize';
    customizeButton.addEventListener('click', function() {
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Accept all image types

        fileInput.onchange = function(e) {
            var file = e.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    // Update the image path in the shopItem and the DOM
                    shopItem.imagePath = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };

        fileInput.click(); // Open the file input dialog
    });

    itemElement.appendChild(customizeButton);
}

// Function to create a preview element for the shop item
function createPreviewElement(item) {
    // Remove existing preview if it exists
    var existingPreview = document.getElementById('preview');
    if (existingPreview) {
        existingPreview.remove();
    }

    // Create a new preview container
    var preview = document.createElement('div');
    preview.id = 'preview';
    preview.style.position = 'fixed';
    preview.style.bottom = '60%';
    preview.style.left = '400px';
    preview.style.border = '1px solid black';
    preview.style.padding = '10px';
    preview.style.backgroundColor = 'white';

    // Add the item image to the preview
    if (item.imagePath) {
        var image = document.createElement('img');
        image.src = item.imagePath;
        image.style.width = '100px'; // Set the size of the preview image
        preview.appendChild(image);
    }

    // Optionally, add the item name or other details to the preview
    var name = document.createElement('p');
    name.innerText = item.name;
    preview.appendChild(name);

    document.body.appendChild(preview);
}

// Function to add a "Buy" button to a shop item element
function addBuyButton(itemElement, shopItem) {
    var buyButton = document.createElement('button');
    buyButton.innerText = 'Buy';
    buyButton.addEventListener('click', function() {
        handleItemPurchase(shopItem);
    });
    itemElement.appendChild(buyButton);
}

// Function to create and append shop items to the DOM
function createAndAppendShopItems(shopContainer, shopItems) {
    shopItems.forEach(function(item) {
        // Create item element
        var itemElement = document.createElement('div');
        itemElement.className = 'shop-item';
        itemElement.id = item.id;
        itemElement.innerText = item.name + ' - ' + item.cost + ' Coins';
        
        // Append item to the shop container
        shopContainer.appendChild(itemElement);

        // Add "Buy" button to the shop item
        addBuyButton(itemElement, item);

        // If the item is a skin, add a customization button and preview functionality
        if (item.type === 'skin') {
            addCustomizationButton(itemElement, item);
            itemElement.addEventListener('mouseover', function() {
                createPreviewElement(item);
            });
            itemElement.addEventListener('mouseout', function() {
                // Optionally, remove preview on mouseout
                var existingPreview = document.getElementById('preview');
                if (existingPreview) {
                    existingPreview.remove();
                }
            });
        }
    });
}

// Function to populate the shop with categorized groups
function populateShop(shopContainer, shopItemsArray) {
    // Clear the container before populating
    shopContainer.innerHTML = '';
    createAndAppendShopItems(shopContainer, shopItemsArray);
}

// Function to activate the Coin Dropper
function activateCoinDropper() {
    setInterval(function() {
        createDroppingCoin();
    }, 5000); // Drop a coin every 5000 milliseconds (5 seconds)
}

// Function to create a dropping coin
function createDroppingCoin() {
    var droppingCoin = document.createElement('img');
    droppingCoin.className = 'dropping-coin';
    droppingCoin.src = './assets/img/bone.gif'; // Replace with your coin image path
    droppingCoin.style.position = 'absolute';
    droppingCoin.style.left = Math.random() * (window.innerWidth - 20) + 'px';
    droppingCoin.style.top = '0px';
    document.body.appendChild(droppingCoin);

    var dropInterval = setInterval(function() {
        var topPosition = parseInt(droppingCoin.style.top);
        topPosition += 5; // Adjust this value for drop speed
        droppingCoin.style.top = topPosition + 'px';

        if (topPosition > window.innerHeight) {
            document.body.removeChild(droppingCoin);
            clearInterval(dropInterval);
        }
    }, 50); // Adjust this value for drop animation speed
}

// Shop Button Toggle Functionality
shopButton.onclick = function() {
    shopContainer.style.display = shopContainer.style.display === 'none' ? 'block' : 'none';
};

function moveDog() {
    if (!gameVisible) {
        return; // Stop if game is not visible
    }

    position += speed * direction;
    dog.style.left = position + 'px';

    checkCoinCollision();

    if (position > window.innerWidth) {
        position = -dog.offsetWidth;
    } else if (position < -dog.offsetWidth) {
        position = window.innerWidth;
    }

    animationFrameId = requestAnimationFrame(moveDog);
}

function startGame() {
    dog.style.display = 'inline-block';
    coinContainer.style.display = 'block';
    moveDog();
    coinCreationInterval = setInterval(createCoin, coinInterval);
}

function stopGame() {
    dog.style.display = 'none';
    coinContainer.style.display = 'none';
    clearInterval(coinCreationInterval);
    cancelAnimationFrame(animationFrameId);
    coinSound.pause();
    coinSound.currentTime = 0;
}

var gameVisible = true; // Initial state
toggleButton.onclick = function() {
    gameVisible = !gameVisible;
    if (gameVisible) {
        startGame();
    } else {
        stopGame();
    }
};

// Function to create a new coin
function createCoin() {
    var coin = document.createElement('img');
    coin.className = 'coin';
    coin.src = './assets/img/bone.gif'; // Replace with your coin image path
    coin.style.left = Math.random() * (window.innerWidth - 20) + 'px';
    coinContainer.appendChild(coin);
}

function checkCoinCollision() {
    var coins = document.querySelectorAll('.coin');
    coins.forEach(function(coin) {
        if (isColliding(dog, coin)) {
            // Ensure the coin is in the coinContainer before attempting to remove it
            if (coinContainer.contains(coin)) {
                coinContainer.removeChild(coin);
            } else {
                // If the coin is not in the container, remove it directly from the body
                document.body.removeChild(coin);
            }
            coinSound.play();
            coinCount++;
            updateCoinCounterDisplay(coinCount); // Update the display with a new function
        }
    });
}

// Function to update the coin counter display with a GIF
function updateCoinCounterDisplay(count) {
    // Clear the current contents of the coin counter display
    coinCounterDisplay.innerHTML = '';

    // Create an image element for the coin GIF
    var coinImage = document.createElement('img');
    coinImage.src = './assets/img/bone.gif'; // Replace with the path to your coin GIF
    coinImage.style.width = '30px'; // Set this to the desired size of your coin GIF
    coinImage.style.height = 'auto';
    coinImage.style.verticalAlign = 'middle'; // Align the image with the text

    // Append the coin GIF to the coin counter display
    coinCounterDisplay.appendChild(coinImage);

    // Create a text node for the coin count and append it
    var coinCountText = document.createTextNode(' ' + count);
    coinCounterDisplay.appendChild(coinCountText);
}


// Function to change dog's skin and speed
function changeDogSkin(skin) {
dog.src = skin.imagePath;
speed = skin.speed; // Update the speed global variable
}



// Function to Apply Animation to Links
function applyAnimationToLinks(className) {
    document.querySelectorAll('a:not(header a):not(footer a)').forEach(function(link) {
        link.classList.add(className);
    });
}

// Function to activate the Coin Dropper
function activateCoinDropper() {
    setInterval(function() {
        createDroppingCoin();
    }, 3000); // Drop a coin every 5000 milliseconds (5 seconds)
}

  // Function to create a dropping coin
function createDroppingCoin() {
  var droppingCoin = document.createElement('img');
  droppingCoin.className = 'coin'; // Add 'coin' class immediately for uniformity
  droppingCoin.src = './assets/img/bone.gif'; // Replace with your coin image path
  droppingCoin.style.position = 'absolute';
  droppingCoin.style.left = Math.random() * (window.innerWidth - 30) + 'px';
  droppingCoin.style.top = '0px';
  document.body.appendChild(droppingCoin);

  var dropInterval = setInterval(function() {
      var topPosition = parseInt(droppingCoin.style.top);
      topPosition += 10; // Adjust this value for drop speed

      var groundLevel = window.innerHeight - 115; // Adjust this value to match the default coin ground level

      if (topPosition < groundLevel) {
          droppingCoin.style.top = topPosition + 'px';
      } else {
          droppingCoin.style.top = groundLevel + 'px'; // Place the coin on the ground
          clearInterval(dropInterval);
      }
  }, 50); // Adjust this value for drop animation speed
}




// Shop Button Toggle Functionality
shopButton.onclick = function() {
    shopContainer.style.display = shopContainer.style.display === 'none' ? 'block' : 'none';
};
// Collision detection function
function isColliding(a, b) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();
    return !(
        aRect.top > bRect.bottom ||
        aRect.bottom < bRect.top ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

// Event listener for arrow key presses to change direction
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        direction = 1;
        dog.style.transform = 'scaleX(1)';
    } else if (e.key === 'ArrowLeft') {
        direction = -1;
        dog.style.transform = 'scaleX(-1)';
    }
});

// Populate the shop once you've defined your items and categories
var shopContainer = document.getElementById('shopContainer');
if (shopContainer) {
    populateShop(shopContainer, shopItems);
} else {
    console.error("The shop container element was not found in the DOM.");
}

// Start the game initially
startGame();
});