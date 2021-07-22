export const useWhatChanged = (name, deps) => {
  const depsRef = useRef({ ...deps });

  useEffect(() => {
    const diff = [];
    let showDiff = false;

    Object.entries(deps).forEach(([key, value]) => {
      if (value !== depsRef.current[key]) {
        showDiff = true;
      }

      diff.push({
        name: key,
        previous: depsRef.current[key],
        current: value,
        areEqual: value === depsRef.current[key],
      });
    });

    if (showDiff) {
      console.log(name);
      console.table(diff);
    }
  }, Object.values(deps));
};
