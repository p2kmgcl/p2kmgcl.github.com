const DEFAULT_TIMEOUTS = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];

const draw = () => {
  let timeouts = DEFAULT_TIMEOUTS;
  const title = document.getElementById('title');

  title.innerHTML = title.innerHTML
    .split('')
    .map((letter) =>
      letter === ' '
        ? '<br>'
        : `<span data-letter="${letter}">${letter}</span>`,
    )
    .join('');

  const letters = title.querySelectorAll('span');

  letters.forEach((element) => {
    element.classList.add('title-fragment');

    const glitch = () => {
      const speedA = Math.random() * 200 + 50;
      const speedB = Math.random() * 200 + 50;
      const speedC = Math.random() * 200 + 50;
      const duration = (Math.random() + 1) * Math.max(speedA, speedB, speedC);
      const glitchness = Math.random() * 5 + 5;

      element.style.setProperty('--glitch-translate', `${glitchness / 100}em`);
      element.style.setProperty('--glitch-skew', `${glitchness}deg`);
      element.style.setProperty('--glitch-speed-a', `${speedA}ms`);
      element.style.setProperty('--glitch-speed-b', `${speedB}ms`);
      element.style.setProperty('--glitch-speed-c', `${speedC}ms`);

      element.classList.add('animated');

      setTimeout(() => {
        element.classList.remove('animated');
      }, duration);
    };

    const timeout = timeouts[Math.floor(Math.random() * timeouts.length)];
    timeouts = timeouts.filter((t) => t !== timeout);

    if (!timeouts.length) {
      timeouts = DEFAULT_TIMEOUTS;
    }

    glitch();
    setInterval(glitch, 2000 + 1000 * timeout);
  });
};

const { matches: prefersReducedMotion } = matchMedia(
  '(prefers-reduced-motion: reduce)',
);

if (!prefersReducedMotion) {
  setTimeout(draw, 4000);
}
