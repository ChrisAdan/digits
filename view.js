"use strict";

const display = document.querySelector(".display");

// render
export function render(data) {
  display.textContent = data;
}

export function clearScreen() {
  display.textContent = "";
}

export function getDisplayValue() {
  return +display.textContent;
}
