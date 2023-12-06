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
        { name: 'Moonwalk Carlin Skin', cost: 10, type: 'skin', imagePath: './assets/img/carlin.gif', category: 'Skins' },
        { name: 'Barry Skin', cost: 20, type: 'skin', imagePath: './assets/img/barry.gif', category: 'Skins' },
        { name: 'Paper Dog Skin', cost: 20, type: 'skin', imagePath: './assets/img/paper-dog.gif', category: 'Skins' },
        { name: 'Hover Animation', cost: 5, type: 'animation', className: 'hover-animation', category: 'Animations' },
        { name: 'Coin Dropper', cost: 20, type: 'item', category: 'Items' },
        { name: 'Strange Bark', cost: 10, type: 'sound', soundPath: './assets/mp3/bark-guez.mp3', category: 'Sounds' },
        { name: 'Custom Scrollbar', cost: 5, type: 'scrollbar', imagePath: './assets/img/dog-scroll.png', category: 'Customizations' },
        { name: 'Custom Scrollbar 2', cost: 5, type: 'scrollbar', imagePath: './assets/img/scroll2.png', category: 'Customizations' },
        { name: 'Magic Cursor', cost: 5, type: 'cursor', cursorPath: 'url(./assets/img/cursorhead.png) 32 32, auto', category: 'Cursors' }

        // ... other items
    ];
    
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
                changeDogSkin(item.imagePath);
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

    // Function to create a preview element
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

    // Function to populate the shop with categorized groups
    function populateShop(shopContainer, shopItems) {
        const categories = {};

        // Group items by category
        shopItems.forEach(function(item) {
            if (!categories[item.category]) {
                categories[item.category] = [];
            }
            categories[item.category].push(item);
        });

        // Create sections for each category
        Object.keys(categories).forEach(function(category) {
            var categoryDiv = document.createElement('div');
            categoryDiv.className = 'shop-category';
            var categoryTitle = document.createElement('h3');
            categoryTitle.innerText = category;
            categoryDiv.appendChild(categoryTitle);

             // For each item, add an event listener to show the preview
            categories[category].forEach(function(item) {
                var itemElement = document.createElement('div');
                itemElement.className = 'shop-item';
                itemElement.innerText = item.name + ' - ' + item.cost + ' Coins';

                var buyButton = document.createElement('button');
                buyButton.innerText = 'Buy';
                buyButton.onclick = function() {
                    handleItemPurchase(item);
                };

                // Event listener to show preview on mouseover
                itemElement.onmouseover = function() {
                    createPreviewElement(item);
                };

                // Optionally, hide preview on mouseout
                itemElement.onmouseout = function() {
                    var preview = document.getElementById('preview');
                    if (preview) {
                        preview.remove();
                    }
                };

                itemElement.appendChild(buyButton);
                categoryDiv.appendChild(itemElement);
            });

            shopContainer.appendChild(categoryDiv);
        });
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
    

    // Function to Change Dog's Skin
    function changeDogSkin(skinImagePath) {
        dog.src = skinImagePath;
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
    populateShop(shopContainer, shopItems);

    // Start the game initially
    startGame();
});


