"use strict";

import {
  readDisplay,
  writeDisplay,
  clearDisplay,
  prevDisplays,
} from "./view.js";
import { MAX_DIGITS, data, getNewData, operate, round } from "./model.js";

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
  let operation;
  if (currentActiveOperator) {
    console.log(currentActiveOperator.getAttribute("id"));
    operation = currentActiveOperator.getAttribute("id");
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
    case "modifier":
      console.log("clicked modifier");
      data.x = +currentDisplay;
      operation = target.element.getAttribute("id");
      let result = operate(operation);
      if (!Number.isInteger(result)) {
        result = round(result);
      }
      if (Number.isNaN(result)) {
        writeDisplay("Invalid :(");
      } else {
        writeDisplay(result);
      }
      getNewData();
      break;
    case "digit":
      if (currentDisplay === "0" || Number.isNaN(+currentDisplay)) {
        writeDisplay(keyValue);
      } else if (currentDisplay.length < MAX_DIGITS) {
        if (currentActiveOperator) {
          console.log(`current display: ${currentDisplay}`);
          if (data.x) {
            let operand = currentDisplay.concat(keyValue);
            writeDisplay(operand);

            data.y = +operand;
          } else {
            writeDisplay(keyValue);
            data.x = +currentDisplay;
            data.y = +keyValue;
          }
        } else {
          writeDisplay(currentDisplay.concat(keyValue));
        }
      }
      console.log(data);
      break;
    case "decimal":
      if (!currentDisplay.includes(keyValue)) {
        if (currentActiveOperator) {
          if (data.x) {
            console.log("existing x");
          } else {
            writeDisplay("0".concat(keyValue));
            data.x = +currentDisplay;
          }
        } else {
          writeDisplay(currentDisplay.concat(keyValue));
        }
      } else if (currentDisplay === "0") {
        writeDisplay("0".concat(keyValue));
      }
      break;
    case "equals":
      console.log("clicked equals");
      if (currentActiveOperator) {
        currentActiveOperator.classList.toggle("active-operator");
        let result = operate(operation);
        if (result) {
          if (
            !Number.isInteger(result) ||
            result.toString().length > MAX_DIGITS
          ) {
            result = round(result);
          }
          writeDisplay(result);
          data.x = result;
          getNewData();
        } else {
          writeDisplay("Error :(");
        }
      }
      break;
    case "clear":
      console.log("clicked clear");
      clearDisplay();
      if (currentActiveOperator) {
        currentActiveOperator.classList.toggle("active-operator");
      }
      getNewData();
      break;
    case "off-button":
      console.log("clicked off");
      writeDisplay("");
      if (currentActiveOperator) {
        currentActiveOperator.classList.toggle("active-operator");
      }

      break;
    case "undo":
      console.log("clicked undo");
      if (prevDisplays) {
        const prevDisplay = prevDisplays.pop();
        writeDisplay(prevDisplay, false);
      }
  }
};

// undo
