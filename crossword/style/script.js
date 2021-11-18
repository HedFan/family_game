const answerLetters = document.getElementById('answerLetters');
const crossword = document.getElementById('crossword');
const wordsMapper = [4, 7, 7, 5, 5, 4, 9, 8, 4];
const mainLetters = [2, 2, 1, 3, 4, 1, 3, 0, 3 ];
const linesSpaceArray = [7];
const spaceLetters = [4];
const linesArray = [];
const inputs = [];

window.addEventListener('load', function () {
    initialize();
})

function initialize() {
    buildCrossword();
    typingListener();
}

function buildCrossword() {
    const wordsLength = wordsMapper.length;
    repeat(wordsLength).map(value => {
        const elemDiv = document.createElement('div');
        const elemSpan = document.createElement('span');
        elemDiv.classList.add(`line-word`);
        elemDiv.setAttribute('line-index', (value++).toString());
        elemSpan.innerHTML = value.toString();
        this.crossword.appendChild(elemDiv);
        elemDiv.appendChild(elemSpan);
        linesArray.push(elemDiv);
    });

    linesArray.forEach((lineElement, lineIndex) => {
        repeat(wordsMapper[lineIndex]).map((wordElement, wordIndex) => {
            const elemInput = document.createElement('input');
            elemInput.classList.add(`input-letter`);
            elemInput.setAttribute('maxlength', '1');
            if(wordIndex === mainLetters[lineIndex]) {
                elemInput.classList.add(`input-letter--main`);
            }
            if(lineIndex === linesSpaceArray[0] && wordIndex === spaceLetters[0]) {
                elemInput.classList.add(`input-letter--space`);
                elemInput.setAttribute('disabled', 'true');
            }
            inputs.push(elemInput);
            lineElement.appendChild(elemInput);
        });

    });
}

function typingListener() {
    inputs.forEach((input, inputIndex) => {
        input.addEventListener('keyup', function(e) {
            const kCode = e.key;
            if(input.value.length === input.maxLength && inputs[inputIndex + 1] && !kCode.match(/[^a-zA-Zа-яА-Я0-9]+/g)) {
                const nextIndex = inputs[inputIndex + 1].hasAttribute('disabled') ? 2 : 1;
                inputs[inputIndex + nextIndex].focus();
            }
        });
        input.addEventListener('keydown', function(e) {
            const { key } = e;
            if (key === 'Backspace' && inputs[inputIndex - 1] && input.value.length === 0) {
                const nextIndex = inputs[inputIndex - 1].hasAttribute('disabled') ? 2 : 1;
                inputs[inputIndex - nextIndex].focus();
            }
        });
    });

}

function repeat(repeatCount) {
    if (repeatCount < 0 || !Number.isInteger(repeatCount)) {
        throw new Error('Repeat number should be positive integer');
    }
    return Array.from({ length: repeatCount }, (val, index) => index);
}
