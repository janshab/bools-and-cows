'use strict';
let turnAmount = 0;
let isRed = false;
let bulls = 0;
let cows = 0;
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
    });
});
function resetGame(inputs){
    inputs.forEach(input => {
        input.value = '';
    });
    let elements = document.querySelectorAll('.try');
    Array.from(elements).forEach(element => {
    element.parentNode.removeChild(element);
    });
    turnAmount = 0;
    bulls = 0;
    cows = 0;
    secretNumber = generateSecretNumber();
}
function continueGame(inputNumbers){
    let tryText = `Попытка ${turnAmount}: ${inputNumbers.join("")} - Быки\u{1F402} ${bulls}  Коровы\u{1f42e} ${cows}`;
    let tryList = document.getElementById('triesList');
    let tryItem = document.createElement('li');
    tryItem.textContent = tryText;
    tryItem.classList.add('try');
    tryList.appendChild(tryItem);
    bulls = 0;
    cows = 0;
}
let secretNumber = generateSecretNumber();
function generateSecretNumber() {
    const numbers = '1234567890'.split("")
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .map(Number);
    return numbers;
}
function checkGuess() {
    const inputs = document.querySelectorAll('input');
    const inputNumbers = Array.from(inputs).map(input => input.value);
    if (isRed){
        document.getElementById('result').style.color = '#ffbf00';
        }
        if (inputNumbers.every(element => element !== "")) {
            document.getElementById('result').style.color = '#ffbf00';
        } else {
            isRed = true;
            document.getElementById('result').style.color = '#ff0000';
            document.getElementById('result').innerText = "Пожалуйста, заполните ВСЕ пропуски!";
            return;
        }
    if (inputNumbers.some(isNaN)){
        isRed = true;
        document.getElementById('result').style.color = '#ff0000';
        document.getElementById('result').innerText= "Вводите только цифры!";
        return;
    }
    const uniqNumbers = new Set(inputNumbers);
    if (uniqNumbers.size !== inputNumbers.length) {
        isRed = true;
        document.getElementById('result').style.color = '#ff0000';
        document.getElementById('result').innerText = "Цифры не могут повторяться!";
        return;
    }
    turnAmount++;
    const inputNumbersNum = inputNumbers.map(Number);
    for (let i = 0; i < inputNumbersNum.length; i++) {
        if (inputNumbersNum[i] === secretNumber[i]) {
            bulls++;
        } else if (secretNumber.includes(inputNumbersNum[i])) {
            cows++;
        }  
    }
    document.getElementById('result').innerText = `Быки\u{1F402} ${bulls} | Коровы\u{1f42e} ${cows}`;
    if (bulls === 4) {
        document.getElementById('result').innerText =`Молодец, лучший! Да, это ${secretNumber.join("")}.`;
        document.getElementById('result').style.color = '#0d9e00';
        resetGame(inputs);
    }
    else{
        continueGame(inputNumbers);
    } 
}

