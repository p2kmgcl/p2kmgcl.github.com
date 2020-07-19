const { matches: prefersDark } = matchMedia('(prefers-color-scheme: dark)');

if (prefersDark) {
  const button = document.querySelector('button');
  document.body.style.transition = 'none';
  document.body.classList.add('dark');
  button.setAttribute('aria-pressed', true);

  requestAnimationFrame(() => {
    document.body.style.transition = '';
  });
}
