$(document).ready(function() {

	$("#splash").hide();
	$("#challenge").hide();
	$("#ai-controls").css("opacity", 0.4);

	const playerCount = 24;
	const gameCount = playerCount * playerCount;
	
	let timer = null;
	let ai = new GeneticAlgorithmAI(playerCount, gameCount, "#generation");
	ai.startTraining();

	$("#start").on("click", function() {
		$("#challenge").hide();
		$("#ai-controls").css("opacity", 0.4);
		ai.startTraining();
		clearTimeout(timer);
		timer = null;
	});

	$("#pause").on("click", function() {
		$("#ai-controls").css("opacity", 1);
		ai.stopTraining();
	});

	$("#stop").on("click", function() {
		if (ai.timer === null) { return };
		$("#challenge").show();
		$("#ai-controls").css("opacity", 0.4);
		ai.stopTraining();
		let board = new Board($('#challenge-board'));
		let userPlayer = new Player('human');
		let bestPlayer = ai.bestPerformer();
		let game = new GameController(board, userPlayer, bestPlayer);

		console.log(bestPlayer.genome['000000000']);

		runGame(game);
	});

	let runGame = function(game) {

		let result = game.gameClock();
		if (game.isComplete) {
			setTimeout(function() { 
				game.resetGame();
				timer = setTimeout(function() { runGame(game); }, 70);
				$(game.board.htmlElement).find(".cell").css('border-color','#ff8007');
			}, 700);
		} else {
			timer = setTimeout(function() { runGame(game); }, 70);
		}
	};

});