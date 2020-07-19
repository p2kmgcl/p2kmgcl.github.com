let canvas = document.getElementById('dotAnimationCanvas');
let context = canvas.getContext('2d');

const toggleBlack = async (button) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const style = getComputedStyle(document.body);
  const maxRadius = Math.max(canvas.width, canvas.height) * 2 + 1;
  const color =
    button.getAttribute('aria-pressed') === 'true' ? '#222' : '#fafafa';
  const transitionDuration =
    500 * parseFloat(style.getPropertyValue('--transition-duration')) || 0;

  const draw = (radius) =>
    new Promise((resolve) => {
      context.beginPath();
      context.arc(canvas.width - 30, 30, radius, 0, Math.PI * 2, true);
      context.closePath();

      context.fillStyle = color;
      context.fill();

      if (radius < maxRadius) {
        requestAnimationFrame(() => {
          draw(radius * 1.1).then(resolve);
        });
      } else {
        resolve();
      }
    });

  await draw(10);
  await new Promise((resolve) => setTimeout(resolve, transitionDuration));
  toggleClass(button);
};

const toggleClass = (button) => {
  document.body.classList.toggle(
    'dark',
    button.getAttribute('aria-pressed') === 'true',
  );
};

function bindButton() {
  const button = document.getElementById('dotAnimationsButton');

  button.addEventListener('click', async () => {
    button.disabled = true;
    button.setAttribute(
      'aria-pressed',
      button.getAttribute('aria-pressed') === 'true' ? 'false' : 'true',
    );

    const { matches: prefersReducedMotion } = matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    if (!prefersReducedMotion) {
      await toggleBlack(button);
    } else {
      toggleClass(button);
    }

    button.disabled = false;
  });
}

bindButton();
