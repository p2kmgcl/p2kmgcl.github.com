import { useEffect, useRef } from 'react';
import type { RoughCanvas } from 'roughjs/bin/canvas';
import type { Point } from 'roughjs/bin/geometry';

const drawFrame = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  rg: RoughCanvas,
) => {
  const h = (value: number) => canvas.height * (value / 100);
  const w = (value: number) => canvas.width * (value / 100);
  const point = (x: number, y: number) => [w(x), h(y)] as Point;

  rg.polygon([point(0, 0), point(0, 40), point(60, 100), point(100, 0)], {
    fill: '#ffeb3b',
  });

  rg.polygon([point(0, 100), point(100, 0), point(60, 100)], {
    fill: 'rgba(0, 0, 0, 0.1)',
  });
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
            fill: 'black',
            fillStyle: 'cross-hatch',
            hachureGap: 4,
            hachureAngle: Math.random() * 90,
            fillWeight: 1,
            roughness: 0.4,
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
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        boxShadow: 'inset 0 0 0 1px black',
      }}
    />
  );
}

AdminLayer.rawContent = true;
