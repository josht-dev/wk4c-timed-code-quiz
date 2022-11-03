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

// DOM TESTING BUTTONS - REMOVE LATER
const testBtn = document.getElementById("testBtn");
testBtn.addEventListener("click", function() {
    // testing timer function
    countDown();
});
const testBtn2 = document.getElementById("testBtn2");
testBtn2.addEventListener("click", function() {
    // testing timer subtract function
    subtractTime();
});
const testBtn3 = document.getElementById("testBtn3");
testBtn3.addEventListener("click", function() {
    toggleVisible("incorrect");
});



// DOM global variables
let htmlTime = document.getElementById("timer");

// JS global variables
let timeLeft = 60;

// Functions used for this page

// Timer code block
function countDown() {
    // Time user starts with to finish quiz
    
    htmlTime.textContent = timeLeft;

    // Countdown timer function
    let timeInterval = setInterval(function() {
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

// Call this to toggle the visibility of an HTML container
function toggleVisible(elementId) {
    document.getElementById(elementId).classList.toggle("hidden");
}

/* TO DO - Object that stores arrays of question/answer key/value pairs
ex: obj {
    question1: {
        question:
    }
}
    OR?
array [
    {
        question: "question str here",
        multiChoice1: "possible answer",
        multiChoice4: "possible answer",
        correctAnswer: this.multiChoice1
    },
    {
        question: "question str here",
        multiChoice1: "possible answer",
        multiChoice4: "possible answer",
        correctAnswer: this.multiChoice4
    }
]
*/

/* TO DO - Locally store high scores...obj again?
ex: obj {
    "initials": 42,
    "initials": 0,
}
*/

// TO DO - Hide quiz title in html

// TO DO - Generate question/answer HTML code block by looping

// TO DO - Wait for user input, then evaluate answer

// TO DO - End quiz at end of timer

// TO DO - End quiz when all questions answered

// TO DO - Generate end of quiz HTML

// TO DO - Check for high score

// TO DO - Generate HTML for high score list