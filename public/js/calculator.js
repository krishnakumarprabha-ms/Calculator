const display = document.getElementById("resultArea");
let newExpression = true;

function addValue(value) {
    console.log("start");
    
    if (!newExpression) {
        display.value = "";
        newExpression = true;
    }

    let lastCharacter = display.value[display.value.length - 1];
    
    if ((lastCharacter === "+" || lastCharacter === "-" || lastCharacter === "*" || lastCharacter === "/" || lastCharacter === "%") && (value === "+" || value === "*" || value === "/" || value === "%")) {
        return;
    }

    if (value === "-" && (display.value === "" ||lastCharacter === "+" || lastCharacter === "-" || lastCharacter === "*" || lastCharacter === "/" || lastCharacter === "%")) {
        display.value += "-";
        return;
    }

    if (value === ".") {
        let lastNumber = "";
        for (let i = 0; i < display.value.length; i++) {
            if (display.value[i] === "+" || display.value[i] === "-" || display.value[i] === "*" || display.value[i] === "/" || display.value[i] === "%") {
                lastNumber = "";
            } else {
                lastNumber += display.value[i]
            }
        }
        if (lastNumber.includes(".")) {
            return;
        }
    }
    
    display.value += value;
    console.log("end")
}

function clearValue() {
    display.value = "";
}

function deleteValue() {
    display.value = display.value.slice(0, -1);
}

async function showResult() {
    let expression = display.value;
    if (expression === "") {
        return;
    }
    let response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            expression: expression
        })
    });
    let answer = await response.json();
    display.value = answer.result;
    newExpression = false;
}