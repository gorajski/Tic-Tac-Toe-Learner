let runner = function(gameCollection, playerCount) {

	setInterval( function() {
		areAllGamesComplete = true;
		// let playerCount = currentGeneration.members.length;
	 	gameCollection.forEach(function(game) {
	 		areAllGamesComplete = areAllGamesComplete && game.isComplete;
	 		if (!game.isComplete) { game.gameClock(); }
	 	});

	 	if (areAllGamesComplete) { 

	 		// console.log("THEY'RE ALL DONE!!!")
 			currentGeneration = currentGeneration.spawn(0.3, 9, false);
			let boardCollection = initBoards(81);
	 		// console.log("Hail King Arthur!!!")
			gameCollection = initGames(playerCount, 81, boardCollection, currentGeneration);
	 		// console.log("there are some who call me...Tim?")
;
		}

	}, 120);
};

let initBoards = function(numberOfGames) {
	let boardCollection = [];
	for (let i = 0; i < numberOfGames; i++) {
		boardCollection.push(new Board($("#board" + (i + 1).toString())));
	}
	return boardCollection;
};

let initGames = function(numberOfPlayers,numberOfGames, boardCollection, currentGeneration) {
	let gameCollection = [];
	let player1Tick = 0;
	let player2Tick = 0;
	// let numberOfPlayers = currentGeneration.members.length
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

	// $("#close").on("click", function() {
		$("#splash").remove();
	// });

	const playerCount = 9;
	const gameCount = playerCount * playerCount;

	currentGeneration = new Generation();
	currentGeneration.create(playerCount);
	let boardCollection = initBoards(gameCount);
	let gameCollection = initGames(playerCount, gameCount, boardCollection, currentGeneration);


	runner(gameCollection, playerCount);


})

