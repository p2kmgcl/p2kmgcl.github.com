import { useEffect, useMemo, useRef } from 'react';
import type { RoughCanvas } from 'roughjs/bin/canvas';
import type { Point } from 'roughjs/bin/geometry';

const getRelativeValue = (canvas: HTMLCanvasElement, x: number, y: number) =>
  [canvas.width * (x / 100), canvas.height * (y / 100)] as Point;

const getBrownianPoint = (initialX: number, initialY: number) => {
  let x = initialX;
  let y = initialY;

  return {
    update() {},

    get(canvas: HTMLCanvasElement) {
      return getRelativeValue(canvas, x, y);
    },
  };
};

const bp1 = getBrownianPoint(60, 100);

const drawFrame = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  rg: RoughCanvas,
) => {
  const _ = (x: number, y: number) => getRelativeValue(canvas, x, y);

  bp1.update();

  rg.polygon([_(0, 0), _(0, 40), bp1.get(canvas), _(100, 0)], {
    fill: '#ffeb3b',
  });

  rg.polygon([_(0, 100), _(100, 0), _(60, 100)]);
  rg.polygon([_(60, 100), _(100, 40), _(100, 100)]);
  rg.polygon([_(3, 64), _(8, 96), _(20, 69)]);
  rg.polygon([_(8, 34), _(12, 4), _(25, 25)]);

  rg.polygon([
    _(39, 4),
    _(33, 32),
    _(42, 32),
    _(38, 44),
    _(54, 44),
    _(50, 32),
    _(59, 33),
    _(49, 7),
    _(45, 17),
  ]);
};

const draw = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  rg: RoughCanvas,
  signal: AbortSignal,
) => {
  const loop = () => {
    if (!signal.aborted) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth * 0.5625;
      drawFrame(canvas, context, rg);
      setTimeout(loop, 1000 / 10);
    }
  };

  loop();
};

export default function AdminLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const title = useMemo(
    () =>
      process.browser
        ? new URL(window.location.href).searchParams.get('title')
        : '',
    [],
  );

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
            fillStyle: 'cross-hatch',
            hachureGap: 2,
            hachureAngle: Math.random() * 90,
            fillWeight: 1,
            roughness: 0.4,
            stroke: 'transparent',
          },
        });
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
      <h1
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '9.5vw',
          fontWeight: 'bolder',
          position: 'absolute',
          top: '4vw',
          left: '10vw',
          lineHeight: 1.1,
          color: '#111',
        }}
      >
        {title}
      </h1>
      <div
        style={{
          position: 'absolute',
          right: '4vw',
          bottom: '4vw',
          zIndex: -1,
          textAlign: 'right',
          fontSize: '1.7vw',
          color: '#666',
          fontWeight: 'bold',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://avatars.githubusercontent.com/u/800645?v=4"
          style={{ width: '8vw' }}
          alt=""
        />
        <div>@p2kmgcl</div>
        <div>pablomolina.me</div>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          boxShadow: 'inset 0 0 0 1px transparent',
          zIndex: -1,
        }}
      />
    </>
  );
}

AdminLayer.rawContent = true;
