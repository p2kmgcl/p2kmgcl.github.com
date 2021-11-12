export const classNames = (
  ...classes: Array<undefined | string | string[] | Record<string, any>>
): string =>
  classes
    .map((className) => {
      if (!className) {
        return undefined;
      }

      if (typeof className === 'string') {
        return className.trim();
      }

      if (Array.isArray(className)) {
        return classNames(...className);
      }

      return classNames(
        ...Object.entries(className).map(([key, value]) =>
          value ? key : undefined,
        ),
      );
    })
    .filter(Boolean)
    .join(' ');
