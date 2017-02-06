$(document).ready(function() {

	$("#splash").remove();

	const playerCount = 12;
	const gameCount = playerCount * playerCount;
	
	let ai = new GeneticAlgorithmAI(playerCount, gameCount, "#generation");
	ai.startTraining();

	$("#pause").on("click", function() {
		ai.stopTraining();
	});

	$("#stop").on("click", function() {
		ai.stopTraining();
		let userPlayer = new Player('human');
		let bestPlayer = ai.currentGeneration.members[0];
		let board = new Board($('#challenge-board'));
		let game = new GameController(board, userPlayer, bestPlayer)
		setInterval(function() {
			game.gameClock()
			if (game.isComplete) {
				game.resetGame()
			}
		}, 40)
	});

	$("#start").on("click", function() {
		ai.startTraining();
	});

});