'use strict';

// DOM Selectors

const container = document.querySelector('.calculator-container');
const calcDisplay = document.querySelector('.display');
const calcNumbers = document.querySelectorAll('.num');
const calcOperators = document.querySelectorAll('.operator');
const calcHelpers = document.querySelectorAll('.helper');

const btnDecimal = document.querySelector('.num-dec');
const btnEquate = document.querySelector('.operator-equate');

const btnClear = document.querySelector('.helper-ac');
const btnIntSign = document.querySelector('.helper-sign');
const btnPercent = document.querySelector('.helper-percent');

// State maintenance
let firstNum = 0;
let numDisplay = '';
let operation = '';
let decClickable = true;

// Functions

function calculate(secondNum, operation) {
  let answer;

  if (operation === 'divide' && secondNum === 0) {
    alert("You can't divide by zero");
    clearAll();
    return 0;
  }

  switch (operation) {
    case 'add':
      answer = firstNum + secondNum;
      break;
    case 'subtract':
      answer = firstNum - secondNum;
      break;
    case 'multiply':
      answer = firstNum * secondNum;
      break;
    case 'divide':
      answer = firstNum / secondNum;
      break;
    default:
      clearAll();
  }

  const finAnswer = processDecimals(answer);
  return finAnswer;
}

function printNumClick(e) {
  if (!e.target.classList.contains('num')) return;
  numDisplay += e.target.textContent;

  setNum();
}

function printDecimal(e) {
  if (e.key) {
    if (e.key !== '.') return;
  }

  if (!calcDisplay.textContent.split('').includes('.')) {
    numDisplay += '.';
    calcDisplay.textContent = numDisplay;
  } else return;
}

function printNumKey(e) {
  if (isNaN(+e.key)) return;
  numDisplay += e.key;
  setNum();
  return;
}

function setNum() {
  calcDisplay.textContent = numDisplay;
  if (!operation) firstNum = '';
}

function setOperationClick(e) {
  if (!e.target.classList.contains('operator')) return;

  // Evaluate nums if operation has already been set, before setting a new one
  if (operation) evaluateNums(e);

  // Establish the operation to be done
  operation = e.target.dataset.operation;

  operate();
}

function setOperationKey(e) {
  const operators = ['+', '-', '*', '/'];
  if (!operators.some((op) => op === e.key)) return;

  if (operation) evaluateNums(e);

  switch (e.key) {
    case '+':
      operation = 'add';
      break;
    case '-':
      operation = 'subtract';
      break;
    case '*':
      operation = 'multiply';
      break;
    case '/':
      e.preventDefault();
      operation = 'divide';
      break;
  }

  operate();
}

function operate() {
  calcOperators.forEach((op) => op.classList.remove('operator-active'));
  Array.from(calcOperators)
    .filter((op) => op.dataset.operation === operation)[0]
    .classList.add('operator-active');

  // Establish first number, stops the printNum function
  if (!firstNum) firstNum = +numDisplay;

  // Reset display so user can input a new number
  numDisplay = '';
}

function evaluateNums(e) {
  if (e.key) {
    if (e.key !== 'Enter') return;
  }

  calcOperators.forEach((op) => op.classList.remove('operator-active'));
  if (firstNum) {
    calcDisplay.textContent = calculate(+numDisplay, operation);
    firstNum = calcDisplay.textContent;

    numDisplay = '';
    operation = null;
  } else return;
}

// Helper functions
function clearAll(e) {
  calcOperators.forEach((op) => op.classList.remove('operator-active'));
  numDisplay = '';
  firstNum = '';
  calcDisplay.textContent = 0;
  decClickable = true;
}

function changeSign(e) {
  calcDisplay.textContent = calcDisplay.textContent * -1;
  firstNum = +calcDisplay.textContent;
}

function makePercent(e) {
  calcDisplay.textContent = calcDisplay.textContent / 100;
  firstNum = +calcDisplay.textContent;
}

function eraseLast(e) {
  if (e.key !== 'Backspace') return;
  const displayArr = calcDisplay.textContent.split('');
  displayArr.splice(-1);

  if (!displayArr.length) displayArr.push(0);

  if (operation === null) {
    clearAll();
    return;
  }

  calcDisplay.textContent = displayArr.join('');
  firstNum = +calcDisplay.textContent;
  numDisplay = '';
}

function processDecimals(num) {
  let text = num.toString();
  let [integer, decimals] = num.toString().split('.');

  if (text.indexOf('e-') > -1) {
    let [base, trail] = text.split('e-');
    let deg = parseInt(trail, 10);
    return deg;
  }

  if (integer.split('').length > 8) {
    console.log(integer);
    console.log(integer.slice(0, 1));
    return integer.slice(0, 1);
  }

  if (decimals?.split('').length > 8) {
    return num.toFixed(8);
  }
  return num;
}

// Event listeners
container.addEventListener('click', printNumClick);
window.addEventListener('keydown', printNumKey);

container.addEventListener('click', setOperationClick);
window.addEventListener('keydown', setOperationKey);

btnEquate.addEventListener('click', evaluateNums);
window.addEventListener('keydown', evaluateNums);

btnClear.addEventListener('click', clearAll);
btnIntSign.addEventListener('click', changeSign);
btnPercent.addEventListener('click', makePercent);

btnDecimal.addEventListener('click', printDecimal);
window.addEventListener('keydown', printDecimal);

window.addEventListener('keydown', eraseLast);
