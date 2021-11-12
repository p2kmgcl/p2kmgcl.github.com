export function getBoolean(v: unknown): boolean {
  if (typeof v !== 'boolean') throw new Error(`Invalid boolean "${v}"`);
  return v;
}

export function getDate(v: unknown): number {
  const date = new Date(v as string).getTime();
  if (isNaN(date)) throw new Error(`Invalid date "${v}"`);
  return date;
}

export function getString(v: unknown): string {
  if (typeof v !== 'string' || v.length === 0)
    throw new Error(`Invalid string "${v}"`);
  return v;
}

export function getArray<T>(v: unknown, get: (v: unknown) => T) {
  if (!Array.isArray(v)) throw new Error(`Invalid array "${v}"`);
  return v.map(get);
}

export function getProperty<K extends string, T, A extends any[]>(
  v: unknown,
  k: K,
  get: (v: unknown, ...args: A) => T,
  ...args: A
) {
  if (v === null || typeof v !== 'object')
    throw new Error(`Invalid object "${v}"`);

  try {
    return get((v as Record<string, unknown>)[k], ...args);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Invalid property "${k}": ${error.message}`);
    } else {
      throw new Error(`Invalid property "${k}"`);
    }
  }
}

export function getValue<T>(v: unknown, value: T) {
  if (v !== value) throw new Error(`Invalid value "${v}"`);
  return value;
}
