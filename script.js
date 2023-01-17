'use strict';

//  DOM SELECTORS

const screen = document.querySelector('.calc--screen');
const screenDisplay = document.querySelector('.screen--display');
const screenResult = document.querySelector('.screen--result');

const buttons = document.querySelectorAll('.btn');
const digits = document.querySelectorAll('.btn--num');
const operators = document.querySelectorAll('.btn--operate');

const btnClear = document.querySelector('.btn--clear');
const btnResult = document.querySelector('.btn--result');

// STATE MAINTENANCE

let numbers = [];
let numberToSet = '';
let operation = '';
let result;

// MAIN FUNCTIONS
function setNumber(e) {
  numberToSet += e.target.dataset.num;
  updateScreen(numberToSet);
}

function operate(operation, num1, num2) {
  let answer;

  switch (operation) {
    case 'add':
      answer = +num1 + +num2;
      break;

    case 'subtract':
      answer = +num1 - +num2;
      break;

    case 'multiply':
      answer = +num1 * +num2;
      break;

    case 'divide':
      if (!+num2) alert('cannot do');

      answer = +num1 / +num2;
      break;
  }

  return answer;
}

function calculate(e) {
  clearScreen();
  console.log('calculate start', numbers, operation);

  if (numbers.length < 2 && numberToSet) {
    numbers.push(numberToSet);
  }

  if (numbers.length == 2) {
    // if two values are available, you can now evaluate them

    // The operation will be available bc there are two numbers already
    result = operate(operation, ...numbers);
    updateScreen(result);
    console.log('calculate done', numbers, operation);

    // Store result as first operand for another eval
    numbers = [`${result}`];
  }

  // reset
  operation = e.target.dataset.operation || operation;
  numberToSet = '';
}

function clearAll() {
  clearScreen();
  numbers = [];
  numberToSet = '';
  operation = '';
  result = '';
}

// DISPLAY FUNCTIONS
function updateScreen(value) {
  screenDisplay.textContent = value;
}

function clearScreen() {
  screenDisplay.textContent = '';
}

// EVENT HANDLERS
digits.forEach((digit) => digit.addEventListener('click', setNumber));
operators.forEach((op) => op.addEventListener('click', calculate));
btnClear.addEventListener('click', clearAll);
btnResult.addEventListener('click', calculate);
