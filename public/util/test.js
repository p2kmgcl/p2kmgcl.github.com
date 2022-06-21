const mochaStyles = document.createElement('style');
mochaStyles.appendChild(
  document.createTextNode(
    await fetch('https://unpkg.com/mocha/mocha.css').then((r) => r.text()),
  ),
);

const mochaDiv = document.createElement('div');
mochaDiv.id = 'mocha';

const chaiScript = document.createElement('script');
chaiScript.appendChild(
  document.createTextNode(
    await fetch('https://unpkg.com/chai/chai.js').then((r) => r.text()),
  ),
);

const mochaScript = document.createElement('script');
mochaScript.appendChild(
  document.createTextNode(
    await fetch('https://unpkg.com/mocha/mocha.js').then((r) => r.text()),
  ),
);

document.head.appendChild(mochaStyles);
document.getElementById('__next').appendChild(mochaDiv);
document.body.appendChild(chaiScript);
document.body.appendChild(mochaScript);

mocha.setup('bdd');
mocha.checkLeaks();
window.expect = chai.expect;

requestAnimationFrame(() => {
  mocha.run();
});
