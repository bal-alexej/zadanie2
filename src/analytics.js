function createAnalytics() {
  let counter = 0
  let Destroyed = false

  console.log('test')

  const listener = () =>
    counter++

  document.addEventListener('click', listener)

  return {
    destroy() {
      document.removeEventListener('click', listener)
      isDestroyed = true
    },

    getClicks() {
      if (Destroyed) {
        return 'Analytics is destroyed. Total clics =${counter}'
      }
      return counter
    }
  }
}


window.analytics = createAnalytics()