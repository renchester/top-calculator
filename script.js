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

// STATE

let operands = [];
let numberStr = '';
let operation = '';
let result;

//  FUNCTIONS

function clickNum(e) {
  // Collects the values of the buttons clicked

  let value = e.target.dataset.num;

  numberStr += value;

  //  then displays it on the screen

  displayOnScreen(numberStr);
}

function evaluate(e) {
  if (operands.length < 2) {
    operands.push(+numberStr);
  }

  if (operands.length == 2) {
    getResult();
    displayOnScreen(result);
    operands = [result];
  }

  operation = e.target.dataset.operation || operation;
  numberStr = '';
}

function getResult() {
  switch (operation) {
    case 'add':
      result = getSum(operands[0], operands[1]);
      break;

    case 'subtract':
      result = getDifference(operands[0], operands[1]);
      break;

    case 'multiply':
      result = getProduct(operands[0], operands[1]);
      break;

    case 'divide':
      result = getQuotient(operands[0], operands[1]);
      break;
  }

  return result;
}

function getSum(x, y) {
  return +x + +y;
}

function getDifference(x, y) {
  return +x - +y;
}

function getProduct(x, y) {
  return +x * +y;
}

function getQuotient(x, y) {
  return +x / +y;
}

function clearData() {
  operands = [];
  numberStr = '';
}

// DISPLAY FUNCTIONS

function displayOnScreen(content) {
  screenDisplay.textContent = content;
}

function displayResult(value) {
  screenResult.textContent = value;
}

function clearScreen() {
  screenDisplay.textContent = '';
}

function clearResult() {
  screenResult.textContent = '';
}

function clearDisplay() {
  screenDisplay.textContent = '';
  screenResult.textContent = '';
}

// EVENT HANDLERS

digits.forEach((digit) => digit.addEventListener('click', clickNum));
operators.forEach((operator) => operator.addEventListener('click', evaluate));

btnClear.addEventListener('click', clearDisplay);
btnClear.addEventListener('click', clearData);
