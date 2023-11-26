var totalCorrect = 0;
var totalAnswered = 0;
var userResponses = {};
// Object to track if a question has been answered
var questionsAnswered = {};

// Function to handle each questions answer click
function handleAnswerClick(questionIndex, answerIndex) {
	// Resetting styles for all answer buttons of this question
	var answerButtons = document.querySelectorAll(
		".question-" + questionIndex + " .answer-btn"
	);
	answerButtons.forEach(function (button) {
		button.classList.remove("selected-answer");
	});

	// Highlighting the selected answer
	var selectedButton = document.querySelector(
		".question-" + questionIndex + " .answer-" + answerIndex
	);
	selectedButton.classList.add("selected-answer");

	userResponses[questionIndex] = parseInt(answerIndex);

	// Checking if this question has been answered before
	if (!questionsAnswered[questionIndex]) {
		questionsAnswered[questionIndex] = true;
		totalAnswered++;
	}

	// Checking if all questions have been answered
	if (Object.keys(userResponses).length === correctAnswers.length) {
		evaluateAnswers();
		displayScore();
	}
}

// Function to mark the users once all questions have been answered
function evaluateAnswers() {
	// Resetting each time
	totalCorrect = 0;

	for (var question in userResponses) {
		if (correctAnswers[question] === userResponses[question]) {
			totalCorrect++;
		}
	}
}

// Function to display users quiz score once quiz is completed
function displayScore() {
	alert(
		"Your score: " + totalCorrect + " out of " + correctAnswers.length + "!"
	);
}
