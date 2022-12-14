// A huge thank you to Brian Design on YouTube for all of the guidance and insight. 
// Your teaching and tricks have been priceless for my coding!

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerContainer = document.querySelector('.timer');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Definitions provided by MDN and w3schools

let questions = [
    {
    question: 'What is a boolean value?',
    choice1: 'A truth value that indicates either true or false',
    choice2: 'a string is a sequence of characters representing text',
    choice3: 'a numeric data type',
    choice4: 'data type that can represent integers only',
    answer: 1,
    },
    {
    question: 'What is a string?',
    choice1: 'a sequence of characters used to represent text.',
    choice2: 'a primitive value automatically assigned to a variable.',
    choice3: 'a reference that points to a nonexistent or invalid object.',
    choice4: 'represents a unique "hidden" identifier.',
    answer: 1,
    },
    {
    question: 'All primitive values are immutable',
    choice1: 'False',
    choice2: 'True',
    choice3: 'Sometimes',
    choice4: 'I can\'t remember my own name',
    answer: 2,
    },
    {
    question: 'What symbols are used enclose an object?',
    choice1: '* *',
    choice2: '^ ^',
    choice3: '{}',
    choice4: '()',
    answer: 3,
    },
    {
    question: 'The main utility of JavaScript is to...',
    choice1: 'define the content of web pages',
    choice2: 'specify the layout of web pages',
    choice3: 'program the behavior of web pages',
    choice4: 'make a bowl of Coco-Puffs',
    answer: 3,
            },
    {
    question: 'Do I deserve a 100 on this challenge assignment?',
    choice1: 'No',
    choice2: 'No',
    choice3: 'No',
    choice4: 'Absolutely',
    answer: 4,
        },
    {
    question: 'Which variable keyword is immutable?',
    choice1: 'const',
    choice2: 'var',
    choice3: 'let',
    choice4: 'fl??gelhorn',
    answer: 1,
            },
    {
    question: 'Which symbol is used to calculate a remainder in JavaScript?',
    choice1: '&',
    choice2: '||',
    choice3: '%',
    choice4: '????',
    answer: 3,
            },
    {
    question: 'Single-line comments in JS start with which symbols?',
    choice1: '//',
    choice2: '||',
    choice3: '\\(????????????)/',
    choice4: '(???>??<)??????',
    answer: 1,
            },
    {
    question: 'JavaScript is a cool name',
    choice1: 'Sure, I guess',
    choice2: 'No',
    choice3: 'Please let me leave this place',
    choice4: 'I\'m hungry',
    answer: 1,
            },
    
    
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        window.localStorage.setItem('mostRecentScore', score);
        return window.location.assign('../endpage/end.html');
    }
    questionCounter++
    
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset ['number'];
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        } else {
            timeLeft -= 15
            if (timeLeft <= 0) {
                timeLeft = 0
            } 
        }
        
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply)
          getNewQuestion()  
        }, 1000)
    })
})



incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()

//  JS for timer

var timerText = document.querySelector('#time-left')
var timeLeft = 50;
var timeInterval;

function timerBegin () {
    timerText.textContent = timeLeft;
   timeInterval = setInterval(function (){
        timeLeft--
        timerText.textContent = timeLeft;

        if (timeLeft <= 0) {
            timerText.textContent = 0;
            clearInterval(timeInterval);
            window.localStorage.setItem('mostRecentScore', score);
            return window.location.assign('../endpage/end.html');
        }
    }, 1000);
}

timerBegin()



