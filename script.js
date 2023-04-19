var startButton = document.getElementById('startBtn');
var nextButton = document.getElementById('nextBtn');
var questionContainer = document.getElementById('questionBin');
var questionElement = document.getElementById('question');
var answerBtnElement = document.getElementById('answerBtn');

var questionOrder, presentQuestion;

function startQuiz() {
    startButton.classList.add('hide');
    questionOrder = questions.sort(() => Math.random() - .5);
    presentQuestion = 0;
    questionContainer.classList.remove('hide');
    nextQuestion();
};

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    presentQuestion++;
    nextQuestion();
})

function nextQuestion() {
    questionReset();
    displayQuestion(questionOrder[presentQuestion]);
}

// below is all old code from trial and error. Just wanted to leave it as basically a scratch sheet for myself
// nextButton.addEventListener('click', () => {
//     presentQuestion++;
//     nextQuestion();
//     console.log('lsu')
// });
// startButton.addEventListener('click', startQuiz() {
//     startButton.classList.addEventListener('hide');
//     questionOrder = questions.sort(() => Math.random() - .5);
//     presentQuestion = 0;
//     questionContainer.classList.remove('hide');
//     nextQuestion();
// })


// console.log(startQuiz)
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
        question: 'Who won the Super Bowl in 2022?',
        answers: [
            { text: 'Cincinnati Bengals', correct: false },
            { text: 'Kansas City Chiefs', correct: true },
            { text: 'Dallas Cowboys', correct: false },
            { text: 'Atlanta Falcons', correct: false },
        ],
    },
    {
        question: 'Who won the NBA Finals in 2022?',
        answers: [
            { text: 'Toronto Raptors', correct: false },
            { text: 'Boston Celtics', correct: false },
            { text: 'Cleveland Cavaliers', correct: false },
            { text: 'Golden State Warriors', correct: true },
        ]
    },
    {
        question: 'Who won the MLB World Series in 2022?',
        answers: [
            { text: 'Houston Astros', correct: true },
            { text: 'Atlanta Braves', correct: false },
            { text: 'Boston Red Sox', correct: false },
            { text: 'New York Yankees', correct: false },
        ]
    },
    {
        question: 'Who won the College Football Playoff in 2019?',
        answers: [
            { text: 'Alabama', correct: false },
            { text: 'UGA', correct: false },
            { text: 'LSU', correct: true },
            { text: 'Ohio State', correct: false },
        ]
    },
    {
        question: 'Who won the 2022 MVP award in 2022?',
        answers: [
            { text: 'Patrick Mahomes', correct: true },
            { text: 'Joe Burrow', correct: false },
            { text: 'Aaron Rodgers', correct: false },
            { text: 'Tom Brady', correct: false },
        ]
    },
    {
        question: 'Who won the NBA MVP in 2022?',
        answers: [
            { text: 'Stephen Curry', correct: false },
            { text: 'Lebron James', correct: false },
            { text: 'Kevin Durant', correct: false },
            { text: 'Nikola Jokic', correct: true },
        ]
    },
    {
        question: 'Who won MLB MVP in 2022?',
        answers: [
            { text: 'Mike Trout', correct: false },
            { text: 'Bryce Harper', correct: true },
            { text: 'Shohei Otani', correct: false },
            { text: 'Mookie Betts', correct: false },
        ]
    },
    {
        question: 'Who won the 2022 Heisman Award?',
        answers: [
            { text: 'Caleb Williams', correct: true },
            { text: 'CJ Stroud', correct: false },
            { text: 'Bryce Young', correct: false },
            { text: 'Max Duggan', correct: false },
        ]
    },
    {
        question: 'Who won the 2023 Masters Tournament?',
        answers: [
            { text: 'Tiger Woods', correct: false },
            { text: 'Phil Mickleson', correct: false },
            { text: 'John Rahm', correct: true },
            { text: 'Brooks Koepka', correct: false },
        ]
    },
    {
        question: 'Who was the first College Football team to go undefeated and win the College Football Playoff?',
        answers: [
            { text: 'Oklahoma', correct: false },
            { text: 'Alabama', correct: false },
            { text: 'UGA', correct: false },
            { text: 'LSU', correct: true },
        ]
    }
]

var timerEl = document.getElementById('timer');
var timeModifier = 5;
var timeLeft = 60;
var intervalId;

function countdown() {
    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
        }
    }, 1000);
    
    return timeInterval;
}

startButton.addEventListener('click', function() {
    timerEl.style.display = 'block';
    intervalId = countdown();
});

document.addEventListener('click', function(event) {
    var btnSelected = event.target;
    var correct = btnSelected.dataset.correct;
    if (correct) {
        timeLeft = timeLeft + timeModifier;
    } else {
        timeLeft = timeLeft - timeModifier;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = countdown();
    }
});


// document.addEventListener('answer', function(event) {
//     var answer = event.detail.answer;
//     if (answer === 'correct') {
//         timerEl.textContent = parseInt(timerEl.textContent) + 5 + ' seconds remaining';
//     } else if (answer === 'wrong') {
//         timerEl.textContent = parseInt(timerEl.textContent) - 5 + ' seconds remaining';
//     }
// });


// time--;



// var timeLeft = 60;

// var interval = setInterval(() => {
//     // console.log(timer);
//     timer--;

//     if (timer < 0 ) {
//         clearInterval(interval);
//         // console.log('ding!')
//     }
// }, 1000);

// document.addEventListener('answer', function(event) {
//     var answer = event.detail.answer;
//     if (answer === 'correct') {
//       timeLeft += timeModifier;
//     } else if (answer === 'incorrect') {
//       timeLeft -= timeModifier;
//       if (timeLeft < 0) {
//         timeLeft = 0;
//       }
//     }
//   });
// }

// document.addEventListener('answer', function(event) {
//     var answer = event.detail.answer;
//     if (answer === 'correct') {
//       timerEl.textContent = parseInt(timerEl.textContent) + 5 + ' seconds remaining';
//     } else if (answer === 'incorrect') {
//       timerEl.textContent = parseInt(timerEl.textContent) - 5 + ' seconds remaining';
//     }
//   });


// var timerEl = document.getElementById('timer');
// var startButton = document.getElementById('start-button');

// function countdown(timeModifier) {
//   var timeLeft = 60;
//   var timeInterval = setInterval(function() {
//     if (timeLeft > 1) {
//       timerEl.textContent = timeLeft + ' seconds remaining';
//       timeLeft--;
//     } else if (timeLeft === 1) {
//       timerEl.textContent = timeLeft + ' second remaining';
//       timeLeft--;
//     } else {
//       timerEl.textContent = '';
//       clearInterval(timeInterval);
//     }
//   }, 1000);
  
//   document.addEventListener('answer', function(event) {
//     var answer = event.detail.answer;
//     if (answer === 'correct') {
//       timeLeft += timeModifier;
//     } else if (answer === 'incorrect') {
//       timeLeft -= timeModifier;
//       if (timeLeft < 0) {
//         timeLeft = 0;
//       }
//     }
//   });
// }

// startButton.addEventListener('click', function() {
//   timerEl.style.display = 'block';
//   countdown(5);
// });

// document.addEventListener('answer', function(event) {
//   var answer = event.detail.answer;
//   if (answer === 'correct') {
//     timerEl.textContent = parseInt(timerEl.textContent) + 5 + ' seconds remaining';
//   } else if (answer === 'incorrect') {
//     timerEl.textContent = parseInt(timerEl.textContent) - 5 + ' seconds remaining';
//   }
// });
