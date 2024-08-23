"use strict";
import { data } from "./model.js";
const display = document.querySelector(".display");

export let prevDisplays = [];

export function readDisplay() {
  return display.textContent;
}

export function writeDisplay(value, log = true) {
  if (log && !Number.isNaN(+display.textContent)) {
    const record = logDisplay();
    prevDisplays.push(record);
  }
  display.textContent = value;
}

export function clearDisplay(log = true) {
  if (log) {
    const record = logDisplay();
    prevDisplays.push(record);
  }
  display.textContent = 0;
}
function logDisplay() {
  const record = { display: display.textContent, x: data.x, y: data.y };
  return record;
}
