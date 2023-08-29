const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.getElementById('equal');
const clearButton = document.getElementById('clear');

let currentInput = '0';
let firstOperand = null;
let operator = null;

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentInput === '0') {
      currentInput = button.textContent;
    } else {
      currentInput += button.textContent;
    }
    display.value = currentInput;
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (operator && currentInput !== '0') {
      firstOperand = operate(firstOperand, currentInput, operator);
      currentInput = '0';
      operator = button.textContent;
    } else {
      firstOperand = currentInput;
      currentInput = '0';
      operator = button.textContent;
    }
  });
});

equalButton.addEventListener('click', () => {
  if (firstOperand !== null && operator !== null) {
    currentInput = operate(firstOperand, currentInput, operator);
    display.value = currentInput;
    firstOperand = null;
    operator = null;
  }
});

clearButton.addEventListener('click', () => {
  currentInput = '0';
  firstOperand = null;
  operator = null;
  display.value = currentInput;
});

// Basic arithmetic operations
function operate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b !== 0) {
        return a / b;
      } else {
        return 'Error';
      }
    default:
      return 'Error';
  }
}
