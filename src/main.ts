import {
  add,
  createOperation,
  divide,
  multiply,
  power,
  squareRoot,
  subtract,
} from "./operations.ts";

// Создание операций
const addNumbers = createOperation(add);
const subtractNumbers = createOperation(subtract);
const multiplyNumbers = createOperation(multiply);
const divideNumbers = createOperation(divide);
const powerNumbers = createOperation(power);
const squareRootNumber = createOperation(squareRoot);

// Состояние калькулятора
let currentValue: number | null = null;
let currentOperation: ((b: number) => number) | null = null;
let shouldClearDisplay = false;

// Элементы DOM
const display = document.getElementById("display") as HTMLInputElement;
const buttons = document.querySelectorAll(".buttons button");

// Обработка нажатий на кнопки
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    const operation = button.getAttribute("data-operation");

    if (value !== null) {
      if (shouldClearDisplay) {
        display.value = "";
        shouldClearDisplay = false;
      }
      display.value += value;
    }

    if (operation !== null) {
      handleOperation(operation, button as HTMLButtonElement);
    }
  });
});

// Обработка операций
function handleOperation(operation: string, button: HTMLButtonElement) {
  const displayValue = parseFloat(display.value);

  // Убираем подсветку у всех кнопок операций
  buttons.forEach((btn) => {
    if (btn.getAttribute("data-operation")) {
      btn.classList.remove("active");
    }
  });

  try {
    switch (operation) {
      case "add":
        currentOperation = addNumbers(displayValue);
        break;
      case "subtract":
        currentOperation = subtractNumbers(displayValue);
        break;
      case "multiply":
        currentOperation = multiplyNumbers(displayValue);
        break;
      case "divide":
        currentOperation = divideNumbers(displayValue);
        break;
      case "power":
        currentOperation = powerNumbers(displayValue);
        break;
      case "squareRoot":
        display.value = squareRootNumber(displayValue)().toString();
        return;
      case "clear":
        display.value = "";
        currentOperation = null;
        currentValue = null;
        return;
      case "backspace":
        display.value = display.value.slice(0, -1); // Удаляем последний символ
        return;
      case "toggleSign":
        if (display.value !== "") {
          display.value = (parseFloat(display.value) * -1).toString(); // Меняем знак
        }
        return;
      case "calculate":
        if (currentOperation) {
          const result = currentOperation(displayValue);
          display.value = result.toString();
          currentOperation = null;
        }
        return;
    }

    // Подсвечиваем активную кнопку операции
    button.classList.add("active");
    shouldClearDisplay = true;
  } catch (error) {
    // Обработка ошибок (деление на ноль, корень из отрицательного числа)
    display.value = error instanceof Error ? error.message : "Ошибка";
    currentOperation = null;
    shouldClearDisplay = true;
  }
}
