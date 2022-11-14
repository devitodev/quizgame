const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0
let availableQuestions = []


// Definitions provided by MDN and w3schools

let questions = [
    {
    question: 'What is a boolean value?',
    choice1: 'A truth value that indicates either true or false',
    choice2: 'a string is a sequence of characters used to represent text',
    choice3: 'a numeric data type',
    choice4: 'data type that can represent integers in the arbitrary precision format',
    answer: 1,
    },
    {
    question: 'What is a string?',
    choice1: 'a sequence of characters used to represent text.',
    choice2: 'a primitive value automatically assigned to variables that have just been declared, or to formal arguments for which there are no actual arguments.',
    choice3: 'a reference that points, generally intentionally, to a nonexistent or invalid object or address.',
    choice4: 'represents a unique "hidden" identifier that no other code can accidentally access',
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
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        window.localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
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
        const selectedAnswer = selectedChoice.dataset('number')

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
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


