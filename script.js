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
const btnDecimal = document.querySelector('.btn--decimal');
const btnPercent = document.querySelector('.btn--percent');
const btnSign = document.querySelector('.btn--sign');

// STATE MAINTENANCE

let numbers = [];
let numberToSet = '';
let operation = '';
let result;
let allowDecimal = true;

// MAIN FUNCTIONS
function setNumber(e) {
  numberToSet += e.target.dataset.num;
  updateScreen(numberToSet);
}

function addDecimal() {
  if (!allowDecimal) return;

  numberToSet += '.';
  updateScreen(numberToSet);

  allowDecimal = false;
}

function convertPercent() {
  let num = getNumberFromScreen();

  numberToSet = +num / 100;

  updateScreen(numberToSet);
}

function convertNumSign() {
  let num = getNumberFromScreen();

  numberToSet = -num;

  if 

  updateScreen(numberToSet);
}

function getNumberFromScreen() {
  return screenDisplay.textContent;
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
  allowDecimal = true;
}

function clearAll() {
  clearScreen();
  numbers = [];
  numberToSet = '';
  operation = '';
  result = '';
  allowDecimal = true;
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
btnDecimal.addEventListener('click', addDecimal);
btnPercent.addEventListener('click', convertPercent);
btnSign.addEventListener('click', convertNumSign);
