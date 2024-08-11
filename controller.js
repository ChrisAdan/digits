"use strict";
import { operate, clearAll, pushOperand, pushOperator } from "./model.js";
import { render, clearScreen } from "./view.js";

window.addEventListener("DOMContentLoaded", setup);

// setup
function setup() {
  // every button needs a listener
  // off
  document.querySelector(".off-button").addEventListener("click", powerOff);
  // AC
  document.querySelector(".clear").addEventListener("click", clearDisplay);
  // Undo
  document.querySelector(".undo").addEventListener("click", undo);

  //   digits
  Array.from(document.querySelectorAll(".digit")).forEach((button) =>
    button.addEventListener("click", inputDigit)
  );

  //   decimals later
  document.querySelector(".decimal").addEventListener("click", inputDecimal);

  // operators
  Array.from(document.querySelectorAll(".operator")).forEach((button) =>
    button.addEventListener("click", inputOperator)
  );

  //   equals
  document.querySelector("#equals").addEventListener("click", triggerOperation);
}

const inputDigit = (event) => {
  //   console.log(`input ${+event.target.textContent}`);
  pushOperand(+event.target.textContent);
};

const inputOperator = (event) => {
  //   console.log(`input ${event.target.getAttribute("id")}`);
  pushOperator(event.target.getAttribute("id"));
};

const inputDecimal = (event) => {
  console.log(`called inputDecimal ${event.target.textContent}`);
};

const triggerOperation = () => {
  operate();
};

// undo
const undo = () => {
  console.log("called undo");
};

// clearAll
const clearDisplay = () => {
  render(clearAll());
};

// powerOff
const powerOff = () => {
  clearAll();
  clearScreen();
};

// operate

// renderUpdate
