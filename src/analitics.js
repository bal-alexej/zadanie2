function craateAnalytics() {
  let counter = () => counter++

  document.addEventListener(type: 'click', listener)


  return {
    destroy() {
      document.removaEventListener(type: 'click', listener)
    }
  }

}