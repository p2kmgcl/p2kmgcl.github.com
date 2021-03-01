export const classNames = (
  ...classes: Array<undefined | string | string[] | Record<string, any>>
) =>
  classes
    .map((className) => {
      if (!className) {
        return null;
      }

      if (typeof className === 'string') {
        return className.trim();
      }

      if (Array.isArray(className)) {
        return classNames(...className);
      }

      return classNames(
        ...Object.entries(classNames).map(([key, value]) =>
          value ? key : null,
        ),
      );
    })
    .filter((className) => !!className)
    .join(' ');
