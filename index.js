const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.getElementById('equal');
const clearButton = document.getElementById('clear');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.value = currentInput;
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentInput === '0' || shouldResetDisplay) {
      currentInput = '';
      shouldResetDisplay = false;
    }
    currentInput += button.textContent;
    updateDisplay();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key >= '0' && event.key <= '9') {
    if (currentInput === '0' || shouldResetDisplay) {
      currentInput = '';
      shouldResetDisplay = false;
    }
    currentInput += event.key;
    updateDisplay();
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    handleOperator(event.key);
  } else if (event.key === 'Enter' || event.key === '=') {
    calculateResult();
  } else if (event.key === 'Escape') {
    clearCalculator();
  } else if (event.key === '.') {
    addDecimal();
  } else if (event.key === 'Backspace') {
    deleteLastDigit();
  }
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleOperator(button.textContent);
  });
});

function handleOperator(selectedOperator) {
  if (operator && currentInput) {
    firstOperand = operate(firstOperand, currentInput, operator);
    currentInput = firstOperand;
    updateDisplay();
  } else {
    firstOperand = currentInput;
  }
  operator = selectedOperator;
  shouldResetDisplay = true;
}

function addDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

function deleteLastDigit() {
  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
  updateDisplay();
}

equalButton.addEventListener('click', calculateResult);

function calculateResult() {
  if (firstOperand !== null && operator !== null) {
    currentInput = operate(firstOperand, currentInput, operator);
    updateDisplay();
    firstOperand = null;
    operator = null;
  }
}

clearButton.addEventListener('click', clearCalculator);

function clearCalculator() {
  currentInput = '0';
  firstOperand = null;
  operator = null;
  updateDisplay();
}

function operate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+':
      return (a + b).toString();
    case '-':
      return (a - b).toString();
    case '*':
      return (a * b).toString();
    case '/':
      return b !== 0 ? (a / b).toString() : 'Error';
    default:
      return 'Error';
  }
}

updateDisplay();
