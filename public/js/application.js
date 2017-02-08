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
		let bestPlayer = ai.bestPerformer();
		let board = new Board($('#challenge-board'));
		let game = new GameController(board, userPlayer, bestPlayer)

		runGame(game);
	});

	$("#start").on("click", function() {
		ai.startTraining();
	});

	let runGame = function(game) {
		let result = game.gameClock();
		let timer = null;
		if (game.isComplete) {
			setTimeout(function() { 
				game.resetGame();
				$(game.board.htmlElement).find(".cell").css('border-color','#ff8007');
			}, 700);
		} 
		timer = setTimeout(function() { runGame(game); }, 70);	
	};

});