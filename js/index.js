const result = document.getElementById('result');
let history = [];
let operation = '';
let shouldClearResult = false;
const container = document.querySelector(".history");
const iconButton = document.querySelector('.icon-menu');
const sliderContainer = document.querySelector('.history');
const closeButton = document.querySelector('.close-button');
const paragraphContainer = document.querySelector('.history-content');

function addToOperation(value) {
    operation += value;
    result.value = operation;
}
function calculate() {
    try {
        result.value = eval(operation);
        let x = operation + " = " + result.value;
        operation = result.value;
        if (history.length === 5) {
            history.pop();
            const lastChild = paragraphContainer.lastChild;
            paragraphContainer.removeChild(lastChild);
            history.unshift(x);
        } else {
            history.unshift(x);
        }
        const p = document.createElement("p");
        p.textContent = x;
        paragraphContainer.appendChild(p);
        console.log(history);
        shouldClearResult = true;
    } catch (e) {
        result.value = 'Error';
    }

}
function clearAll() {
    result.value = '';
    operation = '';
    shouldClearResult = false;
}
function clearEntry() {
    operation = operation.slice(0, -1);
    result.value = operation;
}
function deleteChar() {
    if (shouldClearResult) {
        clearAll();
    } else {
        clearEntry();
    }
}
document.querySelectorAll('.button button').forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.textContent;
        switch (value) {
            case 'C':
                clearAll();
                break;
            case 'CE':
                clearEntry();
                break;
            case '&larr;':
                deleteChar();
                break;
            case '=':
                calculate();
                break;
            default:
                addToOperation(value);
                break;
        }
    });
});
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        if (shouldClearResult) {
            result.value = '';
            shouldClearResult = false;
        }
        addToOperation(key);
    } else if (key === 'Backspace') {
        deleteChar();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Delete') {
        clearEntry();
    } else if (key === 'Enter' || key === '=') {
        calculate();
    }
});

iconButton.addEventListener('click', () => {
    sliderContainer.classList.toggle('active');
    iconButton.classList.toggle('active');
    closeButton.classList.toggle('active');
    history.forEach((value) => {
        const p = document.createElement("p");
        p.textContent = value;
        paragraphContainer.appendChild(p);
    })
});
closeButton.addEventListener('click', () => {
    let paragraphs = document.querySelectorAll('.history-content p');

    paragraphs.forEach(function (paragraph) {
        console.log("borrando");
        paragraphContainer.removeChild(paragraph);
    });
    sliderContainer.classList.toggle('active');
    iconButton.classList.toggle('active');
    closeButton.classList.remove('active');
});
