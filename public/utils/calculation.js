function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error";
    }
    return a / b;
}

function modulus(a, b) {
    if (b === 0) {
        return "Error";
    }
    return a % b;
}

function separator(expression) {
    let numbersOperators = [];
    let number = "";

    for (let i = 0; i < expression.length; i++) {
        let character = expression[i];
        if (!isNaN(character) || character === ".") {
            number += character;
        } else if (character === "-" && (i === 0 || (expression[i - 1] === "+" || expression[i - 1] === "-" || expression[i - 1] === "*" || expression[i - 1] === "/" || expression[i - 1] === "%"))) {
            number += character;
        } else {
            numbersOperators.push(Number(number));
            numbersOperators.push(character);
            number = "";
        }
    }

    if (number !== "") {
        numbersOperators.push(Number(number));
    }
    return numbersOperators;
}

function calculate(characters) {
    let result = characters[0];

    for (let i = 1; i < characters.length; i += 2) {
        let operator = characters[i];
        let nextNumber = characters[i + 1];
        if (operator === "+") {
            result = add(result, nextNumber);
        } else if (operator === "-") {
            result = subtract(result, nextNumber);
        } else if (operator === "*") {
            result = multiply(result, nextNumber);
        } else if (operator === "/") {
            if (nextNumber === 0) {
                return "Error";
            }
            result = divide(result, nextNumber);
        } else if (operator === "%") {
            if (nextNumber === 0) {
                return "Error";
            }
            result = modulus(result, nextNumber);
        }
    }

    return result;
}

module.exports = {separator, calculate};