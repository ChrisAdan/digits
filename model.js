"use strict";

const MAX_DIGITS = 10;
let displayValue;
let operandStack = [];
let x;
let y;
let hasFirstOperand = false;
let currentOperator;

function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function invertSign(value) {
  return -value;
}

function sqrt(value) {
  return Math.sqrt(value);
}

function cubeRoot(value) {
  return Math.cbrt(value);
}

function raiseToPower(x, y) {
  return x ** y;
}

function modulus(x, y) {
  return x % y;
}

function percentage(value) {
  return value / 100;
}

// undo

export function clearAll() {
  operandStack = [];
  displayValue = 0;
  currentOperator = -1;
  hasFirstOperand = false;
  x = 0;
  y = 0;
  return displayValue;
}

export function pushOperand(data) {
  if (validateInput(data)) {
    operandStack.push(data);
    // console.log(operandStack);
  }
  displayValue = operandStack.join("");
  return displayValue;
}

export function pushOperator(operator) {
  console.log(`Pushing ${operator}`);
  currentOperator = operator === "equals" ? currentOperator : operator;
  operandStack = [];
  if (hasFirstOperand) {
    y = +displayValue;
    hasFirstOperand = false;
    console.log(`y: ${y}`);
    return y;
  } else {
    x = +displayValue;
    console.log(`x: ${x}`);
    hasFirstOperand = true;
    return x;
  }
}

export function operate() {
  console.log(`called operate
    current operator: ${currentOperator}`);
  console.log(`X: ${x} | Y: ${y}`);
  switch (currentOperator) {
    case "add":
      displayValue = add(x, y);
      console.log(displayValue);
      break;
  }
}

// validate
function validateInput(data) {
  return operandStack.length < MAX_DIGITS;
}

// divideByZero

// exports
