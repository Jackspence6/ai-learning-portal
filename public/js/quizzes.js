var totalCorrect = 0;
var totalAnswered = 0;
var userResponses = {};

console.log(correctAnswers);
function handleAnswerClick(questionIndex, answerIndex) {
	userResponses[questionIndex] = parseInt(answerIndex);

	// Use correctAnswers directly here
	if (correctAnswers[questionIndex] === parseInt(answerIndex) - 1) {
		totalCorrect++;
	}
	console.log("totalCorrect: " + totalCorrect);

	totalAnswered++;
	console.log("totalAnswered: " + totalAnswered);

	if (totalAnswered === 30) {
		displayScore();
	}
}

function displayScore() {
	alert("Your score: " + totalCorrect + " out of 30!");
}
