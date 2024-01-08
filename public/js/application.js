const ROW_COUNT = 12
const COLUMN_COUNT = 12

const boardComponent = `
	<table class="cells">
		<tr>
			<td class="c0 cell"></td>
			<td class="c1 cell"></td>
			<td class="c2 cell"></td>
		</tr>
		<tr>
			<td class="c3 cell"></td>
			<td class="c4 cell"></td>
			<td class="c5 cell"></td>
		</tr>
		<tr>
			<td class="c6 cell"></td>
			<td class="c7 cell"></td>
			<td class="c8 cell"></td>
		</tr>
	</table>
`

$(document).ready(function() {

	let tableContents = ``
	for(let row=0; row < ROW_COUNT; row++) {
		let rowContents = `<tr class="board_element">`
		for (let column = 0; column < COLUMN_COUNT; column++) {
			rowContents += `<td id="board${row * COLUMN_COUNT + column + 1}" class="miniboard">${boardComponent}</td>`
		}
		tableContents += rowContents + `</tr>`
	}

	if (document.querySelector('#training')) {
		document.querySelector('#training').innerHTML = `
			<table>
				${tableContents}
			</table>
		`
	}

	if (document.querySelector('#challenge-board')) {
		document.querySelector('#challenge-board').innerHTML = boardComponent
	}



	$("#splash").show();
	$("#challenge").hide();

	const playerCount = 48;
	const gameCount = playerCount * playerCount;
	
	let timer = null;
	let view = new GeneticAlgorithmView("#generation");
	let ai = new GeneticAlgorithmAI(playerCount, gameCount, view);

	$("#close").on("click", function() {
		$("#splash").hide();
		$("#ai-control-form").css("opacity", 1);
		$(".ai-control").removeAttr("disabled");
		$(".control-button").css("opacity", 1);
		$(".control-button").removeAttr("disabled");
	});


	$("#start").on("click", function() {
		$("#challenge").hide();
		$("#ai-control-form").css("opacity", 0.4);
		$(".ai-control").attr("disabled", "true");

		ai.hasElites = $("#elites").is(":checked");
		ai.survivalRatio = $("#survival-ratio").val();
		ai.mutationRate = $("#mutation-rate").val();
		if ($("#fast").prop("checked")) {
			ai.timerInterval = 40;
		} else if ($("#medium").prop("checked")) {
			console.log('hi')
			ai.timerInterval = 160;
		} else if ($("#slow").prop("checked")) {
			ai.timerInterval = 640;
		}
		const playerXPoints = $("#x-won-points").val()
		const playerOPoints = $("#o-won-points").val()
		const drawGamePoints = $("#draw-points").val()
		ai.rewardProfile = { "1" : playerXPoints, "2" : playerOPoints, "draw" : drawGamePoints };

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
		let boardView = new BoardView($('#challenge-board'));
		let board = new Board(boardView);
		let userPlayer = new Player('human');
		let bestPlayer = ai.bestPerformer();
		let game = new GameController(board, bestPlayer, userPlayer);

		console.log(bestPlayer.nextMove('000000000'));

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