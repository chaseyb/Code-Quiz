const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const timerElement = document.getElementById("timerCount");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

var timerInterval;
var timerCount = 60;

let questions = [
    {
    question: "Which of the following is a component of CSS style rule?",
    choice1: "Selector",
    choice2: "Property",
    choice3: "Value",
    choice4: "All of the above",
    answer: 4
    },
    {

    question: "HTML stands for?",
    choice1: "Hyper Text Markup Language",
    choice2: "High Text Markup Language",
    choice3: "Hyper Tabular Markup Language",
    choice4: "None of these",
    answer: 1
    },
    {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "alert('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "msgBox('Hello World');",
    answer: 1
    },
    {
    question: "What is our professor's name?",
    choice1: "Marcelino",
    choice2: "Marcelo",
    choice3: "Mauricio",
    choice4: "Marciano",
    answer: 2
    },
    {
    question: "Who created jquery?",
    choice1: "Benjamin Franklin",
    choice2: "Mark Zuckerberg",
    choice3: "John Resig",
    choice4: "Bill Gates",
    answer: 3
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  timerInterval = setInterval(timer, 1000);
  availableQuesions = [...questions];
  getNewQuestion();
};

timer = () => {
  timerCount--;
  if (timerCount === 0) {
    clearInterval(timerInterval);
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  } else {
    timerElement.textContent = timerCount;
  }
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    clearInterval(timerInterval);
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      timerCount = timerCount + 5;
      incrementScore(CORRECT_BONUS);
    } else {
      timerCount = timerCount - 10;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();

