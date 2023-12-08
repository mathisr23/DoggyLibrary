window.generateRandomWordShopItem = function() {
  // Function to generate random words
  function generateRandomWord() {
    const dogWords = [
      "WOUAF",
      "CHIEN CHEIN CHIEN",
      "DOGGO DOGGO",
      "BARKKKKKKKKKKKKKKKKKKKKKK",
      "un bon gros toutou là",
      "mmm le bon caca du chien",
    ];

    return getRandomElement(dogWords);
  }

  function getRandomPosition() {
    // Ajustez ces valeurs selon la taille de votre page
    const maxWidth = window.innerWidth - 100 // Largeur maximale de la page - 100 (marge de sécurité)
    const maxHeight = window.innerHeight - 100 // Hauteur maximale de la page - 40 (marge de sécurité)

    const randomX = Math.random() * maxWidth
    const randomY = Math.random() * maxHeight

    return Math.min(randomX, randomY) // Utilisez la plus petite valeur pour éviter que le mot ne sorte des limites
  }

  function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function getRandomFontSize() {
    return Math.floor(Math.random() * 600) + 10; // Font size between 10 and 40 pixels
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Add click event listeners to all images
  const images = document.getElementsByTagName('img');
  for (let img of images) {
    img.addEventListener('click', function() {
      const wordElement = document.createElement("div");
      wordElement.textContent = generateRandomWord();
      wordElement.style.position = "absolute";
      wordElement.style.top = getRandomPosition() + "px"; // Position near the image
      wordElement.style.left = getRandomPosition() + "px"; // Position to the right of the image
      wordElement.style.fontSize = getRandomFontSize() + "px";
      wordElement.style.color = getRandomColor();

      document.body.appendChild(wordElement);

      setTimeout(() => {
        wordElement.remove();
      }, 3000);
    });
  }
}
