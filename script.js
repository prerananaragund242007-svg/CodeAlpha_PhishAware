/* ==========================================
   PHISHAWARE - INTERACTIVE SECURITY SYSTEM
   ========================================== */

// PHISHING DETECTIVE

const checkDetective = document.getElementById("checkDetective");
const detectiveResult = document.getElementById("detectiveResult");

if (checkDetective && detectiveResult) {
    checkDetective.addEventListener("click", function () {

        const selectedClues = document.querySelectorAll(
            'input[type="checkbox"]:checked'
        );

        const selectedValues = Array.from(selectedClues)
            .map(item => item.value);

        const correctClues = ["urgency", "generic", "link"];

        const correctCount = correctClues.filter(clue =>
            selectedValues.includes(clue)
        ).length;

        if (correctCount === 3 && selectedValues.length === 3) {
            updateLearningProgress("detective");
            detectiveResult.textContent =
                "Excellent investigation! You identified all 3 warning signs.";
        } else {
            detectiveResult.textContent =
                `You found ${correctCount} out of 3 warning signs. Look for urgency, a generic greeting and a suspicious link.`;
        }
    });
}


// WEBSITE SPOTTER

const domainOptions = document.querySelectorAll(".domain-option");
const domainResult = document.getElementById("domainResult");

domainOptions.forEach(option => {

    option.addEventListener("click", function () {

        if (!domainResult) return;
        updateLearningProgress("spotter");

        const answer = this.dataset.answer;

        if (answer === "correct") {
            domainResult.textContent =
                "Correct! You spotted the suspicious address. Always verify a website's official domain.";
            domainResult.style.color = "#36e6a2";
        } else {
            domainResult.textContent =
                "Not quite! Check the address carefully. Look for unusual spelling or extra words.";
            domainResult.style.color = "#ffad70";
        }
    });
});


// CYBER SAFETY CHALLENGE

const questions = [

    {
        question: "You receive an unexpected message saying your account will be blocked in 10 minutes. What should you do?",
        answers: [
            "Click the link immediately",
            "Reply with your password",
            "Verify through the official website or app",
            "Forward it to everyone"
        ],
        correct: 2,
        explanation: "Correct! Urgent messages can be designed to pressure you. Verify through an official channel."
    },

    {
        question: "Which is a warning sign of a phishing email?",
        answers: [
            "A familiar sender you expected",
            "A generic greeting and unexpected link",
            "A message you requested",
            "A normal newsletter you subscribed to"
        ],
        correct: 1,
        explanation: "A generic greeting combined with an unexpected link can be a warning sign."
    },

    {
        question: "Someone asks for your one-time password (OTP) over a phone call. What should you do?",
        answers: [
            "Share it if they sound official",
            "Send it through a message",
            "Never share it",
            "Post it in a group"
        ],
        correct: 2,
        explanation: "Never share an OTP. Genuine support staff should not ask you to disclose it."
    },

    {
        question: "What is the safest way to check a suspicious website?",
        answers: [
            "Open every link to test it",
            "Check the domain independently using an official source",
            "Trust it if it has a logo",
            "Enter your details to check"
        ],
        correct: 1,
        explanation: "A logo does not prove a website is genuine. Verify its domain through an independent official source."
    },

    {
        question: "You accidentally receive an unexpected attachment from an unknown sender. What is the safest action?",
        answers: [
            "Open it immediately",
            "Download it to your phone",
            "Avoid opening it and verify the sender",
            "Forward it to friends"
        ],
        correct: 2,
        explanation: "Unexpected attachments can be risky. Verify the sender before opening anything."
    }

];


// QUIZ ELEMENTS

const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const progressBar = document.getElementById("progressBar");
const finalResult = document.getElementById("finalResult");

let currentQuestion = 0;
let score = 0;
let answered = false;


// DISPLAY QUESTION

function loadQuestion() {

    if (!questionText || !answersContainer) return;

    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / 05`;

    scoreDisplay.textContent = `SCORE: ${score}`;

    questionText.textContent = current.question;

    answersContainer.innerHTML = "";

    quizFeedback.textContent = "";

    nextQuestion.disabled = true;

    nextQuestion.textContent =
        currentQuestion === questions.length - 1
            ? "View My Result"
            : "Next Question →";

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    current.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-option";
        button.textContent = answer;

        button.addEventListener("click", function () {
            selectAnswer(index);
        });

        answersContainer.appendChild(button);

    });
}


// CHECK ANSWER

function selectAnswer(selectedIndex) {

    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];

    const answerButtons =
        answersContainer.querySelectorAll(".answer-option");

    answerButtons.forEach((button, index) => {

        button.disabled = true;

        if (index === current.correct) {
            button.classList.add("correct");
        }

        if (index === selectedIndex &&
            selectedIndex !== current.correct) {
            button.classList.add("wrong");
        }

    });

    if (selectedIndex === current.correct) {

        score++;

        quizFeedback.textContent =
            "✓ Correct! " + current.explanation;

        quizFeedback.style.color = "#36e6a2";

    } else {

        quizFeedback.textContent =
            "✗ Not quite. " + current.explanation;

        quizFeedback.style.color = "#ffad70";

    }

    scoreDisplay.textContent = `SCORE: ${score}`;

    nextQuestion.disabled = false;
}


// NEXT QUESTION

if (nextQuestion) {

    nextQuestion.addEventListener("click", function () {

        if (!answered) return;

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            showFinalResult();

        }

    });

}


// FINAL RESULT

function showFinalResult() {
    updateLearningProgress("quiz");

    answersContainer.innerHTML = "";

    questionText.textContent = "Challenge completed!";

    questionNumber.textContent = "MISSION COMPLETE";

    scoreDisplay.textContent = `SCORE: ${score}/5`;

    progressBar.style.width = "100%";

    quizFeedback.textContent = "";

    nextQuestion.style.display = "none";

    let message = "";

    if (score === 5) {
        message = "Outstanding! You have a strong understanding of these cyber safety basics.";
    } else if (score >= 3) {
        message = "Good work! Review the explanations to strengthen your cyber awareness.";
    } else {
        message = "Keep learning! Explore the learning section and try the challenge again.";
    }

    finalResult.innerHTML = `
        <h2>${score} / 5</h2>
        <p>${message}</p>
        <button class="primary-btn" id="restartQuiz">
            Try Again
        </button>
    `;

    const restartButton = document.getElementById("restartQuiz");

    restartButton.addEventListener("click", restartQuiz);

}


// RESTART QUIZ

function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    nextQuestion.style.display = "inline-block";

    finalResult.innerHTML = "";

    loadQuestion();

}


// START QUIZ

if (questionText && answersContainer && nextQuestion) {
    loadQuestion();
}
// PhishAware Learning Progress Dashboard

const completedActivities = new Set();

function updateLearningProgress(activity) {
    completedActivities.add(activity);

    const total = 3;
    const completed = completedActivities.size;
    const percentage = Math.round((completed / total) * 100);

    document.getElementById("activitiesDone").textContent =
        `${completed}/${total}`;

    document.getElementById("learningScore").textContent =
        `${percentage}%`;

    document.getElementById("learningBar").style.width =
        `${percentage}%`;
}
/* EMAIL RISK ANALYZER */

const analyzeEmail = document.getElementById("analyzeEmail");
const emailInput = document.getElementById("emailInput");
const analysisResult = document.getElementById("analysisResult");

if (analyzeEmail && emailInput && analysisResult) {
    analyzeEmail.addEventListener("click", function () {
        const message = emailInput.value.toLowerCase();

        if (message.trim() === "") {
            analysisResult.textContent =
                "Please enter a sample message first.";
            return;
        }

        const warningSigns = [];

        if (/urgent|immediately|within 24 hours|act now|today/.test(message)) {
            warningSigns.push("Urgent or pressuring language");
        }

        if (/password|otp|pin|bank details|card number/.test(message)) {
            warningSigns.push("Request for sensitive information");
        }

        if (/click here|verify now|login now|update your account/.test(message)) {
            warningSigns.push("Request to click or verify something");
        }

        if (/won a prize|claim your reward|free gift|lottery/.test(message)) {
            warningSigns.push("Unexpected prize or reward");
        }

        analysisResult.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = "Analysis Results";
        analysisResult.appendChild(heading);

        const explanation = document.createElement("p");

        if (warningSigns.length > 0) {
            explanation.textContent =
                "Possible warning signs found: " + warningSigns.length;
        } else {
            explanation.textContent =
                "No listed warning signs were detected. This does not mean the message is safe.";
        }

        analysisResult.appendChild(explanation);

        if (warningSigns.length > 0) {
            const list = document.createElement("ul");

            warningSigns.forEach(function (sign) {
                const item = document.createElement("li");
                item.textContent = sign;
                list.appendChild(item);
            });

            analysisResult.appendChild(list);
        }

        const note = document.createElement("p");
        note.textContent =
            "Learning tip: Never trust a message based only on this result. Verify the sender through an official channel.";
        analysisResult.appendChild(note);
    });
}