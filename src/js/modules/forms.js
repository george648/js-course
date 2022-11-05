const forms = () => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    phoneInputs = document.querySelectorAll('input[name="user_phone"]')

  const messages = {
    loading: 'Загрузка...',
    isLoading: false,
    success: 'Спасибо! Мы скоро с вами свяжемся!',
    failure: 'Упс... Что-то пошло не так!'
  }

  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      input.value = input.value.replace(/\D/, '')
    })
  })

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = messages.loading
    let res = await fetch(url, {
      method: 'POST',
      body: data
    })
    console.log(res)
    return await res.text()
  }

  const clearInputs = () => {
    inputs.forEach(input => input.value = '')
  }

  form.forEach(item => {
    item.addEventListener('submit', e => {
      e.preventDefault()

      let statusMessage = document.createElement('div')
      statusMessage.classList.add('status')
      item.appendChild(statusMessage)

      const formData = new FormData(item)

      postData('assets/server.php', formData)
        .then(res => statusMessage.textContent = messages.success)
        .catch(() => statusMessage.textContent = messages.failure)
        .finally(() => {
          clearInputs()
          setTimeout(function () {
            statusMessage.remove()
          }, 5000)
        })
    })
  })
}

export default forms