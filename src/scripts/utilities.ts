export function replaceItemAtIndex(arr: [], index: number, newValue: any) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function removeItemAtIndex(arr: any[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function removeItem<T>(arr: T[], item: T) {
  const index = arr.indexOf(item);
  if (index == -1) {
    return arr;
  }

  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function memoizeId<F extends (...args: any[]) => any>(
  callable: F,
  createIdentifier: (...args: Parameters<F>) => string,
): F {
  const MEMORY: Map<string, ReturnType<F>> = new Map();

  // @ts-expect-error: Cannot assign (...args: Parameters<F>) => ReturnType<F> to F
  return (...args: Parameters<F>): ReturnType<F> => {
    const ID: string = createIdentifier(...args);

    if (!MEMORY.has(ID)) {
      MEMORY.set(ID, callable(...args));
    }

    // @ts-expect-error: Cannot infer that the value exist.
    return MEMORY.get(ID);
  };
}
