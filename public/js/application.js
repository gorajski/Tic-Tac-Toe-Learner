let runner = function(gameCollection) {

	let clockSignal = setInterval( function() {
		areAllGamesComplete = true;
		let playerCount = currentGeneration.members.length;
	 	gameCollection.forEach(function(game) {
	 		areAllGamesComplete = areAllGamesComplete && game.isComplete;
	 		if (!game.isComplete) { game.gameClock(); }
	 	});

	 	if (areAllGamesComplete) { 
	 		console.log(currentGeneration.members[0].fitness)
 			currentGeneration = currentGeneration.spawn(0.16, 25, true);
			let boardCollection = initBoards(625);
			gameCollection = initGames(625, boardCollection, currentGeneration);
		}

	}, 40);

	return clockSignal;
};

let initBoards = function(numberOfGames) {
	let boardCollection = [];
	for (let i = 0; i < numberOfGames; i++) {
		boardCollection.push(new Board($("#board" + (i + 1).toString())));
	}
	return boardCollection;
};

let initGames = function(numberOfGames, boardCollection, currentGeneration) {
	let gameCollection = [];
	let player1Tick = 0;
	let player2Tick = 0;
	let numberOfPlayers = currentGeneration.members.length;

	for (let boardd = 0; boardd < numberOfGames; boardd++) {
		if (player1Tick >= numberOfPlayers) {
			player1Tick = 0;
			player2Tick += 1;
		}
		gameCollection.push(new GameController(boardCollection[boardd], currentGeneration.members[player1Tick], currentGeneration.members[player2Tick]));
		player1Tick += 1;
	}
	return gameCollection;
}

$(document).ready(function() {


	const playerCount = 25;
	const gameCount = playerCount * playerCount;

	currentGeneration = new Generation();
	currentGeneration.create(playerCount);
	let boardCollection = initBoards(gameCount);
	let gameCollection = initGames(gameCount, boardCollection, currentGeneration);


	let clockSignal = runner(gameCollection);
	$("#close").on("click", function() {
		// $("#splash").remove();
		console.log(clockSignal)
		clearInterval(clockSignal);
		console.log(clockSignal)
	});

});