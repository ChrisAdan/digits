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
    key.addEventListener("mouseenter", toggleShade);
    key.addEventListener("mouseleave", toggleShade);
  });
  window.addEventListener("keyup", readKeyPress);
  const aboutButton = document.querySelector("#about-button");
  aboutButton.addEventListener("click", toggleAboutPage);
  const closeButton = document.querySelector(".close-modal");
  closeButton.addEventListener("click", toggleAboutPage);
  let robots = [];
  robots.push(document.querySelector(".default-robot"));
  robots.push(document.querySelector(".happy-robot"));
  robots.forEach((robot) => {
    robot.addEventListener("mouseenter", toggleVisibility);
    robot.addEventListener("mouseleave", toggleVisibility);
  });
}

const readKeyPress = (key) => {
  let target;
  switch (key.type) {
    case "click":
      target = { element: key.target };
      target.action = target.element.classList[0];
      target.keyValue = target.element.textContent;
      break;
    case "keyup":
      let code = key.code;
      let currentKey;
      if (key.key === "Shift") {
        return;
      }
      // Need to map the key pressed to the proper event handling
      if (code.includes("Digit")) {
        if (key.shiftKey && ["*", "^", "%"].includes(key.key)) {
          if (key.key === "^") {
            currentKey = document.querySelector("#x-power-y");
          } else if (key.key === "*") {
            currentKey = document.querySelector("#multiply");
          } else if (key.key === "%") {
            currentKey = document.querySelector("#percentage");
          }
        } else {
          currentKey = Array.from(document.querySelectorAll(".digit")).find(
            (button) => {
              return button.getAttribute("data-key-value") === key.key;
            }
          );
        }
      } else if (code === "Minus") {
        currentKey = document.querySelector("#subtract");
      } else if (code === "Slash") {
        currentKey = document.querySelector("#divide");
      } else if (code === "Period") {
        currentKey = document.querySelector(".decimal");
      } else if (code === "Equal" || code === "Enter") {
        if (key.shiftKey) {
          currentKey = document.querySelector("#add");
        } else {
          currentKey = document.querySelector("#equals");
        }
      } else if (code === "Backspace") {
        currentKey = document.querySelector(".undo");
      } else if (code === "Escape") {
        currentKey = document.querySelector(".clear");
      }
      if (currentKey) {
        target = { element: currentKey };
        target.action = target.element.classList[0];
        target.keyValue = target.element.textContent;
      }
      break;
  }
  if (target) {
    routeKeyPress(target);
  }
};

const routeKeyPress = (target) => {
  const currentDisplay = readDisplay();

  const currentActiveOperator = Array.from(calculatorKeys).find((key) => {
    return key.classList.contains("active-operator");
  });
  let operation;
  if (currentActiveOperator) {
    operation = currentActiveOperator.getAttribute("id");
  }
  switch (target.action) {
    case "operator":
      if (!data.x) {
        data.x = +currentDisplay;
      }
      if (currentActiveOperator && currentActiveOperator != target.element) {
        currentActiveOperator.classList.toggle("active-operator");
        target.element.classList.toggle("active-operator");
      } else {
        target.element.classList.toggle("active-operator");
      }
      break;
    case "modifier":
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
      let operand;
      if (currentDisplay === "0" || Number.isNaN(+currentDisplay)) {
        writeDisplay(target.keyValue);
      } else if (currentActiveOperator) {
        if (data.x) {
          if (!data.y) {
            operand = target.keyValue;
          } else {
            operand =
              currentDisplay.length < MAX_DIGITS
                ? currentDisplay.concat(target.keyValue)
                : currentDisplay;
          }
          writeDisplay(operand);
          data.y = +operand;
        } else {
          operand =
            currentDisplay.length < MAX_DIGITS
              ? target.keyValue
              : currentDisplay;
          writeDisplay(operand);
          data.x = +currentDisplay;
          data.y = +target.keyValue;
        }
      } else if (currentDisplay.length < MAX_DIGITS) {
        writeDisplay(currentDisplay.concat(target.keyValue));
      }
      break;
    case "decimal":
      if (
        !currentDisplay.includes(target.keyValue) ||
        +currentDisplay === data.x
      ) {
        if (currentActiveOperator) {
          if (data.x) {
            if (+currentDisplay === data.x) {
              writeDisplay("0".concat(target.keyValue));
            } else {
              writeDisplay(currentDisplay.concat(target.keyValue));
            }
            data.y = +currentDisplay;
          } else {
            writeDisplay("0".concat(target.keyValue));
            data.x = +currentDisplay;
          }
        } else {
          writeDisplay(currentDisplay.concat(target.keyValue));
        }
      } else if (currentDisplay === "0") {
        writeDisplay("0".concat(target.keyValue));
      }
      break;
    case "equals":
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
          getNewData();
          // data.x = result;
        } else {
          writeDisplay("Error :(");
        }
      }
      break;
    case "clear":
      clearDisplay();
      if (currentActiveOperator) {
        currentActiveOperator.classList.toggle("active-operator");
      }
      getNewData();
      break;

    case "undo":
      if (prevDisplays) {
        const prevDisplay = prevDisplays.pop();
        if (prevDisplay) {
          writeDisplay(prevDisplay.display, false);
          data.x = prevDisplay.x;
          data.y = prevDisplay.y;
        }
      }
  }
};

const toggleAboutPage = () => {
  const modal = document.querySelector(".modal");
  modal.classList.toggle("show");
  const calculator = document.querySelector(".main");
  calculator.classList.toggle("hide");
};

const toggleVisibility = (robot) => {
  robot.target.classList.toggle("hide");
  if (robot.target.classList.contains("default-robot")) {
    const happyRobot = document.querySelector(".happy-robot");
    happyRobot.classList.toggle("hide");
  } else {
    const defaultRobot = document.querySelector(".default-robot");
    defaultRobot.classList.toggle("hide");
  }
};

const toggleShade = (event) => {
  console.log(event);
  let target = event.target;
  target.classList.toggle("shade");
};
