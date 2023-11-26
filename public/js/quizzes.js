document.addEventListener("DOMContentLoaded", function () {
	var totalCorrect = 0;
	var totalAnswered = 0;
	var userResponses = {};

	function handleAnswerClick(questionIndex, answerIndex) {
		userResponses[questionIndex] = parseInt(answerIndex);

		// Adjusting index if necessary
		if (correctAnswers[questionIndex] === parseInt(answerIndex) - 1) {
			totalCorrect++;
		}

		totalAnswered++;

		if (totalAnswered === 30) {
			displayScore();
		}
	}

	function displayScore() {
		alert("Your score: " + totalCorrect + " out of 30!");
	}
});
