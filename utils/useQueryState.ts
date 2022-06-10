import { useCallback, useEffect, useRef, useState } from 'react';
import { useHasMounted } from './useHasMounted';

export default function useQueryState<T>(
  key: string,
  defaultValue: T,
  deserialize: (queryValue: string) => T,
  serialize: (value: T) => string,
) {
  const hasMounted = useHasMounted();
  const hasInitializedRef = useRef(false);
  const deserializeRef = useRef(deserialize);
  const serializeRef = useRef(serialize);
  const [value, setValue] = useState(defaultValue);

  deserializeRef.current = deserialize;
  serializeRef.current = serialize;

  const updateValue = useCallback(
    (nextValue: T) => {
      if (hasMounted) {
        const url = new URL(globalThis.location.href);
        url.searchParams.set(key, serializeRef.current(nextValue));
        window.history.replaceState('', '', url.toString());
      }

      setValue(nextValue);
    },
    [key, hasMounted],
  );

  useEffect(() => {
    if (hasMounted && !hasInitializedRef.current) {
      hasInitializedRef.current = true;

      const url = new URL(globalThis.location.href);
      const queryValue = url.searchParams.get(key);

      if (queryValue !== null) {
        setValue(deserializeRef.current(queryValue));
      }
    }
  }, [key, hasMounted]);

  return [value, updateValue] as const;
}
