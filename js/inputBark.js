const smallBark = new Howl({
  src: ["assets/mp3/small-bark.mp3"],
  volume: 1,
})

const inputText = document.querySelector(".input-text-bark")

if (inputText) {
  inputText.addEventListener("input", () => {
    smallBark.play()
  })
}
