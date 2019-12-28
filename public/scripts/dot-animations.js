let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const inRange = (min, max) => (value) => {
  return value >= min && value <= max;
};

class Dot {
  constructor(initialX, initialY) {
    this.dir = 'down';
    this.size = 4;
    this.speed = 5;
    this.color = '#000';
    this.prevX = initialX;
    this.prevY = initialY;
    this.x = initialX;
    this.y = initialY;
  }

  update() {
    this.prevX = this.x;
    this.prevY = this.y;

    switch (this.dir) {
      case 'up':
        this.y -= this.speed;
        break;
      case 'down':
        this.y += this.speed;
        break;
      case 'left':
        this.x -= this.speed;
        break;
      case 'right':
        this.x += this.speed;
        break;
    }
  }

  flip() {
    const maxY = canvas.height - this.size;
    const maxX = canvas.width - this.size;

    if (this.dir === 'down' && inRange(maxY, Infinity)(this.y)) {
      this.y = maxY;
      this.dir = 'right';
    } else if (this.dir === 'right' && inRange(maxX, Infinity)(this.x)) {
      this.x = maxX;
      this.dir = 'up';
    } else if (this.dir === 'up' && inRange(-Infinity, 0)(this.y)) {
      this.y = 0;
      this.dir = 'left';
    } else if (this.dir === 'left' && inRange(-Infinity, 0)(this.x)) {
      this.x = 0;
      this.dir = 'down';
    }
  }

  draw() {
    context.moveTo(this.x, this.y);
    context.beginPath();

    context.rect(
      Math.min(this.prevX, this.x),
      Math.min(this.prevY, this.y),
      Math.abs(this.prevX - this.x) + this.size,
      Math.abs(this.prevY - this.y) + this.size,
    );

    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
}

const randomDots = () => {
  let dots = [];

  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const dot = new Dot(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
      );

      dot.speed = 1;
      dot.color = `rgba(255, 255, 255, ${Math.random() / 5})`;
      dot.dir = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
      dots.push(dot);
    }, Math.random() * 5000 * i);
  }

  const draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    dots.forEach((dot) => {
      dot.update();
      dot.flip();
      dot.draw();

      if (Math.random() < 0.01) {
        dot.dir = ['up', 'down', 'left', 'right'][
          Math.floor(Math.random() * 4)
        ];
      }
    });

    requestAnimationFrame(draw);
  };

  draw();
};

const goBlack = () => {
  const ref = document.querySelector('.link:last-child');
  const refClientRect = ref.getBoundingClientRect();

  const dot = new Dot(
    refClientRect.left + refClientRect.width / 2,
    refClientRect.bottom - refClientRect.height / 2,
  );

  const dotMaxSize = Math.min(canvas.height, canvas.width) * 0.7;
  let dotLastDir = dot.dir;
  let maskOpacity = 1;

  const draw = () => {
    context.fillStyle = `rgba(255, 255, 255, ${maskOpacity})`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    dot.update();
    dot.flip();
    dot.draw();

    if (dot.dir !== dotLastDir) {
      dot.size *= 1.1;
      dotLastDir = dot.dir;
    }

    dot.speed *= 1.02;
    maskOpacity = Math.max(0, maskOpacity - 0.005);

    if (dot.size >= dotMaxSize) {
      document.body.classList.add('white');
      setTimeout(randomDots, 1000);
    } else {
      requestAnimationFrame(draw);
    }
  };

  const begin = () => {
    ref.removeEventListener('animationstart', begin);
    setTimeout(draw, 100);
  };

  ref.addEventListener('animationstart', begin);
};

goBlack();
