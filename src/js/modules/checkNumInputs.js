const checkNumInputs = (selector) => {
  const numInputs = document.querySelectorAll(selector)

  numInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      input.value = input.value.replace(/\D/, '')
    })
  })
}

export default checkNumInputs
