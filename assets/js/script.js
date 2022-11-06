/*
---------- User Story ----------
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

---------- Acceptance Criteria ----------
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
*/

//TESTING VARIABLES!!!!!!!!!!!!!!!!!
const tempHighScores = {
    // REMOVE LATER - test data
    JV: 21,
    JAT: 99,
    JWH: 49
};
// DOM TESTING BUTTONS - REMOVE LATER
const testBtn = document.getElementById("testBtn");
testBtn.addEventListener("click", function () {
    // testing timer function
    countDown();
});
const testBtn2 = document.getElementById("testBtn2");
testBtn2.addEventListener("click", function () {
    // testing timer subtract function
    subtractTime();
});
const testBtn3 = document.getElementById("testBtn3");
testBtn3.addEventListener("click", function () {
    toggleVisible("incorrect");
});



// ****** DOM global variables ******
const htmlTime = document.getElementById("timer");
const htmlScoreList = document.getElementById("scoreList");
const htmlQuestionContainer = document.getElementById("container-question");
const htmlAnswerContainer = document.getElementById("container-answer");
const htmlAnswerList = htmlAnswerContainer.firstElementChild.children;
//const htmlAnswerCorrect = document.getElementById("correct");
//const htmlAnswerIncorrect = document.getElementById("incorrect");

//  ****** JS global variables ******
let timeLeft = 60;
//UPDATE QUIZ OBJ WITH REAL QUIZ DATA!!!!!!!!!!!!!!!!!!
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
/* Obj to hold high scores, user initials will 
be the key with their score as the value*/
let highScores = {};

// ****** Functions used for this page ******
// Timer code block
function countDown() {
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
}
// Call this function to subtract time for a wrong answer
function subtractTime() {
    timeLeft -= 5;
}
/* Call this with an html element's id to toggle the 
visibility of an HTML container*/
function toggleVisible(elementId) {
    document.getElementById(elementId).classList.toggle("hidden");
}

/*
function test() {
    console.log("test event");
}
*/

// Generate current question/answer HTML code block
function nextQuestion() {
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
                //console.log(htmlQuestionContainer.childElementCount);
                if (!htmlQuestionContainer.childElementCount) {
                    htmlQuestionContainer.appendChild(qP);
                    //console.log("if triggered");
                } else {
                    //console.log(htmlQuestionContainer.firstElementChild);
                    //console.log("else triggered");
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
                li.onclick = function() {
                    console.log("test:"); console.log(this.firstElementChild.getAttribute("data-answer"));
                    answerCheck(this.firstElementChild.getAttribute("data-answer"));
                
                };

                htmlAnswerContainer.firstElementChild.appendChild(li);
                break;
            default:
                break;
        }
    }
    // Increment the nextQuizQuestion for next run
    nextQuizQuestion++;
}

//// ****** STILL WORKING ON THE CODE BELOW ******

const startQuizBtn = document.getElementById("start-quiz-btn");
startQuizBtn.addEventListener("click", function() {
    // Start the quiz, display the first question, start the timer
    toggleVisible("quiz-title");
    toggleVisible("container-quiz");
    countDown();
});


// TO DO - Check for this is the correct answer key
function answerCheck(userAnswer) {
    // get question index
    let questionIndex = nextQuizQuestion - 1;
    // get correct answer
    let correctAnswer = quiz[questionIndex].correct;
    // compare user answer to correct answer
    if (userAnswer === correctAnswer) {
        // Display to user that they got it right
        toggleVisible("correct");
        // Load next question
        nextQuestion()
    } else {
        // Display to user that they got it wrong
        toggleVisible("incorrect");
        // Penalize User for incorrect answer
        subtractTime();
        // Load next question
        nextQuestion();
    }
}

// Update local storage with high scores
function updateLocalScores() {
    // Remove old data from local storage
    localStorage.removeItem("highScores");
    // Add current data to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// TO DO - Add next button after user answers to proceed?

// TO DO - Hide quiz title in html

// TO DO - Wait for user input, then evaluate answer

// Answer html needs to activate function when clicked




// TO DO - End quiz at end of timer

// TO DO - End quiz when all questions answered

// TO DO - Generate end of quiz HTML

// TO DO - Check for high score

// TO DO - NEEDS TESTING FOR PROD AND DYNAMICALLY UPDATE WHEN NEW SCORES ADDED
// Update HTML with high scores data
function updateHtmlHighScores(obj) {
    // Loop through obj, adding each key/value pair to an html li element
    for (const key in obj) {
        let li = document.createElement("li");
        li.setAttribute("class", "score");
        li.textContent = `${key} ${obj[key]}`;
        // Add the li to the html
        htmlScoreList.appendChild(li);
    }
}



// ****** RUN CODE ******


//TEMP - adds intial testing data from function
nextQuestion();


// Check local storage for existing high scores and load them
if (localStorage.getItem("highScores") !== null) {
    highScores = JSON.parse(localStorage.getItem("highScores"));
} else {
    // Set to temp test data if no data present *****TESTING ONLY**********
    localStorage.setItem("highScores", JSON.stringify(tempHighScores));
}

updateHtmlHighScores(tempHighScores);
//updateHtmlHighScores(highScores);