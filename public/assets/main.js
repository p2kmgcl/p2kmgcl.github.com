const konamiCode =
  'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
let pressedKeys = '';
let timeoutId = null;
let iterations = 0;

document.addEventListener('keyup', (event) => {
  pressedKeys += event.code;
  clearTimeout(timeoutId);

  if (pressedKeys === konamiCode) {
    pressedKeys = '';
    timeoutId = null;

    document.body.classList.add('konami');
    document.body.dataset.konamiIterations = ++iterations;
  } else if (konamiCode.startsWith(pressedKeys)) {
    timeoutId = setTimeout(() => {
      pressedKeys = '';
    }, 5000);
  } else {
    pressedKeys = '';
  }
});
