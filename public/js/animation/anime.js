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

// Registrazione

anime({
  targets: '.decoration .el',
  translateX: function (el) {
    return  - el.getAttribute('data-x');
  },
  translateY: function(el, i) {
    return 120 + (-100 * i);
  },
  scale: function(el, i, l) {
    return (l - i) + .25;
  },
  rotate: function() { return anime.random(-360, 360); },
  borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
  duration: function() { return anime.random(1200, 1800); },
  delay: function() { return anime.random(0, 400); },
  // direction: 'alternate',
  // loop: true
});
