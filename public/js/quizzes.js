var totalCorrect = 0;
var totalAnswered = 0;
var userResponses = {};
// Object to track if a question has been answered
var questionsAnswered = {};

// Retrieving the quiz ID from the data attribute
const quizContainer = document.getElementById("quiz-container");
const quizId = quizContainer.getAttribute("data-quiz-id");

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
		displayScoreAndSendResults();
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
	// Calculating score as a percentage
	return (totalCorrect / correctAnswers.length) * 100;
}

// Function to display users quiz score and save results once quiz is completed
async function displayScoreAndSendResults() {
	const scorePercentage = evaluateAnswers();

	alert("Your score: " + scorePercentage.toFixed(0) + "%");

	const progress_status = "Completed";

	try {
		const response = await fetch("/api/progress", {
			method: "POST",
			body: JSON.stringify({
				quiz_id: quizId,
				progress_status,
				quiz_scores: scorePercentage,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			console.log("Quiz results saved successfully!");
			window.location.href = "/api/quizzes";
		} else {
			console.error("Failed to save quiz results");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("An error occurred while saving your quiz results!");
	}
}
