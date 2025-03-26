const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".numbers");
// console.log("numberButtons:", numberButtons);
const controlButtons = document.querySelectorAll(".control")


let firstDigit = "";
let operator = "";
let secondDigit = "";
let equalsPressed = false;

numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        if (equalsPressed) {
            display.value = "";
            equalsPressed = false;
        }
        display.value += this.textContent;
    });
});

controlButtons.forEach(button => {
    if (button.textContent === "+" || button.textContent === "-" || button.textContent === "*" || button.textContent === "/") {
        button.addEventListener("click", function() {
            if (firstDigit !== "") {
                secondDigit = display.value;
                display.value = operate(parseFloat(firstDigit), operator, parseFloat(secondDigit));
                firstDigit = display.value;
            } else {
                firstDigit = display.value;
            }
            operator = this.textContent;
            display.value = "";
        });
    } else if (button.textContent === "=") {
        button.addEventListener("click", function() {
            if (firstDigit !== "" && display.value !== "") {
                secondDigit = display.value;
                display.value = operate(parseFloat(firstDigit), operator, parseFloat(secondDigit));
                firstDigit = "";
                operator = "";
                secondDigit = "";
                equalsPressed = true;
            }
        });
    } else if (button.textContent === "AC") {
        button.addEventListener("click", function() {
            firstDigit = "";
            operator = "";
            secondDigit = "";
            display.value = "";
            equalsPressed = false;
        });
    } else if (button.textContent === "DEL") {
        button.addEventListener("click", function() {
            display.value = display.value.slice(0, -1);
            equalsPressed = false;
        });
    } else if (button.textContent === ".") {
        button.addEventListener("click", function() {
            if (!display.value.includes(".")) {
                display.value += ".";
                equalsPressed = false;
            }
        });
    }
});

function operate(firstDigit, operator, secondDigit) {
    if (operator === "+") {
        return add(firstDigit, secondDigit);
    } else if (operator === "-") {
        return subtract(firstDigit, secondDigit);
    } else if (operator === "*") {
        return multiply(firstDigit, secondDigit);
    } else if (operator === "/") {
        return divide(firstDigit, secondDigit);
    } else {
        return null;
    }
}

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Undefined Behavior";
    }
    return parseFloat(a) / parseFloat(b);
}
