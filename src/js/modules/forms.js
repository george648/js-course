import checkNumInputs from "./checkNumInputs"

const forms = () => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input')

  const messages = {
    loading: 'Загрузка...',
    isLoading: false,
    success: 'Спасибо! Мы скоро с вами свяжемся!',
    failure: 'Упс... Что-то пошло не так!'
  }

  checkNumInputs('input[name="user_phone"]')

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = messages.loading
    let res = await fetch(url, {
      method: 'POST',
      body: data
    })
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
      if(item.getAttribute('calc-data') === 'end') {
        for(let key in state) {
          formData.append(key, state[key])
        }
      }

      postData('assets/server.php', formData)
        .then(res => statusMessage.textContent = messages.success)
        .catch(() => statusMessage.textContent = messages.failure)
        .finally(() => {
          clearInputs()
          setTimeout(function () {
            statusMessage.remove()
          }, 4000)
          closeModalAfterPostData()
        })
    })
    function closeModalAfterPostData() {
      setTimeout(function () {
        const finalModal = document.querySelector('.popup_calc_end')
        finalModal.style.display = 'none'  
      }, 5000)
    }
  })
}
export default forms
