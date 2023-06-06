const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

function operate(a, op, b) {
    switch(op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return "ERROR: Invalid Input";
    }
}

let displayValue;
const results = document.querySelector(".results-container");

let display = function (button_text) {
    if (displayValue) {
        displayValue.textContent += button_text;
    }

    if (!displayValue) {
        displayValue = document.createElement('p');
        displayValue.textContent = button_text;
        results.appendChild(displayValue);
    }

    console.log(displayValue.textContent);
    return displayValue.textContent;
}

const buttons = document.querySelectorAll("button");
let operators = ['+', '-', 'x' , '÷', '='];
let num1;
let num2;
let operator;
let result = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.getAttribute("id") === "btn-clear") {
            displayValue.textContent = "";
            num1 = "";
            num2 = "";
            return;
        }

        if (button.getAttribute("id") === "btn-delete") {
            displayValue.textContent = displayValue.textContent.slice(0, displayValue.textContent.length - 1);

            if (result === true) {
                num1 = displayValue.textContent.slice(0);
                num2 = displayValue.textContent.slice(num1.length + 1);
            }
            return;
        }

        console.log(result);
        
        if (button.getAttribute("class") === "operator" && button.getAttribute("id") !== "equal" && !num1) {
            num1 = displayValue.textContent.slice(0);
        }

        if (button.getAttribute("class") === "operator" && num1 === "" && num2 === "") {
            return;
        }

        if (num1) {
            num2 = displayValue.textContent.slice(num1.length + 1);
        }

        if (result === true && button.getAttribute("class") === "number" && !operators.includes(displayValue.textContent[displayValue.textContent.length - 1])) {
            displayValue.textContent = "" + button.textContent;
            result = false;
            num1 = "";
            num2 = "";
            return;
        }

        console.log("Num1: " + num1);
        console.log("Num2: " + num2);

        result = false;

        display(button.textContent);

        if (operators.includes(displayValue.textContent[displayValue.textContent.length - 1]) && operators.includes(displayValue.textContent[displayValue.textContent.length - 2])) {
            if (button.textContent !== displayValue.textContent[displayValue.textContent.length - 2]) {
                displayValue.textContent = displayValue.textContent.slice(0, displayValue.textContent.length - 2) + button.textContent;
            }

            else {
                displayValue.textContent = displayValue.textContent.slice(0, displayValue.textContent.length - 1);
            }
        }

        if (button.getAttribute("id") === "equal" && !num1 && !num2) {
            displayValue.textContent = displayValue.textContent.slice(0, displayValue.textContent.length - 1);
            return;
        }

        if (button.getAttribute("id") === "equal" && num1 && !num2) {
            displayValue.textContent = displayValue.textContent.slice(0, displayValue.textContent.length - 1);
            return;
        }

        if (button.getAttribute("id") === "equal" && num1 && num2 !== "") {
            let operator = displayValue.textContent[num1.length];
            displayValue.textContent = String(operate(Number(num1), operator, Number(num2)));
            num1 = String(operate(Number(num1), operator, Number(num2)));
            num2 = "";
            result = true;
        }

        else if (button.getAttribute("class") === "operator" && num1 && num2 !== "") {
            let operator = displayValue.textContent[num1.length];
            displayValue.textContent = String(operate(Number(num1), operator, Number(num2))) + button.textContent;
            num1 = String(operate(Number(num1), operator, Number(num2)));
            num2 = "";
            result = true;
        }
    })
})