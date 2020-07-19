const draw = () => {
  let timeouts = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
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
      element.classList.add('animated');

      setTimeout(() => {
        element.classList.remove('animated');
      }, 200);
    };

    const timeout = timeouts[Math.floor(Math.random() * timeouts.length)];
    timeouts = timeouts.filter((t) => t !== timeout);

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
