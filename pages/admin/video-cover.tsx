import { useEffect, useMemo, useRef } from 'react';
import type { RoughCanvas } from 'roughjs/bin/canvas';
import { Drawable } from 'roughjs/bin/core';
import type { Point } from 'roughjs/bin/geometry';

const points: Map<string, ReturnType<typeof getBrownianPoint>> = new Map();
const polygons: Map<string, Drawable> = new Map();
let accDelta = 0;

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

const getPoint =
  (canvas: HTMLCanvasElement) =>
  (x: number, y: number, maxRadius: number = 4) => {
    const key = `${x}-${y}-${maxRadius}`;
    let point = points.get(key);

    if (!point) {
      point = getBrownianPoint(x, y, maxRadius);
      points.set(key, point);
    }

    return point.get(canvas);
  };

const drawPolygon =
  (rg: RoughCanvas) => (key: string, getPolygon: () => Drawable) => {
    const polygon = polygons.get(key);

    if (polygon) {
      rg.draw(polygon);
    } else {
      polygons.set(key, getPolygon());
    }
  };

const drawMainFrame = (
  canvas: HTMLCanvasElement,
  rg: RoughCanvas,
  delta: number,
) => {
  accDelta += delta;
  const _ = getPoint(canvas);
  const __ = drawPolygon(rg);

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

const drawSecondaryFrame = (
  canvas: HTMLCanvasElement,
  rg: RoughCanvas,
  delta: number,
) => {
  accDelta += delta;
  const _ = getPoint(canvas);
  const __ = drawPolygon(rg);

  [0, 1, 2, 3, 4].forEach((id, index, array) => {
    const size = 100 / array.length;
    const delta = size * index;

    __(`l-${id}`, () =>
      rg.polygon([
        _(0, delta, 1),
        _(10, size / 2 + delta, 1),
        _(0, size + delta, 1),
      ]),
    );

    __(`r-${id}`, () =>
      rg.polygon([
        _(100, delta, 1),
        _(90, size / 2 + delta, 1),
        _(100, size + delta, 1),
      ]),
    );
  });

  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((id, index, array) => {
    const size = 100 / array.length;
    const delta = size * index;

    __(`t-${id}`, () =>
      rg.polygon([
        _(delta, 0, 1),
        _(size / 2 + delta, 10, 1),
        _(size + delta, 0, 1),
      ]),
    );

    __(`b-${id}`, () =>
      rg.polygon([
        _(delta, 100, 1),
        _(size / 2 + delta, 90, 1),
        _(size + delta, 100, 1),
      ]),
    );
  });

  points.forEach((point) => {
    point.update(delta);
  });

  if (accDelta > 1) {
    accDelta = 0;
    polygons.clear();
  }
};

const draw = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  rg: RoughCanvas,
  signal: AbortSignal,
  fn: (canvas: HTMLCanvasElement, rg: RoughCanvas, delta: number) => void,
) => {
  let before = Date.now();

  const loop = () => {
    if (!signal.aborted) {
      const now = Date.now();
      const delta = (now - before) / 1000;
      context.clearRect(0, 0, canvas.width, canvas.height);
      fn(canvas, rg, delta);
      before = now;
      requestAnimationFrame(loop);
    }
  };

  loop();
};

export default function VideoCover() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [title, titleFontSize] = useMemo(() => {
    const title = process.browser
      ? new URL(window.location.href).searchParams.get('title') || 'Sample'
      : 'Sample';

    return [title, Math.max(4.5, Math.min(8.5, 360 / title.length))];
  }, []);

  const bg = useMemo(
    () =>
      process.browser
        ? new URL(window.location.href).searchParams.get('bg')
        : '',
    [],
  );

  const frame = useMemo(
    () =>
      process.browser &&
      new URL(window.location.href).searchParams.has('secondary')
        ? drawSecondaryFrame
        : drawMainFrame,
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
            fill: `rgba(0, 0, 0, ${frame === drawMainFrame ? 0.05 : 0.25})`,
            fillStyle: 'hatch',
            hachureGap: 12,
            hachureAngle: 137,
            fillWeight: 4,
            roughness: 10,
            maxRandomnessOffset: 0.5,
            stroke: `rgba(0, 0, 0, ${frame === drawMainFrame ? 0.05 : 0.25})`,
            strokeWidth: 6,
          },
        });

        canvas.width = 1920;
        canvas.height = 1080;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        draw(canvas, context, rg, abortController.signal, frame);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [frame]);

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
        body {
          margin: 0 !important;
          padding: 0 !important;
          font-family: 'JetBrains Mono', monospace !important;
        }

        #__next {
          height: 100vh !important;
          width: 100vw !important;
        }

        .coverWrapper {
          position: relative;
          width: 100vw;
          height: 100vh;
        }

        .coverTitle {
          font-weight: bolder;
          position: absolute;
          top: 4vw;
          left: 10vw;
          line-height: 1.1;
          color: #111;
          max-width: '75vw';
        }

        .coverAvatar {
          position: absolute;
          right: 4vw;
          bottom: 4vw;
          z-index: 0;
          text-align: right;
          font-size: 1.7vw;
          color: #666;
          font-weight: bold;
        }

        .coverCanvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          opacity: 1;
        }

        .coverBackground {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -2;
          background-size: cover;
          opacity: 0.3;
        }
      `}</style>

      <div className="coverWrapper">
        {frame === drawMainFrame ? (
          <h1 className="coverTitle" style={{ fontSize: `${titleFontSize}vw` }}>
            {title}
          </h1>
        ) : null}
        {frame === drawMainFrame ? (
          <div className="coverAvatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar.png" style={{ width: '8vw' }} alt="" />
            <div>@p2kmgcl</div>
            <div>pablomolina.me</div>
          </div>
        ) : null}
      </div>
      <canvas className="coverCanvas" ref={canvasRef} />
      {bg ? <div style={{ backgroundImage: `url(${bg})` }} /> : null}
    </>
  );
}

VideoCover.displayName = 'VideoCover';
VideoCover.rawContent = true;
