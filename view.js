"use strict";

const display = document.querySelector(".display");

export let prevDisplays = [];

export function readDisplay() {
  return display.textContent;
}

export function writeDisplay(value, log = true) {
  if (log && !Number.isNaN(+display.textContent)) {
    prevDisplays.push(display.textContent);
  }
  display.textContent = value;
}

export function clearDisplay(log = true) {
  if (log) {
    prevDisplays.push(display.textContent);
  }
  display.textContent = 0;
}
