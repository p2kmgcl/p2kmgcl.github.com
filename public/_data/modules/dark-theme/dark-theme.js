function bindButton() {
  const button = document.getElementById('darkThemeButton');

  button.addEventListener('click', async () => {
    const toDark = button.getAttribute('aria-pressed') !== 'true';
    localStorage.setItem('selectedTheme', toDark ? 'dark' : 'light');

    button.disabled = true;

    if (matchMedia('(prefers-reduced-motion: reduce)')) {
      await new Promise((resolve) => {
        const tone = toDark ? 34 : 240;
        const color = `rgb(${tone}, ${tone}, ${tone})`;
        const transparent = `rgba(${tone}, ${tone}, ${tone}, 0)`;

        button.style.transition = 'none';
        button.style.boxShadow = `0 0 0 0 ${color}`;

        const onTransitionEnd = () => {
          button.removeEventListener('transitionend', onTransitionEnd);

          button.style.transition =
            'box-shadow ease var(--transition-duration) var(--transition-duration)';
          button.style.boxShadow = `0 0 0 150vmax ${transparent}`;

          resolve();
        };

        setTimeout(() => {
          button.style.transition = 'box-shadow ease-in 1s';
          button.style.boxShadow = `0 0 0 150vmax ${color}`;
          button.addEventListener('transitionend', onTransitionEnd);
        }, 100);
      });
    }

    document.body.classList.toggle('dark', toDark);
    button.setAttribute('aria-pressed', toDark ? 'true' : 'false');
    button.disabled = false;
  });
}

bindButton();
