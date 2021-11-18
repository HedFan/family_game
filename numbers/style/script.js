const emptyAnswerText = "Empty answer!";
const rightAnswerText = "Right answer!";
const wrongAnswerText = "Wrong answer!";
const loseText = "Ooops";
const rightAnswer = '31';
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const inputContent = document.getElementById('inputContent');
const containerInput = document.getElementById('containerInput');
const containerBadResult = document.getElementById('containerBadResult');
const mainStorage = window.localStorage;

window.addEventListener('load', function () {
    initialize();
})

function initialize() {
    if(!mainStorage.length) {
        this.setNewLocalStorage();
    }
    if(mainStorage.getItem('counter') === '1') {
        failFunction();
    }
    else {
        this.containerInput.removeAttribute('hidden');

    }
}

function checkForm() {
    const buttonModal = document.getElementById('buttonModal');
    const inputValue = this.inputContent.value.trim();

    switch (inputValue) {
        case rightAnswer:
            this.modalTitle.innerHTML = rightAnswerText;
            this.modalBody.innerHTML = 'Красавчик! <br>Можешь смело идти копаться в грязном белье! 😁👍';
            break;
        case '':
            this.modalTitle.innerHTML = emptyAnswerText;
            this.modalBody.innerHTML = 'Поле пустое - попробуй-ка еще разок';
            break;
        default:
            if(mainStorage.getItem('counter') === '1') {
                this.modalTitle.innerHTML = loseText;
                this.modalBody.innerHTML = 'Похоже ты таки перестарался...Ну значит без подарка 🤷‍♀️';
                failFunction();
                buttonModal.click();
                return;
            }
            const newLocalStorage = Number(mainStorage.getItem('counter')) - 1;
            mainStorage.setItem('counter', newLocalStorage.toString());

            this.modalTitle.innerHTML = wrongAnswerText;
            this.modalBody.innerHTML = `Попробуй-ка еще раз...<br>Только не перестарайся, ибо у тебя осталось попыток: ${ newLocalStorage } 👍`;
            this.inputContent.value = '';
            break;
    }
    buttonModal.click();
}

function validate() {
    let theEvent = window.event;
    key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    let regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function setNewLocalStorage() {
    mainStorage.clear();
    mainStorage.setItem('counter', '4');
}

function failFunction() {
    this.containerBadResult.innerHTML = '🤪';
    this.containerInput.parentNode.removeChild(this.containerInput);
    return false;
}


