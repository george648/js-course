const images = () => {
  const imgPopup = document.createElement('div')
  const workSection = document.querySelector('.works')
  const bigImage = document.createElement('img')

  imgPopup.classList.add('popup')
  workSection.appendChild(imgPopup)

  imgPopup.style.justifyContent = 'center'
  imgPopup.style.alignItems = 'center'
  imgPopup.style.display = 'none'

  imgPopup.appendChild(bigImage)

  workSection.addEventListener('click', (e) => {
    e.preventDefault()

    let target = e.target

    if (target && target.classList.contains('preview')) {
      imgPopup.style.display = 'flex'
      const path = target.parentNode.getAttribute('href')
      bigImage.setAttribute('src', path)
      bigImage.style.width = '60%'
      bigImage.style.height = '60%'
      disableScroll()
    }

    if (target && target.matches('div.popup')) {
      imgPopup.style.display = 'none'
      enableScroll()
    }
  })

  function disableScroll() {
    document.body.style.overflow = 'hidden'
  }

  function enableScroll() {
    document.body.style.overflow = ''
  }

}

export default images
