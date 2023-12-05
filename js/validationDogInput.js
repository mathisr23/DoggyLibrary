const passwordInput = document.getElementById("password-input")

passwordInput.addEventListener("input", () => {
  const dogImage = document.getElementById("dog-image")
  const password = passwordInput.value

  const uppText = document.getElementById("upp")
  const lowText = document.getElementById("low")
  const lenText = document.getElementById("len")
  const speText = document.getElementById("spe")

  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasMinLength = password.length >= 8
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  const errorArray = [
    [uppText, hasUpperCase],
    [lowText, hasLowerCase],
    [lenText, hasMinLength],
    [speText, hasSpecialChar],
  ]

  if (errorArray.every((condition) => condition[1])) {
    errorArray.forEach((condition) => {
      condition[0].classList.add("hidden")
    })
    dogImage.classList.add("hidden")
  } else {
    errorArray.forEach((condition) => {
      if (condition[1]) {
        condition[0].classList.add("hidden")
      } else {
        condition[0].classList.remove("hidden")
      }
    })
    dogImage.classList.remove("hidden")
  }
})
