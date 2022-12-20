---
layout: '../../../layouts/EntryRaw.astro'
tags: [post]
type: link
title: Flying emojis
pubDate: 2021-06-23
language: en
emoji: 😵‍💫
summary: Test to check how to create a page with flying emojis that follow the cursor.
---

<canvas id="c"></canvas>

<script type="module">
  const emojiList = Object.keys(
    await fetch('https://unpkg.com/emojilib').then(r => r.json())
  );

  const GRAVITY = { x: 0, y: 0 * 100 };

  const getCircle = (pos, vel) => ({
    pos, vel, acc: { x: 0, y: 0 },
    radius: 30,
    emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
  });

  const add = (p1, p2) => ({ x: p1.x + p2.x, y: p1.y + p2.y });
  const multiply = (p, n) => ({ x: p.x * n, y: p.y * n });

  const update = (t, delta) => {
    t.pos = add(t.pos, multiply(t.vel, delta));
    t.vel = add(t.vel, multiply(add(t.acc, GRAVITY), delta));
  };

  const draw = (c, ctx) => {
    ctx.beginPath();
    ctx.moveTo(c.pos.x + c.radius, c.pos.y);
    // ctx.arc(c.pos.x, c.pos.y, c.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeText(c.emoji, c.pos.x - c.radius * 0.85, c.pos.y + c.radius * 0.5);
  };

  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');

  let thingList = [];
  let stop = false;
  let prevTime = Date.now();
  let prevX = 0;
  let prevY = 0;

  const handleMousemove = (event) => {
    event.preventDefault();

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;

    if (event instanceof MouseEvent) {
      x = event.clientX;
      y = event.clientY;
      vx = (x - prevX) * 30;
      vy = (y - prevY) * 30;
    } else {
      const touch = event.touches[0];
      x = touch.clientX;
      y = touch.clientY;
      vx = (x - prevX) * 4;
      vy = (y - prevY) * 4;
    }

    if (vx === 0 && vy === 0) {
      return;
    }

    thingList.push(getCircle({ x, y }, { x: vx, y: vy }));

    if (thingList.length > 2000) {
      thingList = thingList.slice(0, 1000);
    }

    prevX = x;
    prevY = y;
  };

  const render = () => {
    const now = Date.now();
    const delta = (now - prevTime) / 1000;

    ctx.font = 'bold 40px serif';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const thing of thingList) {
      update(thing, delta);
    }

    thingList = thingList.filter(
      (thing) =>
        thing.pos.y - thing.radius <= window.innerHeight &&
        thing.pos.y + thing.radius >= 0 &&
        thing.pos.x - thing.radius <= window.innerWidth &&
        thing.pos.x + thing.radius >= 0,
    );

    for (const thing of thingList) {
      draw(thing, ctx);
    }

    prevTime = now;
    if (!stop) requestAnimationFrame(render);
  };

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
  window.addEventListener('mousemove', handleMousemove);
  window.addEventListener('touchmove', handleMousemove);
</script>
