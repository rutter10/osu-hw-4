// Index Counter
let currentQuestionIndex

// Variables for functions
var sec = 400
var score = 0

// Variables that getElementIds from the HTML to use as a variable in Javascript
var startButton = document.getElementById("start-btn")
var questionContainerEl = document.getElementById("question-container")
var timer = document.getElementById("timer")
var saveButton = document.getElementById("save-btn")
var playerName = document.getElementById("player-name")
var savedScore = document.getElementById("saved-score")
var card = document.getElementById("card")
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-buttons")

// Event listener that waits for click, and runs startGame function when clicked
startButton.addEventListener("click", startGame)

// Setting variables for timer
var time = 10, dispaly = document.querySelector("#time")

// startGame function: this rests values, gives hidden classes, and then calls the setNextQuestion function. Timer is also set on this so it starts when you click the Start (or restart) buttons.
function startGame() {
    startButton.classList.add("hidden")
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hidden")
    sec = 400
    time = setInterval(myTimer, 1000);
    score = 0
    function myTimer() {
        timer.innerHTML = sec + " sec left"
        timer.classList.remove("hidden")
        sec--;
        if (sec == -2) {
            clearInterval(time)
            alert("Out of Time")
            timer.classList.add("hidden")
            startButton.innerText="Restart"
            startButton.classList.remove("hidden")
            questionContainerEl.classList.add("hidden")
            saveButton.classList.remove("hidden")
        }
    }
    setNextQuestion()
}
// Cycles throught the question array, so when you select an answer, the next question / answer set is available. 
function setNextQuestion(){
    resetState()
    showQuestion(questions[currentQuestionIndex])
}

// Event listener so that when you click and answer, the next question set comes up, hidding the last set. 
function showQuestion(question){
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

// removes the last question set.
function resetState(){
    clearStatusClass(document.body)
    while (answerButtonsEl.firstChild){
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

// on click gives the correct answer a dataset of correct if selected
function selectAnswer(e){
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    checkArray()

}

// complies the number of correctly chosen questions. Decrements the timer if wrong answers are selected. Stores score in local storage.
function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        score++
    }else{
        sec = sec - 100
    }
    localStorage.setItem("score",JSON.stringify(score))
}

// allows player to click save and show their score from the test. 
function renderScore(){
    var lastScore = JSON.parse(localStorage.getItem("score"))
    if (lastScore !== null){
        document.getElementById("player-name").innerHTML = prompt("Player's Name")
        document.getElementById("saved-score").innerHTML = lastScore
    } else{
        return;
    }
}

function clearStatusClass(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

// Increments the question array so next question comes up. Stops when all questions are shown and selected, and gives alert quiz is finished. Brings up save button so you can click to trigger saving your name. 
function checkArray(){
    currentQuestionIndex++
    if(questions.length > currentQuestionIndex){
        setNextQuestion()
    }else{
        clearInterval(time)
        alert("Quiz Complete")
        startButton.innerText="Restart"
        startButton.classList.remove("hidden")
        questionContainerEl.classList.add("hidden")
        saveButton.classList.remove("hidden")
    }
}
// event listener for so when you click save button it works. Also runs render score on click. 
saveButton.addEventListener("click", function(event){
    event.preventDefault()
    renderScore()
})



// Creating an array that has each of our questions and the possible answers for each question.
var questions = [
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is",
        answers: [
            {text: "JavaScript", correct: false},
            {text: "terminal / bash", correct: false},
            {text: "for loops", correct: false},
            {text: "console.log", correct: true}
        ]
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables",
        answers: [
            {text: "quotes", correct: true},
            {text: "commas", correct: false},
            {text: "curl brackets", correct: false},
            {text: "parentheses", correct: false}
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ____________",
        answers: [
            {text: "numbers and strings", correct: false},
            {text: "other arrays", correct: false},
            {text: "booleans", correct: false},
            {text: "all of the above", correct: true}
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed within _____________",
        answers: [
            {text: "quotes", correct: false},
            {text: "curly brackets", correct: true},
            {text: "parentheses", correct: false},
            {text: "square brackets", correct: false}
        ]
    },
    {
        question: "Commonly used data tyhpes DO NOT include:",
        answers: [
            {text: "strings", correct: false},
            {text: "booleans", correct: false},
            {text: "alerts", correct: true},
            {text: "numbers", correct: false}
        ]
    }
]

