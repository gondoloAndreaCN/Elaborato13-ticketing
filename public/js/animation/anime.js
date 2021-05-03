anime({
  targets: '.navbar .nav-link',
  translateX: [200, 0],
  duration: 1200,
  opacity: [0, 1],
  delay: (el, i) => {
    return 300 + 100 * i;
  },
})

anime({
    targets: '.arrow',
    translateY: 40,
    direction: 'alternate',
    loop: true,
    easing: 'spring(1, 90, 30, 10)',
  })