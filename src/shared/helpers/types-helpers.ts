export function createStringUnionParser<T extends readonly string[]>(
  values: T,
) {
  const set = new Set(values);

  return (value: string): T[number] => {
    if (!set.has(value as T[number])) {
      throw new Error(`Invalid value: ${value}`);
    }

    return value as T[number];
  };
}
