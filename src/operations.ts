import { Operation } from "./types.ts";

// Чистые функции для операций
export const add: Operation = (a, b) => a + b!;
export const subtract: Operation = (a, b) => a - b!;
export const multiply: Operation = (a, b) => a * b!;
export const divide: Operation = (a, b) => {
  if (b === 0) {
    throw new Error("Разделить на ноль нельзя");
  }
  return a / b!;
};
export const power: Operation = (a, b) => Math.pow(a, b!);
export const squareRoot: Operation = (a) => {
  if (a < 0) {
    throw new Error("Взять квадратный корень из отриц. числа нельзя");
  }
  return Math.sqrt(a);
};
// Функция высшего порядка для создания операций (+каррирование)
export const createOperation =
  (operation: Operation) => (a: number) => (b?: number) =>
    operation(a, b);
