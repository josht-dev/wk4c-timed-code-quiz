// ****** DOM global variables ******
const htmlTime = document.getElementById("timer");
const htmlQuestionContainer = document.getElementById("container-question");
const htmlAnswerContainer = document.getElementById("container-answer");
const htmlAnswerList = htmlAnswerContainer.firstElementChild.children;
const htmlScoreList = document.getElementById("score-list");
// Grab a live collection of the html li elements for the high score
const htmlToSort = document.getElementsByClassName("score");

//  ****** JS global variables ******
let timeLeft = 60;
//Object that stores arrays of question/answer key/value pairs
const quiz = [
    {
        q: "Inside which HTML element do we put the JavaScript?",
        a1: "<script>",
        a2: "<js>",
        a3: "<scripting>",
        a4: "<javascript>",
        correct: "a1"
    },
    {
        q: "Where is the correct place to insert a JavaScript?",
        a1: "The <body> section",
        a2: "The <head> section",
        a3: "Both the <head> section and the <body> section are correct",
        a4: "The <footer> section",
        correct: "a3"
    },
    {
        q: "How do you write \"Hello World\" in an alert box?",
        a1: "msg(\"Hello World\");",
        a2: "alert(\"Hellow World\");",
        a3: "msgBox(\"Hellow World\");",
        a4: "alertBox(\"Hellow World\");",
        correct: "a2"
    },
    {
        q: "How do you create a function in JavaScript?",
        a1: "Function:myFunction()",
        a2: "function myFunction()",
        a3: "function = myFunction()",
        a4: "function: myfunction()",
        correct: "a2"
    },
    {
        q: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
        a1: "if i <> 5",
        a2: "if (i != 5)",
        a3: "if (i <> 5)",
        a4: "if i =! 5 then",
        correct: "a2"
    }
];
// Variable to hold the next quiz index
let nextQuizQuestion = 0;
// Variable to hold player score
let playerScore = 0;
/* Obj to hold high scores, user initials will 
be the key with their score as the value*/
let highScores = {};
// Obj holding global functions
const globalFunctions = {
    /* Call this with an html element's id to toggle the 
    visibility of an HTML container*/
    toggleVisible: function (elementId) {
        document.getElementById(elementId).classList.toggle("hidden");
    },
    // Timer code block
    countDown: function () {
        // Time user starts with to finish quiz
        htmlTime.textContent = timeLeft;
        // Countdown timer function
        let timeInterval = setInterval(function () {
            timeLeft--;
            htmlTime.textContent = timeLeft;
            // Check if time ran out
            if (!timeLeft) {
                clearInterval(timeInterval);
            }
        }, 1000);
    },
    // Call this function to subtract time for a wrong answer
    subtractTime: function () {
        timeLeft -= 5;
    },
    // Generate current question/answer HTML code block
    nextQuestion: function () {
        // check if there are no other question and stop if so
        if (nextQuizQuestion === quiz.length) {
            // Stop timer and add time to score
            playerScore += timeLeft;
            timeLeft = 1;
            // Generate html span to show player score
            document.getElementById("player-score").textContent = `Your score is ${playerScore}!`;
            // Change visible content
            globalFunctions.toggleVisible("container-quiz");
            globalFunctions.toggleVisible("container-gameover");
            // Stop function here
            return;
        }
        // Grab the question obj from the quiz array
        const obj = quiz[nextQuizQuestion];
        // Store obj key of correct answer
        const correctAnswer = obj.correct;
        // Remove any existing answer html li elements
        while (htmlAnswerList[0]) {
            htmlAnswerList[0].remove();
        }
        // Loop through the obj keys to generate question/answer html
        for (const key in obj) {
            switch (key[0]) {
                case "q":
                    // Generate question html
                    const qP = document.createElement("p");
                    qP.innerText = obj[key];
                    // Check for existing question html
                    if (!htmlQuestionContainer.childElementCount) {
                        htmlQuestionContainer.appendChild(qP);
                    } else {
                        htmlQuestionContainer.replaceChild(qP, htmlQuestionContainer.lastChild);
                    }
                    break;
                case "a":
                    // Generate answer html
                    const li = document.createElement("li");
                    const aP = document.createElement("p");
                    aP.textContent = obj[key];
                    aP.setAttribute("class", "answer");
                    aP.setAttribute("data-answer", key);
                    li.appendChild(aP);
                    li.onclick = function () {
                        globalFunctions.answerCheck(this.firstElementChild.getAttribute("data-answer"));
                    };
                    htmlAnswerContainer.firstElementChild.appendChild(li);
                    break;
                default:
                    break;
            }
        }
        // Increment the nextQuizQuestion for next run
        nextQuizQuestion++;
    },
    // Check for this is the correct answer key
    answerCheck: function (userAnswer) {
        // get question index
        let questionIndex = nextQuizQuestion - 1;
        // get correct answer
        let correctAnswer = quiz[questionIndex].correct;
        // compare user answer to correct answer
        if (userAnswer === correctAnswer) {
            // Display to user that they got it right
            globalFunctions.toggleVisible("correct");
            // Increase player score
            playerScore += 5;
            // Load next question
            globalFunctions.nextQuestion()
        } else {
            // Display to user that they got it wrong
            globalFunctions.toggleVisible("incorrect");
            // Penalize User for incorrect answer
            globalFunctions.subtractTime();
            // Load next question
            globalFunctions.nextQuestion();
        }
    },
    // Update HTML with high scores data
    updateHtmlHighScores: function (obj) {
        // Remove any existing answer html li elements
        while (htmlScoreList.firstChild) {
            htmlScoreList.firstChild.remove();
        }
        // Loop through obj, adding each key/value pair to an html li element
        for (const key in obj) {
            // check if player has multiple scores
            if (Array.isArray(obj[key])) {
                obj[key].forEach(val => {
                    let li = document.createElement("li");
                    li.setAttribute("class", "score");
                    li.setAttribute("data-score", val);
                    li.textContent = `${key} ${val}`;
                    // Add the li to the html
                    htmlScoreList.appendChild(li);
                });
            } else {
                let li = document.createElement("li");
                li.setAttribute("class", "score");
                li.setAttribute("data-score", obj[key]);
                li.textContent = `${key} ${obj[key]}`;
                // Add the li to the html
                htmlScoreList.appendChild(li);
            }
        }
        // Sort HTML high score li's
        // Loop through htmlToSort moving the highest scores to the top
        for (let i = 0; i < htmlToSort.length; i++) {
            // Skip first loop
            if (i === 0) {
                continue;
            }
            let score = Number(htmlToSort[i].getAttribute("data-score"));
            /* Compare this index with rest of collection until it is the highest
            number, then place it*/
            for (let index = 0; index < htmlToSort.length; index++) {
                if (score >= htmlToSort[index].getAttribute("data-score")) {
                    htmlToSort[index].insertAdjacentElement("beforebegin", htmlToSort[i]);
                    break;
                }
            }
        }
        /* Only show the top 10 high scores
        TO DO - change code to only keep the top 10 scores */
        for (let i = 0; i < htmlToSort.length; i++) {
            if (i >= 10) {
                htmlToSort[i].classList.toggle("hidden");
            }
        }
    },
    // Update local storage with high scores
    updateLocalScores: function () {
        // Remove old data from local storage
        localStorage.removeItem("highScores");
        // Add current data to local storage
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }
}

// ****** DOM Buttons code ******
// Button to start the quiz
const startQuizBtn = document.getElementById("start-quiz-btn");
startQuizBtn.addEventListener("click", function () {
    // Start the quiz, display the first question, start the timer
    globalFunctions.toggleVisible("quiz-title");
    globalFunctions.toggleVisible("container-quiz");
    globalFunctions.toggleVisible("view-highscores");
    // Adds initial question and starts countdown
    globalFunctions.nextQuestion();
    globalFunctions.countDown();
});
// High score submit btn
const submitScoreBtn = document.getElementById("submit-score");
submitScoreBtn.addEventListener("click", function () {
    // Update highScores obj with player initials and score
    const playerInitial = document.getElementById("input-score").value;
    // If initial input was blank, do nothing
    if (!playerInitial) {
        return;
    }
    // Check if initials already exist
    if (highScores[playerInitial]) {
        // Check if player has multiple scores already
        if (Array.isArray(highScores[playerInitial])) {
            highScores[playerInitial].push(playerScore);
        } else {
            let oldScore = highScores[playerInitial];
            highScores[playerInitial] = [];
            highScores[playerInitial].push(oldScore);
            highScores[playerInitial].push(playerScore);
        }
    } else {
        highScores[playerInitial] = playerScore;
    }
    // Generate HTML for new score
    globalFunctions.updateHtmlHighScores(highScores);
    // Update localStorage
    globalFunctions.updateLocalScores();
    // Move to Highscores content
    globalFunctions.toggleVisible("container-gameover");
    globalFunctions.toggleVisible("container-score-list");
});
// Clear high score btn
const clearScoresBtn = document.getElementById("clear-highscores-btn");
clearScoresBtn.addEventListener("click", function () {
    localStorage.removeItem("highScores");
    // Hide scores list and show cleared message
    globalFunctions.toggleVisible("score-list");
    globalFunctions.toggleVisible("cleared");
});
// Start quiz over
const tryAgainBtn = document.getElementById("try-again");
tryAgainBtn.addEventListener("click", function () {
    location.reload();
});
// View the high scores content
const viewHighscores = document.getElementById("view-highscores");
viewHighscores.addEventListener("click", function () {
    // Toggle section visibilities to show the high score screen
    globalFunctions.toggleVisible("quiz-title");
    globalFunctions.toggleVisible("container-score-list");
    globalFunctions.toggleVisible("view-highscores");
    globalFunctions.updateHtmlHighScores(highScores);
});

// ****** CODE RAN AT SCRIPT LOAD ******
// Check local storage for existing high scores and load them
if (localStorage.getItem("highScores") !== null) {
    highScores = JSON.parse(localStorage.getItem("highScores"));
} else {
    // Set to temp test data if no data present
    localStorage.setItem("highScores", JSON.stringify(highScores));
}