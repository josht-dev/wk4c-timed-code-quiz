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

//TESTING VARIABLE
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



// DOM global variables
const htmlTime = document.getElementById("timer");
const htmlScoreList = document.getElementById("scoreList");
const htmlQuestionContainer = document.getElementById("container-question");
const htmlAnswerContainer = document.getElementById("container-answer");
const htmlAnswerList = htmlAnswerContainer.firstElementChild.children;

// JS global variables
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

// Functions used for this page
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
    timeLeft -= 20;
}
/* Call this with an html element's id to toggle the 
visibility of an HTML container*/
function toggleVisible(elementId) {
    document.getElementById(elementId).classList.toggle("hidden");
}
// TO DO - UPDATE FUNCTION TO WORK WHEN NO DATA PRESENT AT START
// Generate current question/answer HTML code block
function nextQuestion() {
    // Grab the question obj from the quiz array
    const obj = quiz[nextQuizQuestion];

    // Store obj key of correct answer
    const correctAnswer = obj.correct;
    //console.log(correctAnswer);

    // Remove any existing answer html li elements
    while (htmlAnswerList[0]) {    
        htmlAnswerList[0].remove();
    }

    // Loop through the obj keys to generate question/answer html
    for (const key in obj) {

        //console.log(key[0]);

        switch (key[0]) {
            case "q":
                // Generate question html
                const qP = document.createElement("p");
                qP.innerText = obj[key];
                
                //console.log(htmlQuestionContainer.firstElementChild);

                htmlQuestionContainer.replaceChild(qP ,htmlQuestionContainer.firstElementChild);
                break;
            case "a":
                // Check if this is the correct answer
                //let dataAttr = (key === correctAnswer) ? "true" : "false";
                // Generate answer html
                const li = document.createElement("li");
                const aP = document.createElement("p");
                aP.textContent = obj[key];
                aP.setAttribute("class", "answer");
                aP.setAttribute("data-answer", key);
                li.appendChild(aP);
                //console.log(li);
                htmlAnswerContainer.firstElementChild.appendChild(li);
                break;
            default:
                break;
        }
    }

    // Increment the nextQuizQuestion for next run
    nextQuizQuestion++;
}

//console.log(htmlAnswerList);
//console.log("current test");
//console.log(htmlAnswerList[3]);
//TEMP - adds intial testing data from function
nextQuestion();

/* Obj to hold high scores, user initials will 
be the key with their score as the value*/


// NOT WORKING AS INTENDED********************************
// Check local storage for existing high scores and load them
if (localStorage.getItem("localHighScores") !== null) {
    console.log("local data present");
    const highScores = JSON.parse(localStorage.getItem("highScores"));
} else {
    console.log("Was null");
    // If no scores existed, create empty highScores obj
    //const highScores = {};
    localStorage.setItem("highScores", JSON.stringify(tempHighScores));
}

// Update local storage with high scores
function updateLocalScores() {
    // Remove old data from local storage
    localStorage.removeItem("highScores");
    // Add current data to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

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

updateHtmlHighScores(tempHighScores);
//updateHtmlHighScores(highScores);

// TO DO - Hide quiz title in html

// TO DO - Wait for user input, then evaluate answer

// TO DO - End quiz at end of timer

// TO DO - End quiz when all questions answered

// TO DO - Generate end of quiz HTML

// TO DO - Check for high score

// TO DO - Generate HTML for high score list