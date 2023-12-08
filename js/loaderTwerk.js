document.addEventListener("DOMContentLoaded", function () {
  const dogLoader = document.getElementById("dogLoader")

  if (dogLoader) {
    const loaderCircle = document.getElementById("loader-circle")
    const content = document.querySelector(".content")
    const counter = document.getElementById("counter")
    const loaderImage = document.querySelector(".loader-image")

    let count = 0

    // Update the counter every 50 milliseconds
    const interval = setInterval(function () {
      count += 1
      counter.innerText = count

      if (count >= 100) {
        clearInterval(interval)

        // Hide the loader circle, counter, and GIF; display the content
        if (loaderCircle) {
          loaderCircle.style.display = "none"
        }
        if (counter) {
          counter.style.display = "none"
        }
        if (loaderImage) {
          loaderImage.style.display = "none"
        }
        if (content) {
          content.style.opacity = 1
        }
      }
    }, 50) // Adjust the update frequency according to your needs
  }
})
