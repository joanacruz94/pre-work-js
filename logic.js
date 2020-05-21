"use strict";
const getElement = (element) => {
  if (element.charAt(0) === "#") {
    return document.querySelector(element);
  }
  return document.querySelectorAll(element);
};

// Get elements from the DOM
const viewer = getElement("#viewer"),
  equals = getElement("#equals"),
  clear = getElement("#clear"),
  nums = getElement(".num"),
  ops = getElement(".ops");

// Variables to operate
let currentNumber = "",
  oldNumber = "",
  resultNumber,
  operator;

// Calculate the result
const displayNum = () => {
  oldNumber = parseFloat(oldNumber);
  currentNumber = parseFloat(currentNumber);
  switch (operator) {
    case "plus":
      resultNumber = oldNumber + currentNumber;
      break;
    case "minus":
      resultNumber = oldNumber - currentNumber;
      break;
    case "times":
      resultNumber = oldNumber * currentNumber;
      break;
    case "divided by":
      resultNumber = oldNumber / currentNumber;
      break;
    default:
      resultNumber = currentNumber;
  }

  viewer.innerHTML = resultNumber;
  equals.setAttribute("data-result", resultNumber);

  oldNumber = 0;
  currentNumber = resultNumber;
};

const clearAll = () => {
  oldNumber = "";
  currentNumber = "";
  viewer.innerHTML = "0";
  equals.setAttribute("data-result", resultNumber);
};

// Initialize event listeners for numbers buttons
for (let i = 0, l = nums.length; i < l; i++) {
  nums[i].addEventListener("click", () => {
    if (resultNumber) {
      currentNumber = nums[i].getAttribute("data-num");
      resultNumber = "";
    } else {
      currentNumber += nums[i].getAttribute("data-num");
    }

    viewer.innerHTML = currentNumber;
  });
}

// Initialize event listeners for operators buttons
for (let i = 0, l = ops.length; i < l; i++) {
  ops[i].addEventListener("click", () => {
    oldNumber = currentNumber;
    currentNumber = "";
    operator = ops[i].getAttribute("data-ops");

    equals.setAttribute("data-result", "");
  });
}

equals.addEventListener("click", displayNum);

clear.addEventListener("click", clearAll);
