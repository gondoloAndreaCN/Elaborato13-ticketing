// anime({
//     targets: '.square',
//     translateX: (document.body.scrollWidth / 2) - 25,
//     scale: 2,
//     rotate: '1turn',
//     duration: 3000
// });

anime({
    targets: '.arrow',
    // translateY: (document.body.scrollHeight / 2) - 10,
    translateY: 50,
    direction: 'alternate',
    loop: true,
    easing: 'spring(1, 90, 15, 4)',
  })