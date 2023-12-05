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
    coinCounterDisplay.innerText = 'Coins: ' + coinCount;
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
    shopContainer.style.position = 'absolute';
    shopContainer.style.top = '8%';
    shopContainer.style.left = '10px';
    shopContainer.style.backgroundColor = '#FFF';
    shopContainer.style.padding = '10px';
    shopContainer.style.border = '1px solid black';
    shopContainer.style.display = 'none'; // Initially hidden
    document.body.appendChild(shopContainer);
      // Assume each item in shopItems now has a 'category' property
    var shopItems = [
        { name: 'Moonwalk Carlin Skin', cost: 10, type: 'skin', imagePath: './assets/img/carlin.gif', category: 'Skins' },
        { name: 'Dalmatian', cost: 20, type: 'skin', imagePath: './assets/img/dalmatianSkin.gif', category: 'Skins' },
        { name: 'Hover Animation', cost: 5, type: 'animation', className: 'hover-animation', category: 'Animations' },
        { name: 'Coin Dropper', cost: 20, type: 'item', category: 'Items' }
        // ... other items
    ];

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
            case 'animation':
                applyAnimationToLinks(item.className);
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

            categories[category].forEach(function(item) {
                var itemElement = document.createElement('div');
                itemElement.className = 'shop-item';
                itemElement.innerText = item.name + ' - ' + item.cost + ' Coins';
                var buyButton = document.createElement('button');
                buyButton.innerText = 'Buy';
                buyButton.onclick = function() {
                    // Call handleItemPurchase when the button is clicked
                    handleItemPurchase(item);
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
        droppingCoin.src = './assets/img/coin.gif'; // Replace with your coin image path
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
        coin.src = './assets/img/coin.gif'; // Replace with your coin image path
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
                coinCounterDisplay.innerText = 'Coins: ' + coinCount;
            }
        });
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
    droppingCoin.src = './assets/img/coin.gif'; // Replace with your coin image path
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


