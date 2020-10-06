function createAnalytics() : object {
  let counter = 0
  let destroyed: boolean = false

  console.log('test')

  const listener = () : number =>
    counter++

  document.addEventListener('click', listener)

  return {
    destroy() {
      document.removeEventListener('click', listener)
      destroyed = true
    },

    getClicks() {
      if (destroyed) {
        return 'Analytics is destroyed. Total clics =${counter}'
      }
      return counter
    }
  }
}


window['analytics'] = createAnalytics()