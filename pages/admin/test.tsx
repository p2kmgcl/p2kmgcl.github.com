import Head from 'next/head';
import { useLayoutEffect, useRef } from 'react';
import { classNames } from '../../utils/classNames';
import { useHasMounted } from '../../utils/useHasMounted';
import useQueryState from '../../utils/useQueryState';

const style = `
  body {
    background: #eee;
    font-family: system-ui;
  }

  .wrapper {
    display: grid;
    grid-template-columns: repeat(var(--column-count), 1fr);
    gap: 20px;
    padding: 20px;
  }

  .preview {
    position: relative;
    aspect-ratio: var(--ratio);
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: solid #ccc thin;
  }

  .iframe {
    --spacing: 40px;

    background: white;
    position: absolute;
    border: none;
    top: 50%;
    left: 50%;
    width: var(--width);
    height: var(--height);
    transform: translateX(-50%) translateY(-50%) scale(var(--scale));
  }

  form {
    background: linear-gradient(to top, #e5e5e5, #eee);
    display: flex;
    justify-content: space-between;
    border-bottom: solid #ccc thin;
  }

  fieldset {
    display: flex;
    align-items: flex-end;
    border: none;
    padding: 0;
  }


  .sizes input[type="radio"],
  .columnCount span {
    position: absolute;
    pointer-events: none;
    opacity: 0;
  }

  .sizes label span {
    cursor: pointer;
    display: block;
    padding: 0.25em 1em;
    filter: grayscale(1) contrast(0) brightness(1.5);
  }

  .sizes label {
    background: #eee;
    border-right: solid #ccc thin;
  }

  .sizes label.checked span {
    filter: grayscale(1) contrast(0);
  }

  .sizes label.checked {
    background: #fafafa;
  }
`;

interface PreviewProps {
  url: string;
  width: number;
  height: number;
  columnCount: number;
}

function Preview({ url, width, height, columnCount }: PreviewProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!previewRef.current) return;
    const previewElement = previewRef.current;

    const handleResize = () => {
      previewElement.style.setProperty('--ratio', `${width} / ${height}`);

      requestAnimationFrame(() => {
        const previewRect = previewElement.getBoundingClientRect();
        const scaleX = 1 / (width / previewRect.width);
        const scaleY = 1 / (height / previewRect.height);
        const scale = Math.min(scaleX, scaleY);

        previewElement.style.setProperty('--width', width + 'px');
        previewElement.style.setProperty('--height', height + 'px');
        previewElement.style.setProperty('--scale', scale.toString());
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height, columnCount]);

  return (
    <div className="preview" ref={previewRef}>
      <iframe className="iframe" src={url} />
    </div>
  );
}

const SIZES = {
  tv: {
    label: '4K TV',
    width: 3840,
    height: 2160,
  },
  desktop: {
    label: 'Desktop',
    width: 1920,
    height: 1080,
  },
  laptop: {
    label: 'Laptop',
    width: 1280,
    height: 800,
  },
  tablet: {
    label: 'iPad Air',
    width: 820,
    height: 1180,
  },
  phone: {
    label: 'iPhone 13 Pro',
    width: 390,
    height: 844,
  },
} as const;

type SIZE_KEY = keyof typeof SIZES;
const SIZE_KEYS = Object.keys(SIZES) as Array<SIZE_KEY>;

export default function Test() {
  const [columnCount, setColumnCount] = useQueryState<number>(
    'columnCount',
    2,
    (v) => Number(v) || 2,
    (v) => v.toString(),
  );

  const [size, setSize] = useQueryState<SIZE_KEY>(
    'size',
    'laptop',
    (v) => v as SIZE_KEY,
    (v) => v,
  );

  const hasMounted = useHasMounted();
  const { width, height } = SIZES[size];

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      className="content"
      // @ts-ignore
      style={{ '--column-count': columnCount.toString() }}
    >
      <Head>
        <style>{style}</style>
      </Head>

      <form>
        <fieldset className="sizes">
          {SIZE_KEYS.map((_size) => {
            const checked = _size === size;

            return (
              <label className={classNames({ checked })} key={_size}>
                <input
                  type="radio"
                  name="size"
                  value={_size}
                  checked={checked}
                  onChange={() => setSize(_size)}
                />
                <span>{SIZES[_size].label}</span>
              </label>
            );
          })}
        </fieldset>

        <fieldset className="columnCount">
          <label>
            <span>Columns</span>
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={columnCount}
              onChange={(event) => setColumnCount(Number(event.target.value))}
            />
          </label>
        </fieldset>
      </form>

      <div className="wrapper">
        {[
          '/',
          '/tesera/tag/post/',
          '/tesera/tag/talk/',
          '/tesera/entry/lorem-ipsum/',
          '/tesera/entry/use-konami/',
          '/tesera/entry/creating-a-custom-select-element/',
          '/tesera/entry/freemarker/',
          '/admin/easter-egg/',
        ].map((url) => (
          <Preview
            key={url}
            url={url}
            width={width}
            height={height}
            columnCount={columnCount}
          />
        ))}
      </div>
    </div>
  );
}

Test.displayName = 'Test';
Test.rawContent = true;
