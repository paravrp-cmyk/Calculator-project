const displayCur = document.querySelector('.displayCurrent')
const displayHis = document.querySelector('.displayHistory')
const buttons = document.querySelector('.buttons')
let firstNumber = '';
let operator = '';
let secondNumber = '';
let isWaitingForSecondNumber = false;
let isRepeatedEqual = false;
let percentRate = 0;

const runMath = function(num1, op, num2){
    let result = 0;

    if (op === '+'){
        result = +num1 + +num2;
    } else if (op === '-'){
        result = +num1 - +num2;
    } else if (op === '*'){
        result = +num1 * +num2;
    } else if (op === '/'){
        result = +num1 / +num2;
    }
    return result;
}

buttons.addEventListener('click', (event) =>{
    if (event.target.tagName !== 'BUTTON'){
        return;
    }

    if (event.target.classList.contains('number')){
        isRepeatedEqual = false;

        if (displayCur.textContent === '0'){
            displayCur.textContent = event.target.textContent;
        } else {
            displayCur.textContent += event.target.textContent;
        }
    }

    if (event.target.classList.contains('clear')){
        displayHis.textContent = '';
        displayCur.textContent = '0';
        firstNumber= '';
        secondNumber='';
        operator='';
        isWaitingForSecondNumber = false;
        isRepeatedEqual = false;
    }
    if (event.target.classList.contains('operator')){
        isRepeatedEqual = false;
        firstNumber = displayCur.textContent;
        operator = event.target.dataset.action;
        isWaitingForSecondNumber = true;
        displayCur.textContent = displayCur.textContent + ' ' + event.target.textContent + ' ';
    }

    if (event.target.classList.contains('equal')){
        let textForMath = displayCur.textContent.replaceAll(',', '.');
        let parts = textForMath.split(' ');
        let result = 0;

        if (parts.length === 3){
            firstNumber = parts[0];
            operator = parts[1];

            if (parts[2].endsWith('%')){
                percentRate = parseFloat(parts[2]);
                secondNumber = (+firstNumber * percentRate) / 100;
            } else {
                percentRate = 0;
                secondNumber = parts[2]
            }
            displayHis.textContent = displayCur.textContent;
            result = runMath(firstNumber, operator, secondNumber);
        } else if (parts.length != 3){
            if (textForMath.endsWith('%')){
                displayHis.textContent = displayCur.textContent;
                result = parseFloat(textForMath) / 100;
                operator = '';
                secondNumber= '';
            } else {
                if(!operator){
                    return;
                }

                firstNumber = textForMath;

                if (percentRate>0){
                    secondNumber = (+firstNumber * percentRate) / 100;
                    displayHis.textContent = `${firstNumber} ${operator} ${percentRate}%`; 
                } else {
                    displayHis.textContent = `${firstNumber} ${operator} ${secondNumber}`;
                }
                
                result = runMath(firstNumber, operator, secondNumber);
            }
        }
        let finalString = String(result).replace('.', ',');
        displayHis.textContent = displayHis.textContent.replaceAll('.', ',');
        displayCur.textContent = finalString;
    }

    if (event.target.classList.contains('delete')){
        if (displayCur.textContent.length === 1 || displayCur.textContent === '0'){
            displayCur.textContent = '0';
        } else {
            displayCur.textContent = displayCur.textContent.slice(0, -1)
        }
    }

    if (event.target.classList.contains('toggle-sign')) {
    displayCur.textContent = +displayCur.textContent * -1;
    firstNumber = displayCur.textContent;
    }

    if (event.target.classList.contains('decimal')) {
        if (isWaitingForSecondNumber === true) {
            displayCur.textContent = '0,';
            isWaitingForSecondNumber = false;
            isRepeatedEqual = false;
            return;
        }

        if (!displayCur.textContent.includes(',')) {
            displayCur.textContent += ',';
            isRepeatedEqual = false;
        }
    }

    if (event.target.classList.contains('percent')) {
        displayCur.textContent += '%';
    }
})