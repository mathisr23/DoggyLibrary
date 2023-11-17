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
    var toggleButton = document.createElement('button');
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

    // Function to check for collisions between the dog and coins
    function checkCoinCollision() {
        var coins = document.querySelectorAll('.coin');
        coins.forEach(function(coin) {
            if (isColliding(dog, coin)) {
                coinContainer.removeChild(coin);
                coinSound.play();
            }
        });
    }

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

    // Start the game initially
    startGame();
});


