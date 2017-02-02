$(document).ready(function() {

	$("#splash").remove();

	const playerCount = 12;
	const gameCount = playerCount * playerCount;
	
	let ai = new GeneticAlgorithmAI(playerCount, gameCount);
	ai.startTraining();

	$("#pause").on("click", function() {
		ai.stopTraining();
	});

	$("#stop").on("click", function() {
		ai.stopTraining();
	});

	$("#start").on("click", function() {
		ai.startTraining();
	});

});