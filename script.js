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

function printNum(e) {
  if (!e.target.classList.contains('num')) return;
  numDisplay += e.target.textContent;
  calcDisplay.textContent = numDisplay;

  // Clause for when a user clicks on a number without setting an operation first
  if (!operation) firstNum = '';
}

function setOperation(e) {
  if (!e.target.classList.contains('operator')) return;

  // Evaluate nums if operation has already been set, before setting a new one
  if (operation) evaluateNums();

  // Establish the operation to be done
  operation = e.target.dataset.operation;

  calcOperators.forEach((op) => op.classList.remove('operator-active'));
  e.target.classList.add('operator-active');

  // Establish first number, stops the printNum function
  if (!firstNum) firstNum = +numDisplay;

  // Reset display so user can input a new number
  numDisplay = '';
}

function evaluateNums(e) {
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

// Event listeners
container.addEventListener('click', printNum);
window.addEventListener('keypress', printKeyNum);

container.addEventListener('click', setOperation);
btnEquate.addEventListener('click', evaluateNums);

btnClear.addEventListener('click', clearAll);
btnIntSign.addEventListener('click', changeSign);
btnPercent.addEventListener('click', makePercent);
