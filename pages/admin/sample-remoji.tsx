/* eslint-disable react/no-unescaped-entities */

import emojilib from 'emojilib';
import { useEffect, useRef } from 'react';
import { Article, H2 } from '../../components/HTMLElements';

const emojiList = Object.keys(emojilib);

type Point = { x: number; y: number };
type Thing = { pos: Point; vel: Point; acc: Point };
type Circle = Thing & { radius: number; emoji: string };
const GRAVITY: Point = { x: 0, y: 0 * 100 };

const getCircle = (pos: Point, vel: Point): Circle => {
  return {
    pos,
    vel,
    acc: { x: 0, y: 0 },
    radius: 30,
    emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
  };
};

const add = (p1: Point, p2: Point): Point => {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
};

const multiply = (p: Point, n: number): Point => {
  return { x: p.x * n, y: p.y * n };
};

const update = (t: Thing, delta: number): void => {
  t.pos = add(t.pos, multiply(t.vel, delta));
  t.vel = add(t.vel, multiply(add(t.acc, GRAVITY), delta));
};

const draw = (c: Circle, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(c.pos.x + c.radius, c.pos.y);
  // ctx.arc(c.pos.x, c.pos.y, c.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeText(c.emoji, c.pos.x - c.radius * 0.85, c.pos.y + c.radius * 0.5);
};

export default function SampleRemoji() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    let thingList: Circle[] = [];
    let stop = false;
    let prevTime = Date.now();
    let prevX = 0;
    let prevY = 0;

    const handleMousemove = (event: MouseEvent | TouchEvent) => {
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

    return () => {
      stop = true;
      window.removeEventListener('mousemove', handleMousemove);
      window.removeEventListener('touchmove', handleMousemove);
    };
  }, []);

  return (
    <Article>
      <H2>👀</H2>

      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 1000,
        }}
      ></canvas>
    </Article>
  );
}

SampleRemoji.displayName = 'SampleRemoji';
SampleRemoji.rawContent = true;
