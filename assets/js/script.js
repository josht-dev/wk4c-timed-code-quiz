// ****** DOM global variables ******
const htmlTime = document.getElementById("timer");
const htmlQuestionContainer = document.getElementById("container-question");
const htmlAnswerContainer = document.getElementById("container-answer");
const htmlAnswerList = htmlAnswerContainer.firstElementChild.children;
const htmlScoreList = document.getElementById("score-list");

//  ****** JS global variables ******
let timeLeft = 60;
//Object that stores arrays of question/answer key/value pairs
const quiz = [
    {
        q: "This is a test question. Testing out the CSS to style the real questions that will be used later. It needs to be longer than expected to anticipate more in-depth questions and possibly code segments...",
        a1: "This is the answer to A.",
        a2: "This is B and is a little longer to try and anticipate code segments and what not...testtesttesttesttesttesttest",
        a3: "It's always C....",
        a4: "The all of the above answer..... ",
        correct: "a3"
    },
    {
        q: "This is the second test question.",
        a1: "This is the answer to 1.",
        a2: "This is 2 and is a little longer to try and anticipate code segments and what not...testtesttesttesttesttesttest",
        a3: "It's always 3?",
        a4: "The all of the above answer..... ",
        correct: "a1"
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
            let li = document.createElement("li");
            li.setAttribute("class", "score");
            li.textContent = `${key} ${obj[key]}`;
            // Add the li to the html
            htmlScoreList.appendChild(li);
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
    highScores[playerInitial] = playerScore;
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

//// ****** STILL WORKING ON THE CODE BELOW ******
// TO DO - UPDATE QUIZ OBJ WITH REAL QUIZ DATA!!!!!!!!!!!!!!!!!!
// TO DO - Get duplicate player initial's working for multiple scores