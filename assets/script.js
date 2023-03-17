//define the variables to be able to run all needed functions
var startBtn = document.getElementById("start-button");
var qtnContainer = document.getElementById("question-container");
var nextCard = document.querySelector("#last");
var answerOne = document.querySelector(".one");
var answerTwo = document.querySelector(".two");
var answerThree = document.querySelector(".three");
var answerFour = document.querySelector(".four");
var scoreName = document.querySelector("#scoreName");
var answerResults = document.querySelector(".rightOrWrong");
var playAgainBtn = document.querySelector(".playagain");
var highScores = document.querySelector("#highscores");
var clearHighscores = document.querySelector(".clear");
var nameInput = document.querySelector("#name");
var currentQuestion = document.querySelector("h2");
var highScoreBtn = document.querySelector("#highscore");
var submitBtn = document.querySelector("#submit");
var timer;
var timerCount = 25;
var score;
var scoreCount = 0;

//create an array of questions/answers to pull from
var questionOne = {
  question: "Inside which HTML element do we put the JavaScript?",
  one: "<scripting>",
  two: "<script>",
  three: "<javascript>",
  four: "<js>",
  rightAnswer: "<script>",
};
var questionTwo = {
  question: "How do you write 'Hello World' in an alert box?",
  one: 'alert("Hello World")',
  two: 'msgBox("Hello World")',
  three: 'alertBox("Hello World")',
  four: 'msg("Hello World")',
  rightAnswer: 'alert("Hello World")',
};
var questionThree = {
  question: "How do you add comments to JavaScript?",
  one: "//This is a comment",
  two: "<!--This is a comment-->",
  three: ' "This is a comment" ',
  four: "comment duh",
  rightAnswer: "//This is a comment",
};
var questionFour = {
  question: "What is the correct way to write a JavaScript array?",
  one: 'var colors = ["red", "green", "blue"] ',
  two: 'var colors = (1:"red", 2:"green", 3:"blue")',
  three: 'var colors = "red", "green", "blue"',
  four: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
  rightAnswer: 'var colors = ["red", "green", "blue"] ',
};
var questionArray = [questionOne, questionTwo, questionThree, questionFour];

function displayNextCard() {
  qtnContainer.setAttribute("style", "display:none");
  startBtn.setAttribute("style", "display:none");
  nextCard.setAttribute("style", "display:block");
  scoreName.setAttribute("stlye", "display:none");
  highScores.innerHTML = localStorage.getItem("highscores");
}

function collectScore(event) {
  event.preventDefault();
  localStorage.setItem("name", nameInput.value);
  var name = localStorage.getItem("name");
  var yourScore = localStorage.getItem("score");
  var scoreObject = {
    score: yourScore,
    name: name,
  };
  
  console.log(scoreObject);
  //https://www.youtube.com/watch?v=DFhmNLKwwGw for the two lines below//
  var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
  highScores.push(scoreObject);
  localStorage.setItem("highscores", JSON.stringify(highScores));
  console.log(localStorage.getItem("highscores"));
  var scoreDisplay = localStorage.getItem("highscores");
  highScores.innerHTML = scoreDisplay;
  
  displayNextCard();
}

function displayNameInput() {
  startBtn.setAttribute("style", "display:none");
  qtnContainer.setAttribute("style", "display:none");
  //nextCard.setAttribute("style", "display:none");
  scoreName.setAttribute("style", "display:block");
}

function startQuestions() {
  startBtn.setAttribute("style", "display:none");
  qtnContainer.setAttribute("style", "display:block");
  if (questionArray.length === 0) {
    clearInterval(timer);
    displayNameInput();
    return;
  }

  var displayQuestions = questionArray.pop();
  answerOne.textContent = displayQuestions.one;
  answerTwo.textContent = displayQuestions.two;
  answerThree.textContent = displayQuestions.three;
  answerFour.textContent = displayQuestions.four;
  currentQuestion.textContent = displayQuestions.question;
  localStorage.setItem("answer", displayQuestions.rightAnswer);
}

function checkOne() {
  localStorage.setItem("answer1", answerOne.textContent);
  if (localStorage.getItem("answer1") === localStorage.getItem("answer")) {
    answerResults.textContent = "Correct";
    scoreCount = scoreCount + 1;
    localStorage.setItem("score", scoreCount);
  } else {
    answerResults.textContent = "Wrong";
    timerCount = timerCount - 5;
  }
  localStorage.removeItem("answer1");
  localStorage.removeItem("answer");
  startQuestions();
}

function checkTwo() {
  localStorage.setItem("answer2", answerTwo.textContent);
  if (localStorage.getItem("answer2") === localStorage.getItem("answer")) {
    answerResults.textContent = "Correct";
    scoreCount = scoreCount + 1;
    localStorage.setItem("score", scoreCount);
  } else {
    answerResults.textContent = "Wrong";
    timerCount = timerCount - 5;
  }
  localStorage.removeItem("answer2");
  localStorage.removeItem("answer");
}

function checkThree() {
  localStorage.setItem("answer3", answerThree.textContent);
  if (localStorage.getItem("answer3") === localStorage.getItem("answer")) {
    answerResults.textContent = "Correct";
    scoreCount = scoreCount + 1;
    localStorage.setItem("score", scoreCount);
  } else {
    answerResults.textContent = "Wrong";
    timerCount = timerCount - 5;
  }
  localStorage.removeItem("answer3");
  localStorage.removeItem("answer");
}

function checkFour() {
  localStorage.setItem("answer4", answerFour.textContent);
  if (localStorage.getItem("answer4") === localStorage.getItem("answer")) {
    answerResults.textContent = "Correct";
    scoreCount = scoreCount + 1;
    localStorage.setItem("score", scoreCount);
  } else {
    answerResults.textContent = "Wrong";
    timerCount = timerCount - 5;
  }
  localStorage.removeItem("answer4");
  localStorage.removeItem("answer");
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    document.querySelector(".timercount").textContent = timerCount;
    if (timerCount === 0) {
      clearInterval(timer);
      displayNameInput();
    }
  }, 1000);
}

function startQuiz() {
  startQuestions();
  startTimer();
}

function clearScores() {
  localStorage.removeItem("highscores");
  displayNextCard();
}

function playAgain() {
  location.reload();
}

startBtn.addEventListener("click", startQuiz);
clearHighscores.addEventListener("click", clearScores);
playAgainBtn.addEventListener("click", playAgain);
submitBtn.addEventListener("click", collectScore);
answerOne.addEventListener("click", checkOne);
answerTwo.addEventListener("click", checkTwo);
answerThree.addEventListener("click", checkThree);
answerFour.addEventListener("click", checkFour);
