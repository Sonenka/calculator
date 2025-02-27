let currentOperator = '';
let currentOperand = '0';
let previousOperand = '';
let resultDisplayed = false;

const resultDisplay = document.getElementById('result_text');

const numberButtons = document.querySelectorAll('.calculator__number');
const operatorButtons = document.querySelectorAll('.calculator__action');
const clearButton = document.getElementById('clear');
const plusMinusButton = document.getElementById('plus_minus');
const percentButton = document.getElementById('percent');
const equalButton = document.getElementById('equal');
const dotButton = document.getElementById('dot');

numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach(button => {
    if (button.id !== 'clear' && button.id !== 'plus_minus' && button.id !== 'percent' && button.id !== 'equal') {
        button.addEventListener('click', () => setOperator(button.textContent));
    }
});

clearButton.addEventListener('click', clear);
plusMinusButton.addEventListener('click', toggleSign);
percentButton.addEventListener('click', convertToPercent);
equalButton.addEventListener('click', calculate);
dotButton.addEventListener('click', appendDot);

function appendNumber(number) {
    if (resultDisplayed) {
        currentOperand = number;
        resultDisplayed = false;
    } else {
        if (currentOperand.length < 10) {
            currentOperand = currentOperand === '0' ? number : currentOperand + number;
        }
    }
    updateDisplay();
}

function setOperator(operator) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    currentOperator = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculate() {
    if (currentOperand === '' || previousOperand === '') return;
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    switch (currentOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }
    currentOperand = result.toString();
    currentOperator = '';
    previousOperand = '';
    resultDisplayed = true;
    updateDisplay();
}

function clear() {
    currentOperand = '0';
    previousOperand = '';
    currentOperator = '';
    updateDisplay();
}

function toggleSign() {
    if (currentOperand !== '') {
        currentOperand = (parseFloat(currentOperand) * -1).toString();
        updateDisplay();
    }
}

function convertToPercent() {
    if (currentOperand !== '') {
        currentOperand = (parseFloat(currentOperand) / 100).toString();
        updateDisplay();
    }
}

function appendDot() {
    if (!currentOperand.includes('.')) {
        if (currentOperand.length < 10) {
            currentOperand += '.';
        }
    }
    updateDisplay();
}

function updateDisplay() {
    if (currentOperator && previousOperand) {
        resultDisplay.textContent = `${previousOperand} ${currentOperator} ${currentOperand || ''}`;
    } else {
        resultDisplay.textContent = currentOperand;
    }
}