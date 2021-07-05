'use strict';

// DOM Selectors

const container = document.querySelector('.calculator-container');
const calcDisplay = document.querySelector('.display');
const calcNumbers = document.querySelectorAll('.num');
const calcOperators = document.querySelectorAll('.operator');
const calcHelpers = document.querySelectorAll('.helper');

const btnClear = document.querySelector('.helper-ac');

// State maintenance
let clicks = [];
let nums = [];
let operation = '*';

// Functions

function operate(nums, operator) {
  let answer;
  switch (operator) {
    case 'add':
      answer = nums[0] + nums[1];
      break;
    case 'subtract':
      answer = nums[0] - nums[1];
      break;
    case 'multiply':
      answer = nums[0] * nums[1];
      break;
    case 'divide':
      answer = nums[0] / nums[1];
      break;
    case 'equate':
      answer = 101;
      break;
    default:
      answer = nums[1];
  }
  return answer;
}

function calculate(e) {
  if (e.target.classList.contains('operator-equate')) {
    nums = [operate(nums, operation)];
    console.log('equate', nums);
  }

  if (e.target.classList.contains('num')) {
    clicks.push(e.target.textContent);
    calcDisplay.textContent = clicks.join('');
  }

  if (e.target.classList.contains('operator')) {
    clicks.push(e.target.textContent);

    operation = e.target.dataset.operate;
    nums.push(parseFloat(clicks.join('')));
    clicks = [];
    console.log('nums', nums);
    console.log('operation', operation);
  }

  if (nums.length > 1) {
    calcDisplay.textContent = operate(nums, operation);
    nums = [operate(nums, operation)];
  }

  console.log('clicks', clicks);
}

function clearAll(e) {
  clicks = [];
  nums = [];
  calcDisplay.textContent = 0;
}

// Event listeners
container.addEventListener('click', calculate);
btnClear.addEventListener('click', clearAll);

/*
  if (e.target.classList.contains('num')) {
    num1.push(e.target.textContent);
    calcDisplay.textContent = num1.join('');
  }

  if (e.target.classList.contains('operator')) {
    calcOperators.forEach((operator) =>
      operator.classList.remove('operator-active')
    );
    e.target.classList.add('operator-active');
    const calcNum1 = num1.join('');
  }

*/
