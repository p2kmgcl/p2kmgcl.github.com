import { useEffect, useMemo, useRef, useState } from 'react';
import type { RoughCanvas } from 'roughjs/bin/canvas';
import { Drawable } from 'roughjs/bin/core';
import type { Point } from 'roughjs/bin/geometry';

const getRelativeValue = (canvas: HTMLCanvasElement, x: number, y: number) =>
  [canvas.width * (x / 100), canvas.height * (y / 100)] as Point;

const getBrownianPoint = (
  initialX: number,
  initialY: number,
  maxRadius: number,
) => {
  const velocity = 1;
  let x = initialX;
  let y = initialY;
  let angle = Math.random() * Math.PI * 2;
  let angleDirection = 1;
  let radius = 0;
  let radiusDirection = 1;

  return {
    update(delta: number) {
      if (maxRadius === 0) {
        return;
      }

      const angleDelta = Math.random() * velocity;

      if (angleDelta < 0.01) {
        angleDirection = angleDirection * -1;
      }

      angle = angle + angleDelta * angleDirection * delta;
      radius = radius + Math.random() * velocity * radiusDirection * delta;

      if (radius > maxRadius || radius <= 0) {
        radiusDirection = radiusDirection * -1;
      }
    },

    get(canvas: HTMLCanvasElement) {
      return getRelativeValue(
        canvas,
        x + Math.cos(angle) * radius,
        y - Math.abs(Math.sin(angle) * radius),
      );
    },
  };
};

const points: Map<string, ReturnType<typeof getBrownianPoint>> = new Map();
const polygons: Map<string, Drawable> = new Map();
let accDelta = 0;

const drawFrame = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  rg: RoughCanvas,
  delta: number,
) => {
  accDelta += delta;

  const _ = (x: number, y: number, maxRadius: number = 4) => {
    const key = `${x}-${y}-${maxRadius}`;
    let point = points.get(key);

    if (!point) {
      point = getBrownianPoint(x, y, maxRadius);
      points.set(key, point);
    }

    return point.get(canvas);
  };

  const __ = (key: string, getPolygon: () => Drawable) => {
    const polygon = polygons.get(key);

    if (polygon) {
      rg.draw(polygon);
    } else {
      polygons.set(key, getPolygon());
    }
  };

  rg.polygon([_(0, 0, 0), _(0, 40, 0), _(60, 100, 20), _(100, 0, 0)], {
    fill: '#ffeb3b',
    fillStyle: 'solid',
    roughness: 0,
  });

  __('a', () => rg.polygon([_(0, 100, 0), _(100, 0, 0), _(60, 100, 20)]));
  __('b', () => rg.polygon([_(60, 100, 20), _(100, 40, 0), _(100, 100, 0)]));
  __('c', () => rg.polygon([_(3, 64), _(8, 96), _(20, 69)]));
  __('d', () => rg.polygon([_(8, 34), _(12, 4), _(25, 25)]));

  __('e', () =>
    rg.polygon([
      _(39, 4, 3),
      _(33, 32, 3),
      _(42, 32, 3),
      _(38, 44, 3),
      _(54, 44, 3),
      _(50, 32, 3),
      _(59, 33, 3),
      _(49, 7, 3),
      _(45, 17, 3),
    ]),
  );

  points.forEach((point) => {
    point.update(delta);
  });

  if (accDelta > 0.2) {
    accDelta = 0;
    polygons.clear();
  }
};

const draw = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  rg: RoughCanvas,
  signal: AbortSignal,
) => {
  let before = Date.now();

  const loop = () => {
    if (!signal.aborted) {
      const now = Date.now();
      const delta = (now - before) / 1000;
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawFrame(canvas, context, rg, delta);
      before = now;
      requestAnimationFrame(loop);
    }
  };

  loop();
};

export default function AdminLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const title = useMemo(
    () =>
      process.browser
        ? new URL(window.location.href).searchParams.get('title') || 'Sample'
        : 'Sample',
    [],
  );
  const bg = useMemo(
    () =>
      process.browser
        ? new URL(window.location.href).searchParams.get('bg')
        : '',
    [],
  );
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerWidth * 0.5625,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const abortController = new AbortController();
    const canvas = canvasRef.current;

    import('roughjs/bin/rough').then((roughModule) => {
      if (!abortController.signal.aborted) {
        const rg = roughModule.default.canvas(canvas, {
          options: {
            fill: 'rgba(0, 0, 0, 0.05)',
            fillStyle: 'hatch',
            hachureGap: 12,
            hachureAngle: 137,
            fillWeight: 4,
            roughness: 10,
            maxRandomnessOffset: 0.5,
            stroke: 'rgba(0, 0, 0, 0.05)',
            strokeWidth: 6,
          },
        });

        canvas.width = 1920;
        canvas.height = 1080;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        draw(canvas, context, rg, abortController.signal);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        body {margin: 0 !important;}
        #__next {max-width: initial !important; width: 100vw !important;}
      `}</style>

      <div
        style={{
          position: 'relative',
          width: windowSize.width,
          height: windowSize.height,
        }}
      >
        <h1
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: `${Math.max(4.5, Math.min(8.5, 360 / title.length))}vw`,
            fontWeight: 'bolder',
            position: 'absolute',
            top: '4vw',
            left: '10vw',
            lineHeight: 1.1,
            color: '#111',
            maxWidth: '75vw',
          }}
        >
          {title}
        </h1>
        <div
          style={{
            position: 'absolute',
            right: '4vw',
            bottom: '4vw',
            zIndex: 0,
            textAlign: 'right',
            fontSize: '1.7vw',
            color: '#666',
            fontWeight: 'bold',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/avatar.png" style={{ width: '8vw' }} alt="" />
          <div>@p2kmgcl</div>
          <div>pablomolina.me</div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '56.25vw',
          zIndex: -1,
          opacity: 1,
        }}
      />
      {bg ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '56.25vw',
            zIndex: -2,
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            opacity: 0.3,
          }}
        />
      ) : null}
    </>
  );
}

AdminLayer.rawContent = true;
