document.getElementById('settingsButton').addEventListener('click', () => {
  document.getElementById('settingsDialog').showModal();
});

document.getElementById('settingsForm').addEventListener('submit', (event) =>
  requestAnimationFrame(() => {
    if (document.getElementById('settingsDialog').returnValue === 'submit') {
      const dateString = event.target.elements.beginDate.value;
      window.location.hash = `#${dateString}`;

      if (dateString) {
        renderDate(new Date(dateString));
      } else {
        renderHelp();
      }
    }
  }),
);

const MS_TO_SECOND = 1000;
const MS_TO_MINUTE = MS_TO_SECOND * 60;
const MS_TO_HOUR = MS_TO_MINUTE * 60;
const MS_TO_DAY = MS_TO_HOUR * 24;

const timer = document.getElementById('timer');
const help = document.getElementById('help');
let renderIntervalId;

function renderDate(date) {
  const dateTime = date.getTime();
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  const tick = () => {
    let delta = Math.abs(Date.now() - dateTime);
    let pad = 3;

    const days = Math.floor(delta / MS_TO_DAY);
    daysElement.innerText = days.toString().padStart(pad, ' ');
    delta -= days * MS_TO_DAY;
    pad = daysElement.innerText.length;

    const hours = Math.floor(delta / MS_TO_HOUR);
    hoursElement.innerText = hours.toString().padStart(pad, ' ');
    delta -= hours * MS_TO_HOUR;

    const minutes = Math.floor(delta / MS_TO_MINUTE);
    minutesElement.innerText = minutes.toString().padStart(pad, ' ');
    delta -= minutes * MS_TO_MINUTE;

    const seconds = Math.floor(delta / MS_TO_SECOND);
    secondsElement.innerText = seconds.toString().padStart(pad, ' ');
    delta -= seconds * MS_TO_SECOND;

    timer.dateTime = `PT${days}D${hours}H${minutes}M${seconds}S`;
  };

  clearInterval(renderIntervalId);
  renderIntervalId = setInterval(tick, 500);
  tick();
  help.style.display = 'none';
  timer.style.display = 'block';
}

function renderHelp() {
  help.style.display = 'block';
  timer.style.display = 'none';

  clearInterval(renderIntervalId);
}

const hashDate = window.location.hash.substr(1);

if (!isNaN(new Date(hashDate).getTime())) {
  document.getElementById('beginDate').value = hashDate;
  renderDate(new Date(hashDate));
}
