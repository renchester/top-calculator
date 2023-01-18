'use strict';

//  DOM SELECTORS

const bodyEl = document.querySelector('body');
const links = document.querySelectorAll('link');
const footerText = document.querySelector('.footer--label');

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
const btnTheme = document.querySelector('.theme');

const stylesContainer = document.querySelectorAll('.style');

// STATE MAINTENANCE

let numberToSet = '';
let operation = '';
let firstNum;
let secondNum;
let result;
let allowDecimal = true;

// MAIN CALCULATOR FUNCTIONS

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
      answer = +num1 / +num2;
      break;
  }

  return answer;
}

function calculate(e) {
  if ((firstNum === 0 || firstNum) && numberToSet) {
    secondNum = +numberToSet;

    if (isDividingByZero(operation, secondNum)) {
      clearAll();
      return;
    }

    result = operate(operation, firstNum, secondNum);
    updateScreen(result);

    firstNum = result;
    numberToSet = '';
  }

  if (!firstNum) {
    firstNum = +numberToSet;
    numberToSet = '';
  }

  setNewOperation(e.target.dataset.operation);
  makeActive(e.target);
}

function addDecimal() {
  if (!allowDecimal) return;

  numberToSet += '.';
  updateScreen(numberToSet);

  allowDecimal = false;
}

function convertPercent() {
  let num = getNumberFromScreen();
  let percent = +num / 100;

  //  If numberToSet is not available yet, then the stored firstNum is converted
  !numberToSet ? (firstNum = percent) : (numberToSet = percent);

  updateScreen(firstNum || numberToSet);
}

function convertNumSign() {
  let num = getNumberFromScreen();

  !numberToSet ? (firstNum = -num) : (numberToSet = -num);

  updateScreen(firstNum || numberToSet);
}

// HELPER FUNCTIONS

function getNumberFromScreen() {
  return screenDisplay.textContent;
}

function isDividingByZero(operation, num2) {
  if (operation === 'divide' && +num2 === 0) {
    alert('Divisor cannot be 0');
    clearAll();
    return true;
  } else return false;
}

function setNewOperation(newOperation = operation) {
  operation = newOperation;
  allowDecimal = true;
}

function clearAll() {
  clearScreen();
  removeActive();

  firstNum = '';
  secondNum = '';
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
  screenDisplay.textContent = '0';
}

function makeActive(el) {
  operators.forEach((op) => op.classList.remove('btn-active'));
  el.classList.add('btn-active');
}

function removeActive() {
  operators.forEach((op) => op.classList.remove('btn-active'));
}

function toggleTheme(e) {
  e.target.classList.contains('theme--light')
    ? changeTheme('lightMode')
    : changeTheme('darkMode');

  btnTheme.classList.toggle('theme--light');
  btnTheme.classList.toggle('theme--dark');
}

function changeTheme(desired) {
  let darkMode = '#303036';
  let lightMode = '#fffffa';
  let color, other;

  if (desired === 'darkMode') {
    color = lightMode;
    other = darkMode;
  } else {
    color = darkMode;
    other = lightMode;
  }

  bodyEl.style.backgroundColor = color;
  btnTheme.style.color = other;
  btnTheme.textContent = `${desired.split('Mode')[0]}_mode`;
  footerText.style.color = other;
}

function changeStyle(e) {
  stylesContainer.forEach((styleBtn) =>
    styleBtn.classList.remove('style-active')
  );
  e.target.classList.add('style-active');

  const stylesheet = links[0];
  const styleNum = e.target.dataset.style;

  stylesheet.href = `css/style${styleNum}.css`;
}

// EVENT HANDLERS

digits.forEach((digit) => digit.addEventListener('click', setNumber));
operators.forEach((op) => op.addEventListener('click', calculate));
stylesContainer.forEach((styleBtn) =>
  styleBtn.addEventListener('click', changeStyle)
);

btnClear.addEventListener('click', clearAll);
btnResult.addEventListener('click', calculate);
btnDecimal.addEventListener('click', addDecimal);
btnPercent.addEventListener('click', convertPercent);
btnSign.addEventListener('click', convertNumSign);
btnTheme.addEventListener('click', toggleTheme);
