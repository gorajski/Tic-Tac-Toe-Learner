$(document).ready(function() {

	// $("#splash").remove();

	const playerCount = 25;
	const gameCount = playerCount * playerCount;
	
	let ai = new GeneticAlgorithmAI(playerCount, gameCount);
	ai.startTraining();

	$("#close").on("click", function() {
		ai.stopTraining();
	});

	$("#back").on("click", function() {
		ai.startTraining();
	})

});