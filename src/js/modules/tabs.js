const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
  const header = document.querySelector(headerSelector),
    tabs = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector)
  
    function hideContent() {
    content.forEach(item => {
      item.style.display = 'none'
    })

    tabs.forEach(tab => {
      tab.classList.remove(activeClass)
    })

  }

  function showTabContent(i = 0) {
    content[i].style.display = display
    tabs[i].classList.remove(activeClass)
  }

  hideContent()
  showTabContent(0)

  header.addEventListener('click', ({ target }) => {
    if (target.classList.contains(tabSelector.replace(/\./, '')) || target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
      tabs.forEach((tab, idx) => {
        if (target === tab || target.parentNode === tab) {
          hideContent()
          showTabContent(idx)
        }
      })
    }
  })
}

export default tabs
