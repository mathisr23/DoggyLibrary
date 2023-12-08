window.inputBark = function () {
  const smallBark = new Howl({
    src: ["assets/mp3/small-bark.mp3"],
    volume: 1,
  })

  const inputText = document.querySelectorAll("input")

  if (inputText) {
    inputText.forEach((element) => {
      element.addEventListener("input", () => {
        smallBark.play()
      })
    })
  }
}
