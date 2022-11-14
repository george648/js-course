const areInputsEmpty = (selector, event) => {
  const checkedInput = document.querySelectorAll(selector)
  let isInputEmpty = false
  let validatedInput

  checkedInput.forEach(input => {
    if (event === 'checked') {
      const inputArray = Array.from(checkedInput)
      const res = inputArray.some(elem => elem.checked)
      res ? validatedInput = false : validatedInput = true  
    }

    input.value.trim() ? isInputEmpty = true : isInputEmpty = false
  })

  return isInputEmpty || validatedInput
}

export default areInputsEmpty
