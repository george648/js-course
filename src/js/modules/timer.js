const timer = (id, deadline) => {
  const addZero = (num) => {
    if (num <= 9) {
      return '0' + num
    } else {
      return num
    }
  }

  const getTimeRemaining = (endTime) => {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      days = Math.floor((t / (1000 * 60 * 60 * 24)))

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
    }
  }

  const setClock = (selector, time) => {
    const timer = document.querySelector(selector)
    const days = timer.querySelector('#days')
    const hours = timer.querySelector('#hours')
    const minutes = timer.querySelector('#minutes')
    const seconds = timer.querySelector('#seconds')
    const timeInterval = setInterval(updateClock, 1000)

    updateClock()

    function updateClock() {
      const t = getTimeRemaining(time)
      days.textContent = addZero(t.days)
      hours.textContent = addZero(t.hours)
      minutes.textContent = addZero(t.minutes)
      seconds.textContent = addZero(t.seconds)

      if (t.total <= 0) {
        days.textContent = '00'
        hours.textContent = '00'
        minutes.textContent = '00'
        seconds.textContent = '00'

        clearInterval(timeInterval)
      }
    }
  }
  setClock(id, deadline)
}

export default timer
