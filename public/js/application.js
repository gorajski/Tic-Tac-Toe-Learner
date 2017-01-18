$(document).ready(function() {

	$("#close").on("click", function() {
		$("#splash").remove();
	});

	const playerCount = 9;
	const gameCount = playerCount * playerCount;

	currentGeneration = new Generation();
	currentGeneration.create(playerCount);

	let boardCollection = [];
	for (let i = 0; i < gameCount; i++) {
		boardCollection.push(new Board($("#board" + (i + 1).toString())));
	}

	let gameCollection = [];
	let player1Tick = 0;
	let player2Tick = 0;
	for (let boardd = 0; boardd < gameCount; boardd++) {
		if (player1Tick >= playerCount) {
			player1Tick = 0;
			player2Tick += 1;
		}
		gameCollection.push(new GameController(boardCollection[boardd], currentGeneration.members[player1Tick], currentGeneration.members[player2Tick]));
		player1Tick += 1;
	}

 	setInterval( function() {

	 	gameCollection.forEach(function(game) {
	 		game.gameClock();
	 	});

	}, 450);


})

