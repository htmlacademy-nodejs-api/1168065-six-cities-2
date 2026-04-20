export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}
