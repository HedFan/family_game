const clueSpans = document.querySelectorAll('.clue-span');
const clueWord = document.getElementById('clueWord');
const clueLetter = 'г';

window.addEventListener('load', function () {
    initialize();
})

function initialize() {
}
function clueForm() {
    this.clueWord.classList.add('bold-style');
    clueSpans.forEach(span => {
        span.innerHTML = clueLetter;
    });
}
