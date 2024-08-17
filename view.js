"use strict";

const display = document.querySelector(".display");

export function readDisplay() {
  return display.textContent;
}

export function writeDisplay(value) {
  display.textContent = value;
}

export function clearDisplay() {
  display.textContent = 0;
}
