export default element => {
  const animationDuration = element.dataset.animationDuration ? parseInt(element.dataset.animationDuration) : 500
  const hideTimeout = element.dataset.hideTimeout ? parseInt(element.dataset.hideTimeout) : 3000
  const hideListeners = []

  const TIMING = {
    duration: animationDuration,
    fill: 'forwards',
    easing: 'ease-in-out'
  }

  const SHOW_KEYFRAMES = [
    {
      bottom: '-30px',
      opacity: 0
    },
    {
      bottom: '30px',
      opacity: 1
    }
  ]

  const HIDE_KEYFRAMES = [...SHOW_KEYFRAMES].reverse()

  const show = message => {
    // setting the text
    element.innerText = message

    const effect = new KeyframeEffect(element, SHOW_KEYFRAMES, TIMING)

    const animation = new Animation(effect, document.timeline)

    animation.onfinish = () => {
      setTimeout(hide, hideTimeout)
    }

    animation.play()
  }

  const hide = message => {
    const effect = new KeyframeEffect(element, HIDE_KEYFRAMES, TIMING)

    const animation = new Animation(effect, document.timeline)

    animation.onfinish = () => {
      hideListeners.forEach(hideListener => hideListener())
    }

    animation.play()
  }

  const addHideListener = cb => {
    hideListeners.push(cb)
  }

  return {
    show,
    addHideListener
  }
}
