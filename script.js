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
let numOnDisplay = '';
let operation = '';

// Main Functions

function calculate(secondNum, operation) {
  let answer;

  if (!checkDivideZero(secondNum, operation)) return;

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
  setNum(e.target.textContent);
}

function printNumKey(e) {
  if (isNaN(+e.key)) return;
  setNum(e.key);
}

function setNum(toDisplay) {
  numOnDisplay += toDisplay;
  calcDisplay.textContent = numOnDisplay;
  if (!operation) firstNum = '';
}

function printDecimal(e) {
  if (!checkKey(e, '.')) return;

  if (!calcDisplay.textContent.split('').includes('.')) {
    numOnDisplay += '.';
    calcDisplay.textContent = numOnDisplay;
  } else return;
}

function setOperationClick(e) {
  if (!e.target.classList.contains('operator')) return;

  if (operation) evaluateNums(e);

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
  removeActive();
  Array.from(calcOperators)
    .filter((op) => op.dataset.operation === operation)[0]
    .classList.add('operator-active');

  // Establish first number, stops the printNum function
  if (!firstNum) firstNum = +numOnDisplay;

  // Reset display so user can input a new number
  numOnDisplay = '';
}

function evaluateNums(e) {
  if (!checkKey(e, 'Enter')) return;

  removeActive();

  if (firstNum) {
    calcDisplay.textContent = calculate(+numOnDisplay, operation);
    updateFirstNum();

    numOnDisplay = '';
    operation = null;
  } else return;
}

// Helper functions
function clearAll(e) {
  removeActive();
  numOnDisplay = '';
  firstNum = '';
  calcDisplay.textContent = 0;
}

function changeSign(e) {
  calcDisplay.textContent = calcDisplay.textContent * -1;
  updateFirstNum();
}

function makePercent(e) {
  calcDisplay.textContent = calcDisplay.textContent / 100;
  updateFirstNum();
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
  updateFirstNum();
  numOnDisplay = '';
}

function processDecimals(num) {
  let text = num.toString();

  if (text.split('').length > 14) {
    let numArr = text.split('');
    numArr.splice(15, 0, '\n');

    return numArr.join('');
  } else return num;
}

function checkDivideZero(secondNum, operation) {
  if (operation === 'divide' && secondNum === 0) {
    alert("You can't divide by zero");
    clearAll();
    return false;
  } else return true;
}

function removeActive() {
  calcOperators.forEach((op) => op.classList.remove('operator-active'));
}

function checkKey(e, char) {
  if (!e.key) return true;
  else return e.key === char ? true : false;
}

function updateFirstNum() {
  firstNum = +calcDisplay.textContent;
}

// Event listeners
container.addEventListener('click', printNumClick);
window.addEventListener('keydown', printNumKey);

container.addEventListener('click', setOperationClick);
window.addEventListener('keydown', setOperationKey);

btnEquate.addEventListener('click', evaluateNums);
window.addEventListener('keydown', evaluateNums);

btnDecimal.addEventListener('click', printDecimal);
window.addEventListener('keydown', printDecimal);

btnClear.addEventListener('click', clearAll);
btnIntSign.addEventListener('click', changeSign);
btnPercent.addEventListener('click', makePercent);

window.addEventListener('keydown', eraseLast);
