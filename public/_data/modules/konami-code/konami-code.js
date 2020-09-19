const unicorn = document.createElement('img');
const konamiCode =
  'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
let pressedKeys = '';
let timeoutId = null;
let fromLeft = Math.random() < 0.5;
const width = 500;
const height = 300;

const konami = () => {
  fromLeft = !fromLeft;

  unicorn.style.position = 'fixed';
  unicorn.style.transition = 'left linear 2s, top linear 2s';

  if (fromLeft) {
    unicorn.style.transform = 'rotateY(180deg)';
  } else {
    unicorn.style.transform = '';
  }

  unicorn.style.left = `${fromLeft ? -width : window.innerWidth + width}px`;
  unicorn.style.top = `${Math.floor(
    Math.random() * (window.innerHeight - height * 2) + height,
  )}px`;

  document.body.appendChild(unicorn);

  requestAnimationFrame(() => {
    unicorn.style.left = `${fromLeft ? window.innerWidth + width : -width}px`;
    unicorn.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
  });

  const onEnd = () => {
    unicorn.removeEventListener('transitionend', onEnd);
    document.body.removeChild(unicorn);
  };

  unicorn.addEventListener('transitionend', onEnd);
};

document.addEventListener('keyup', (event) => {
  pressedKeys += event.code;
  clearTimeout(timeoutId);

  if (pressedKeys === konamiCode) {
    pressedKeys = '';
    timeoutId = null;
    konami();
  } else if (konamiCode.startsWith(pressedKeys)) {
    if (!unicorn.src) {
      unicorn.src = '/assets/unicorn.png';
    }

    timeoutId = setTimeout(() => {
      pressedKeys = '';
    }, 5000);
  } else {
    pressedKeys = '';
  }
});
