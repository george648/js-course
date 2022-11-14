import checkNumInputs from "./checkNumInputs"
import areInputsEmpty from './areInputsEmpty'
import clearObjectValues from './clearObjectValues'

const forms = (modalState) => {
  const form = document.querySelectorAll('form')
  const inputs = document.querySelectorAll('input')

  const messages = {
    loading: 'Загрузка...',
    isLoading: false,
    success: 'Спасибо! Мы скоро с вами свяжемся!',
    failure: 'Упс... Что-то пошло не так!',
    emptyInput: 'Заполните остальные поля'
  }

  checkNumInputs('input[name="user_phone"]')

  const postData = async (url, data) => {
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
      if (item.getAttribute('calc-data') === 'end') {
        for (let key in state) {
          formData.append(key, state[key])
        }
      }

      postData('assets/server.php', formData)
        .then(res => {
          document.querySelector('.status').textContent = messages.loading
          if (!areInputsEmpty('#width') || !areInputsEmpty('#height') || !areInputsEmpty('.checkbox', 'checked')) {
            statusMessage.textContent = messages.emptyInput
            setTimeout(() => {
              statusMessage.remove()
            }, 3000)

            return
          }
          statusMessage.textContent = messages.success
          clearInputs()
          closeModalAfterPostData()
          clearObjectValues(modalState)
          setTimeout(function () {
            statusMessage.remove()
          }, 4000)
        }
        )
        .catch((e) => {
          console.log(e)
          statusMessage.textContent = messages.failure
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
