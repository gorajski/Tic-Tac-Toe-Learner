$(document).ready(function() {

	$("#splash").hide();
	$("#challenge").hide();
	$("#ai-control-form").css("opacity", 0.4);
	$(".ai-control").attr("disabled", "true");

	const playerCount = 40;
	const gameCount = playerCount * playerCount;
	
	let timer = null;
	let ai = new GeneticAlgorithmAI(playerCount, gameCount, "#generation");
	ai.startTraining();

	$("#start").on("click", function() {
		$("#challenge").hide();
		$("#ai-control-form").css("opacity", 0.4);
		$(".ai-control").attr("disabled", "true");
		ai.startTraining();
		clearTimeout(timer);
		timer = null;
	});

	$("#pause").on("click", function() {
		if (ai.timer === null) { return };
		$("#ai-control-form").css("opacity", 1);
		$(".ai-control").removeAttr("disabled");
		ai.stopTraining();
	});

	$("#stop").on("click", function() {
		if (ai.timer === null) { return };
		$("#challenge").show();
		$("#ai-control-form").css("opacity", 0.4);
		$(".ai-control").attr("disabled", "true");
		ai.stopTraining();
		let board = new Board($('#challenge-board'));
		let userPlayer = new Player('human');
		let bestPlayer = ai.bestPerformer();
		let game = new GameController(board, bestPlayer, userPlayer);

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