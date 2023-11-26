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
}

// Function to display users quiz score and save results once quiz is completed
async function displayScoreAndSendResults() {
	evaluateAnswers();

	alert(
		"Your score: " + totalCorrect + " out of " + correctAnswers.length + "!"
	);

	const quiz_scores = {
		totalCorrect,
		totalQuestions: correctAnswers.length,
		userResponses,
	};
	const progress_status = "Completed";

	try {
		const response = await fetch("/api/progress", {
			method: "POST",
			body: JSON.stringify({
				progress_status,
				quiz_scores,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			console.log("Quiz results saved successfully!");
			window.location.href = "/";
		} else {
			console.error("Failed to save quiz results");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("An error occurred while saving your quiz results!");
	}
}
