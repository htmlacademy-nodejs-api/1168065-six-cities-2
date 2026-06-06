export function generateRandomValue(
  min: number,
  max: number,
  numAfterDigit = 0,
) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function generateRandomBoolean() {
  return Math.random() < 0.5;
}

export function getRandomItems<T>(items: T[], count?: number): T[] {
  if (items.length === 0) {
    return [];
  }

  if (count !== undefined) {
    if (count > items.length) {
      throw new Error(
        `Cannot get ${count} items from array with length ${items.length}`,
      );
    }

    const shuffledItems = [...items].sort(() => Math.random() - 0.5);

    return shuffledItems.slice(0, count);
  }

  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = generateRandomValue(startPosition + 1, items.length);

  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}
