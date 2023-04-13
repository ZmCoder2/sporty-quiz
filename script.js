var startButton = document.getElementById('startBtn');
var nextButton = document.getElementById('nextBtn');
var questionContainer = document.getElementById('questionBin');
var questionElement = document.getElementById('question');
var answerBtnElement = document.getElementById('answerBtn');

var questionOrder, presentQuestion;


// nextButton = document.addEventListener('click', () => {
//     presentQuestion++;
//     nextQuestion();
//     console.log('lsu')
// });
startButton.addEventListener('click', startQuiz() {
    startButton.classList.addEventListener('hide');
    questionOrder = questions.sort(() => Math.random() - .5);
    presentQuestion = 0;
    questionContainer.classList.remove('hide');
    nextQuestion();
})


console.log(startQuiz)
// startButton.addEventListener('click', startQuiz)
// function nextQuestion() {
//     questionReset();
//     displayQuestion(questionOrder[presentQuestion]);
// }

function displayQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        };
        button.addEventListener('click', questionAnswered);
        answerBtnElement.appendChild(button);
    });
}

function questionReset() {
    clearStatus(document.body);
    nextBtn.classList.add('hide');
    while (answerBtnElement.firstChild) {
        answerBtnElement.removeChild(answerBtnElement.firstChild);
    }
}

function questionAnswered(event) {
    var btnSelected = event.target;
    var correct = btnSelected.dataset.correct;
    setBodyStatus(document.body, correct);
    Array.from(answerBtnElement.children).forEach((button) => {
        setBodyStatus(button, button.dataset.correct);
    }) 
    if (questionOrder.length > presentQuestion + 1) { 
        // this means we have more questions than we are currently on
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setBodyStatus(element, correct) {
    clearStatus(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatus(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

var questions = [
    {
        question: 'What is 2+2?',
        answers: [
            { text: '4', correct: true },
            { text: '32', correct: false },
        ],
    },
]