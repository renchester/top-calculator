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

// State maintenance
let numsToOperate = [];
let num = '';
let operation = '';

// Functions

function calculate(nums, operation) {
  let answer;
  let [num1, num2] = nums;

  switch (operation) {
    case 'add':
      answer = num1 + num2;
      break;
    case 'subtract':
      answer = num1 - num2;
      break;
    case 'multiply':
      answer = num1 * num2;
      break;
    case 'divide':
      answer = num1 / num2;
      break;
    default:
      clearAll();
  }
  return answer;
}

function printNum(e) {
  if (!e.target.classList.contains('num')) return;
  num += e.target.textContent;
  calcDisplay.textContent = num;

  // Clause for when a user clicks on a number without setting an operation first
  if (!operation) {
    numsToOperate = [];
  }
}

function setOperation(e) {
  if (!e.target.classList.contains('operator')) return;

  // Evaluate nums if operation has already been set. before setting a new one
  if (operation) {
    evaluateNums();
  }

  // Establish the operation to be done
  operation = e.target.dataset.operation;

  calcOperators.forEach((op) => op.classList.remove('operator-active'));
  e.target.classList.add('operator-active');

  // Establish first number, stops the printNum function
  if (!numsToOperate.length) {
    numsToOperate.push(+num);
    num = '';
  }
}

function evaluateNums(e) {
  calcOperators.forEach((op) => op.classList.remove('operator-active'));

  // Establish second number
  numsToOperate.push(+num);
  num = '';

  if (numsToOperate.length > 1) {
    const answer = calculate(numsToOperate, operation);
    calcDisplay.textContent = answer;
    numsToOperate = [answer];
    operation = null;
  } else return;
}

function clearAll(e) {
  calcOperators.forEach((op) => op.classList.remove('operator-active'));
  numsToOperate = [];
  num = '';
  calcDisplay.textContent = 0;
}

function changeSign(e) {
  calcDisplay.textContent = calcDisplay.textContent * -1;
  num = calcDisplay.textContent * -1;
}

// Event listeners
container.addEventListener('click', printNum);
container.addEventListener('click', setOperation);
btnEquate.addEventListener('click', evaluateNums);
btnClear.addEventListener('click', clearAll);
btnIntSign.addEventListener('click', changeSign);
