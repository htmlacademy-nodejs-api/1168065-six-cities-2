import { ClassConstructor, plainToInstance } from 'class-transformer';

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}
