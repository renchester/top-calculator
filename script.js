'use strict';

// DOM Selectors

const container = document.querySelector('.calculator-container');
const calcDisplay = document.querySelector('.display');
const calcNumbers = document.querySelectorAll('.num');
const calcOperators = document.querySelectorAll('.operator');
const calcHelpers = document.querySelectorAll('.helper');

const btnEquate = document.querySelector('.operator-equate');

const btnClear = document.querySelector('.helper-ac');
const btnIntSign = document.querySelector('.helper-sign');
const btnPercent = document.querySelector('.helper-percent');

// State maintenance
let firstNum = 0;
let numDisplay = '';
let operation = '';

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
  return answer;
}

function printNumClick(e) {
  if (!e.target.classList.contains('num')) return;
  numDisplay += e.target.textContent;

  setNum();
}

function printNumKey(e) {
  if (!isNaN(+e.key) || e.key === '.') {
    numDisplay += e.key;
    setNum();
  } else return;
}

function setNum() {
  calcDisplay.textContent = numDisplay;
  if (!operation) firstNum = '';
}

function setOperationClick(e) {
  if (!e.target.classList.contains('operator')) return;

  // Evaluate nums if operation has already been set, before setting a new one
  if (operation) evaluateNums();

  // Establish the operation to be done
  operation = e.target.dataset.operation;

  operate();
}

function setOperationKey(e) {
  const operators = ['+', '-', '*', '/'];

  if (!operators.some((op) => op === e.key)) return;

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
    calcDisplay.textContent = firstNum = calculate(+numDisplay, operation);

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

window.addEventListener('keydown', eraseLast);
