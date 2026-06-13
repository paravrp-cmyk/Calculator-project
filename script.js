const displayCur = document.querySelector('.displayCurrent')
const displayHis = document.querySelector('.displayHistory')
const buttons = document.querySelector('.buttons')
let operator = '';
let secondNumber = '';
let isWaitingForSecondNumber = false;
let isRepeatedEqual = false;
let percentRate = 0;

function roundResult(num) {
    return Math.round(num * 10000000) / 10000000;
}

function resetCalculator() {
    displayCur.textContent = '0';
    secondNumber = '';
    operator = '';
    isWaitingForSecondNumber = false;
    isRepeatedEqual = false;
    percentRate = 0;
}

buttons.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }

    if (displayCur.textContent === 'Ошибка' && !event.target.classList.contains('clear')) {
        resetCalculator();
    }

    if (event.target.classList.contains('number')) {
        isRepeatedEqual = false;
        let currentParts = displayCur.textContent.split(' ');
        let lastPart = currentParts[currentParts.length - 1];

        if (lastPart.includes('%')) {
            return;
        }

        if (lastPart === '0') {
            currentParts[currentParts.length - 1] = event.target.textContent;
            displayCur.textContent = currentParts.join(' ');
        } else if (lastPart === '-0') {
            currentParts[currentParts.length - 1] = '-' + event.target.textContent;
            displayCur.textContent = currentParts.join(' ');
        } else {
            displayCur.textContent += event.target.textContent;
        }
    }

    if (event.target.classList.contains('clear')) {
        displayHis.textContent = '';
        resetCalculator();
    }

    if (event.target.classList.contains('operator')) {
        isRepeatedEqual = false;
        isWaitingForSecondNumber = true;
        let opSymbol = event.target.textContent;

        if (displayCur.textContent.endsWith(' ')) {
            displayCur.textContent = displayCur.textContent.slice(0, -3) + ' ' + opSymbol + ' ';
        } else {
            displayCur.textContent = displayCur.textContent + ' ' + opSymbol + ' ';
        }
    }

    if (event.target.classList.contains('equal')) {
        let textForMath = displayCur.textContent
            .replaceAll(',', '.')
            .replaceAll('×', '*')
            .replaceAll('÷', '/')
            .trim();
        
        if (textForMath.endsWith('+') || textForMath.endsWith('-') || textForMath.endsWith('*') || textForMath.endsWith('/')) {
            return; 
        }

        let parts = textForMath.split(' ');
        let result;
        
        if (parts.length > 1) {
            displayHis.textContent = displayCur.textContent;

            for (let i = 0; i < parts.length; i++) {
                if (parts[i].includes('%')) {
                    if (parts[i - 1] === '/' || parts[i - 1] === '*') {
                        parts[i] = +parts[i].replace('%', '') / 100;
                    } else if (parts[i - 1] === '+' || parts[i - 1] === '-') {
                        let leftSideArray = parts.slice(0, i - 1);
                        let leftSideString = leftSideArray.join(' ');
                        let baseValue = new Function(`return ${leftSideString}`)();
                        let currentPercent = parseFloat(parts[i]);
                        parts[i] = (baseValue * currentPercent) / 100;
                    }
                }
            }
            let finalString = parts.join(' ');
            result = new Function(`return ${finalString}`)();

            if (textForMath.endsWith('%')) {
                let lastPart = textForMath.split(' ').pop();
                percentRate = parseFloat(lastPart);
                operator = parts[parts.length - 2];
                secondNumber = '';
            } else {
                secondNumber = parts[parts.length - 1];
                operator = parts[parts.length - 2];
                percentRate = 0;
            }
        } else {
            let cleanCurrentNum = displayCur.textContent.replaceAll(',', '.');
            
            if (percentRate > 0) {
                let viewOperator = operator.replace('*', '×').replace('/', '÷');
                displayHis.textContent = `${displayCur.textContent} ${viewOperator} ${percentRate}%`.replaceAll('.', ',');
                
                let percentValue = (Number(cleanCurrentNum) * percentRate) / 100;
                result = new Function(`return ${cleanCurrentNum} ${operator} ${percentValue}`)();
            } else if (operator && secondNumber) {
                let viewOperator = operator.replace('*', '×').replace('/', '÷');
                displayHis.textContent = `${displayCur.textContent} ${viewOperator} ${secondNumber}`.replaceAll('.', ',');
                
                result = new Function(`return ${cleanCurrentNum} ${operator} ${secondNumber}`)();
            } else {
                return;
            }
        }

        if (!isFinite(result) || isNaN(result)) {
            displayCur.textContent = 'Ошибка';
            return;
        }

        result = roundResult(result);
        displayCur.textContent = String(result).replaceAll('.', ',');
        isWaitingForSecondNumber = false;
    }

    if (event.target.classList.contains('delete')) {
        if (displayCur.textContent.length === 1 || displayCur.textContent === '0') {
            displayCur.textContent = '0';
        } else if (displayCur.textContent.endsWith(' ')) {
            displayCur.textContent = displayCur.textContent.slice(0, -3);
            isWaitingForSecondNumber = false;
        } else {
            displayCur.textContent = displayCur.textContent.slice(0, -1);
        }
    }

    if (event.target.classList.contains('toggle-sign')) {
        let currentParts = displayCur.textContent.split(' ');
        let lastPart = currentParts[currentParts.length - 1];

        if (lastPart !== '' && !isNaN(lastPart.replaceAll(',', '.'))) {
            let toggledNumber = Number(lastPart.replaceAll(',', '.')) * -1;
            currentParts[currentParts.length - 1] = String(toggledNumber).replaceAll('.', ',');
            displayCur.textContent = currentParts.join(' ');
        }
    }

    if (event.target.classList.contains('decimal')) {
        let currentParts = displayCur.textContent.split(' ');
        let lastPart = currentParts[currentParts.length - 1];
        if (!lastPart.includes(',') && !lastPart.includes('%') && lastPart !== '') {
            displayCur.textContent += ',';
        }
    }

    if (event.target.classList.contains('percent')) {
        if (!displayCur.textContent.endsWith('%') && !displayCur.textContent.endsWith(' ') && displayCur.textContent !== '0') {
            displayCur.textContent += '%';
        }
    }
});