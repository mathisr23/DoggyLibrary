document.addEventListener("DOMContentLoaded", function () {
  const dogButton = document.getElementById("dogChangeWp")

  if (dogButton) {
    // Liste d'URLs d'images de chiens
    const dogWallpapers = [
      "goofy1.jpg",
      "goofy2.jpg",
      "goofy3.jpg",
      "goofy4.jpg",
      // Ajoutez autant d'URLs que nécessaire
    ]

    dogButton.addEventListener("click", function () {
      changeWallpaper()
    })

    function changeWallpaper() {
      const randomWallpaper = getRandomElement(dogWallpapers)
      document.body.style.backgroundImage = `url('./assets/img/${randomWallpaper}')`
    }

    function getRandomElement(array) {
      const randomIndex = Math.floor(Math.random() * array.length)
      return array[randomIndex]
    }
  }
})
