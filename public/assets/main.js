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

const randomThemeButton = document.getElementById('random-theme-button');

randomThemeButton.addEventListener('click', () => {
  randomThemeButton.disabled = true;

  fetch('/assets/themes/index.json')
    .then((response) => response.json())
    .then(({ themes }) => {
      if (themes.length <= 1) {
        randomThemeButton.disabled = false;
        return;
      }

      const themeElement = document.getElementById('theme');

      const currentTheme = themeElement.href.replace(
        window.location.origin,
        '',
      );

      const nextTheme = themes.filter((theme) => theme !== currentTheme)[
        Math.floor(Math.random() * (themes.length - 1))
      ];

      const nextThemeElement = document.createElement('link');
      nextThemeElement.rel = 'stylesheet';
      nextThemeElement.href = nextTheme;

      nextThemeElement.addEventListener('load', () => {
        setTimeout(() => {
          themeElement.parentElement.removeChild(themeElement);
          nextThemeElement.id = 'theme';
          randomThemeButton.disabled = false;
        }, 500);
      });

      themeElement.parentElement.appendChild(nextThemeElement);
    });
});
