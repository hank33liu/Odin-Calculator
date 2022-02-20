//Constants and variables
const oldDisplay = document.querySelector('.oldDisplay');
const newDisplay = document.querySelector('.newDisplay');
let oldDisplayValue = '';
let currentOperator = '';


//Operator functions
function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

//Updates newValue by incrementing with a new string char.
//Only for use with "." and "0-9"
//Then add this function to those
function increaseNewValue() {
    if (newDisplay.value==='0' && this.textContent==='0') {
        return
    } else if (newDisplay.value.includes('.')  && this.textContent==='.') {
        return
    } else if ((newDisplay.value==='0' || newDisplay.value==='' ) && this.textContent==='.') {
        newDisplay.value = '0';
    } else if (newDisplay.value==='0') {
        newDisplay.value = '';
    }
    newDisplay.value += this.textContent;
}
document.querySelectorAll('.number').forEach(item => {
    item.addEventListener('click', increaseNewValue);
})

//Clears new and old values and resets calculator to base state
function clearDisplays () {
    oldDisplay.value = '';
    oldDisplayValue = '';
    newDisplay.value = 0;
    currentOperator = ''
}
document.querySelector('.CLEAR').addEventListener('click', clearDisplays);

//Deletes the last character of newDisplay.value
function displayDelete () {
    newDisplay.value = newDisplay.value.slice(0, -1);
    if (newDisplay.value==='') {
        newDisplay.value = '0';
    }
}
document.querySelector('.DELETE').addEventListener('click', displayDelete);

//Updates oldDisplay based on which operator button is pressed 
function trackOldDisplay () {
    if (currentOperator===divide && newDisplay.value==='0') {
        alert('Cannot divide by 0.');
        return;
    }
    if ((newDisplay.value==='' || newDisplay.value==='.') && oldDisplay.value.includes('=')===false) {
        switch (this.textContent) {
            case '+':
                currentOperator = add;
            break;
            case '-':
                currentOperator = subtract;
                break;
            case '÷':
                currentOperator = divide;
                break;
            case '×':
                currentOperator = multiply;
                break;
            default:
        }
        oldDisplay.value = oldDisplay.value.slice(0,-2) + ' ' + this.textContent;
        return;
    }


    if (oldDisplay.value.includes('=')) {
        oldDisplay.value = oldDisplay.value = oldDisplayValue + ' ' + this.textContent;
    } else if (currentOperator==='') {
        oldDisplayValue = newDisplay.value;
        oldDisplay.value = newDisplay.value + ' ' + this.textContent;
    } else { 
        oldDisplayValue = operate(currentOperator, Number(oldDisplayValue), Number(newDisplay.value));
        oldDisplay.value = oldDisplayValue + ' ' + this.textContent;
    }
    newDisplay.value = ''
    switch (this.textContent) {
        case '+':
            currentOperator = add;
        break;
        case '-':
            currentOperator = subtract;
            break;
        case '÷':
            currentOperator = divide;
            break;
        case '×':
            currentOperator = multiply;
            break;
        default:
    }
    console.log(this.textContent);
}
document.querySelectorAll('.operator').forEach(item => {
    item.addEventListener('click', trackOldDisplay);
})

//Updates oldDisplay when equal is pressed
let currentOperatorType = '';
function equalOldDisplay() {
    if (currentOperator===divide && newDisplay.value==='0') {
        alert('Cannot divide by 0.');
        return;
    }
    if (newDisplay.value==='' || currentOperator === '') {return}
    switch (currentOperator) {
        case add:
            currentOperatorType = '+';
            break;
        case subtract:
            currentOperatorType = '-';
            break;
        case multiply:
            currentOperatorType = '×';
            break;
        case divide:
            currentOperatorType = '÷';
            break;
    }
    oldDisplay.value = oldDisplayValue + ' ' + currentOperatorType + ' ' + newDisplay.value + ' = ' ;
    oldDisplayValue = operate(currentOperator, Number(oldDisplayValue), Number(newDisplay.value));
    oldDisplay.value += oldDisplayValue;
    newDisplay.value = '';
    currentOperator ='';
}
document.querySelector('.EQUAL').addEventListener('click', equalOldDisplay);