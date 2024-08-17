"use strict";

import { readDisplay, writeDisplay, clearDisplay } from "./view.js";
import { MAX_DIGITS, data, getNewData } from "./model.js";

window.addEventListener("DOMContentLoaded", setup);

const calculator = document.querySelector(".calculator-container");
const calculatorKeys = calculator.querySelectorAll("button");

// setup
function setup() {
  // every button needs a listener
  Array.from(calculatorKeys).forEach((key) => {
    key.addEventListener("click", readKeyPress);
  });
}

const readKeyPress = (key) => {
  const target = { element: key.target };
  target.action = target.element.classList[0];
  routeKeyPress(target);
};

const routeKeyPress = (target) => {
  const keyValue = target.element.textContent;
  const currentDisplay = readDisplay();
  const currentActiveOperator = Array.from(calculatorKeys).find((key) => {
    return key.classList.contains("active-operator");
  });
  if (currentActiveOperator) {
    console.log(currentActiveOperator.getAttribute("id"));
  }
  switch (target.action) {
    case "operator":
      console.log("clicked operator");
      if (currentActiveOperator && currentActiveOperator != target.element) {
        currentActiveOperator.classList.toggle("active-operator");
        target.element.classList.toggle("active-operator");
      } else {
        target.element.classList.toggle("active-operator");
      }
      break;
    case "digit":
      if (currentDisplay === "0") {
        writeDisplay(keyValue);
      } else if (currentDisplay.length < MAX_DIGITS) {
        if (currentActiveOperator) {
          console.log(`current display: ${currentDisplay}`);
          const operand = +currentDisplay;
          if (data.x) {
            if (data.y) {
              writeDisplay(currentDisplay.concat(keyValue));
            } else {
              writeDisplay(keyValue);
            }
            data.y = operand;
          } else {
            writeDisplay(keyValue);
            data.x = operand;
          }
          console.log(data);
        } else {
          writeDisplay(currentDisplay.concat(keyValue));
        }
      }
      break;
    case "decimal":
      if (!currentDisplay.includes(keyValue)) {
        writeDisplay(currentDisplay.concat(keyValue));
      }
      break;
    case "equals":
      console.log("clicked equals");
      break;
    case "clear":
      console.log("clicked clear");
      clearDisplay();
      if (currentActiveOperator) {
        currentActiveOperator.classList.toggle("active-operator");
      }
      break;
    case "off-button":
      console.log("clicked off");
      writeDisplay("");
      if (currentActiveOperator) {
        currentActiveOperator.classList.toggle("active-operator");
      }

      break;
  }
};

// undo
