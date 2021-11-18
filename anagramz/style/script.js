const answerLetters = document.getElementById('answerLetters');
const offeredLetters = document.getElementById('offeredLetters');
const buttonModal = document.getElementById('buttonModal');
const lettersList = ['Т','У','А','Л','Е','Т','Н','А','Я','Б','У','М','А','Г','А'];
const lettersMapper = [9, 0, 6];
const lettersDom = [];
const answersDom = [];

window.addEventListener('load', function () {
    initialize();
})

function initialize() {
    buildLetters();
    letterClick();
}

function buildLetters() {
    let idCount = 0;
    const shuffleArray = Array.from(lettersList);
    shuffle(shuffleArray);
    lettersMapper.forEach(value => {
        if(value === 0) {
            const elemDiv = document.createElement('div');
            elemDiv.classList.add('space-letter', 'col-12');
            answerLetters.appendChild(elemDiv);
        }
        else {
            repeat(value).map(() => {
                const elemDiv = document.createElement('div');
                elemDiv.classList.add(`answer-letter`);
                elemDiv.id = `index-${ idCount }`;
                idCount++;
                answerLetters.appendChild(elemDiv);
                answersDom.push(elemDiv);
            });
        }
    });

    shuffleArray.forEach((value, index) => {
        const elemDiv = document.createElement('div');
        elemDiv.classList.add(`offer-letter`);
        elemDiv.id = `index-${ index }`;
        elemDiv.innerHTML = value;
        elemDiv.setAttribute('letter-attr', value);
        offeredLetters.appendChild(elemDiv);
        lettersDom.push(elemDiv);
    });
}

function letterClick() {
    lettersDom.forEach((letterDom, letterDomIndex) => {
        letterDom.addEventListener('click', function(e) {
            const letter = letterDom.getAttribute('letter-attr');

            for(let i=0; i<answersDom.length; i++) {
                const answerDomLetter = answersDom[i];
                if (!answerDomLetter.hasAttribute('letter-index-attr')) {
                    answerDomLetter.innerHTML = letter
                    answerDomLetter.setAttribute('letter-index-attr', letterDomIndex);
                    const isCorrectLetter = checkCorrectLetter(i, letter);
                    const answerClass = isCorrectLetter ? 'answer-letter--correct' : 'answer-letter--enabled';
                    answerDomLetter.classList.add(answerClass);
                    letterDom.classList.add('offer-letter--disabled');
                    if(isCorrectLetter) {
                        letterDom.setAttribute('letter-block', true);
                        checkGameWin();
                    }
                    return;
                }
            }
        });
    });
    answersDom.forEach(answerDom => {
        answerDom.addEventListener('click', function(e) {
            const indexAttr = answerDom.getAttribute('letter-index-attr');
            answerDom.classList.remove('answer-letter--enabled');
            lettersDom[indexAttr].classList.remove('offer-letter--disabled');
            answerDom.removeAttribute('letter-index-attr');
            answerDom.innerHTML = '';
        });
    })
}

function checkGameWin() {
    const isBisy = lettersDom.every(letterDom => letterDom.hasAttribute('letter-block'));
    if(isBisy) {
        this.buttonModal.click();
    }
}

function resetLetters() {
    lettersDom.forEach(letterDom => {
        if(!letterDom.hasAttribute('letter-block')) {
            letterDom.classList.remove('offer-letter--disabled');
        }
    });

    answersDom.forEach(answerDom => {
        if(!answerDom.classList.contains('answer-letter--correct')) {
            answerDom.removeAttribute('letter-index-attr');
            answerDom.innerHTML = '';
        }
        answerDom.classList.remove('answer-letter--enabled');
    })
}

function checkCorrectLetter(position, letter) {
    return lettersList[position] === letter;
}

function repeat(repeatCount) {
    if (repeatCount < 0 || !Number.isInteger(repeatCount)) {
        throw new Error('Repeat number should be positive integer');
    }
    return Array.from({ length: repeatCount }, (val, index) => index);
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
