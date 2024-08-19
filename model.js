"use strict";

export const MAX_DIGITS = 10;
export let data = {};
export function getNewData() {
  data = {};
}
const DECIMAL_PLACES = 4;

export function operate(action) {
  switch (action) {
    case "add":
      return add(data.x, data.y);
      break;
    case "subtract":
      return subtract(data.x, data.y);
      break;
    case "multiply":
      return multiply(data.x, data.y);
      break;
    case "divide":
      return divide(data.x, data.y);
      break;
    case "sqrt-x":
      return sqrt(data.x);
      break;
    case "cube-root-x":
      return cubeRoot(data.x);
      break;
    case "x-power-y":
      return raiseToPower(data.x, data.y);
      break;
    case "percentage":
      return percentage(data.x);
      break;
    case "modulus":
      return modulus(data.x, data.y);
      break;
    case "invert-sign":
      return invertSign(data.x);
      break;
  }
}

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

export function round(value) {
  return Number(value.toPrecision(DECIMAL_PLACES));
}
