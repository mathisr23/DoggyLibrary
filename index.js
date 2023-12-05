//import javascript file
import "./js/inputBark.js"
import "./js/validationDogInput.js"

// Create a Howl instance for your sound
const sound = new Howl({
  src: ["assets/mp3/barkconverterino.mp3"], // Replace with the actual path
})

// Get a reference to the button element
const playSoundButton = document.getElementById("playSoundButton")

// Add a click event listener to the button
playSoundButton.addEventListener("click", () => {
  // Play the sound when the button is clicked
  sound.play()
})
