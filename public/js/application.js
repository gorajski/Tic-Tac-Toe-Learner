$(document).ready(function() {

	const playerCount = 9;
	const gameCount = playerCount * playerCount;

	let playerCollection = [];
	for (let i = 0; i < playerCount; i++) {
		playerCollection.push(new Player("computer"));
	}

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
		gameCollection.push(new GameController(boardCollection[boardd], playerCollection[player1Tick], playerCollection[player2Tick]));
		player1Tick += 1;
	}

 	setInterval( function() {

	 	gameCollection.forEach(function(game) {
	 		game.gameClock();
	 	});

	}, 130);

	// let creature1 = new Player("computer");
	// let creature2 = new Player("computer");
	// let creature3 = new Player("computer");
	// let creature4 = new Player("computer");

	// gameCollection.push(new GameController(boardCollection[0], creature1, creature1));
	// gameCollection.push(new GameController(boardCollection[1], creature1, creature2));
	// gameCollection.push(new GameController(boardCollection[2], creature1, creature3));
	// gameCollection.push(new GameController(boardCollection[3], creature1, creature4));
	// gameCollection.push(new GameController(boardCollection[4], creature2, creature1));
	// gameCollection.push(new GameController(boardCollection[5], creature2, creature2));
	// gameCollection.push(new GameController(boardCollection[6], creature2, creature3));
	// gameCollection.push(new GameController(boardCollection[7], creature2, creature4));
	// gameCollection.push(new GameController(boardCollection[8], creature3, creature1));
	// gameCollection.push(new GameController(boardCollection[9], creature3, creature2));
	// gameCollection.push(new GameController(boardCollection[10], creature3, creature3));
	// gameCollection.push(new GameController(boardCollection[11], creature3, creature4));
	// gameCollection.push(new GameController(boardCollection[12], creature4, creature1));
	// gameCollection.push(new GameController(boardCollection[13], creature4, creature2));
	// gameCollection.push(new GameController(boardCollection[14], creature4, creature3));
	// gameCollection.push(new GameController(boardCollection[15], creature4, creature4));

	// let gameCollection = [];
	// let row = 0;
	// let col = 0;
	// for (let i = 0; i < gameCount; i++) {
	// 	col = i;
	// 	if (col > 8) {
	// 		row = col % 8;
	// 		col = col - row * 8;
	// 	}
	// 	gameCollection.push(new GameController(boardCollection[i], playerCollection[row], playerCollection[col]));
	// }

	// let game1 = new GameController(boardCollection[0], creature1, creature1);
	// let game2 = new GameController(boardCollection[1], creature1, creature2);
	// let game3 = new GameController(boardCollection[2], creature1, creature3);
	// let game4 = new GameController(boardCollection[3], creature1, creature4);
	// let game5 = new GameController(boardCollection[4], creature2, creature1);
	// let game6 = new GameController(boardCollection[5], creature2, creature2);
	// let game7 = new GameController(boardCollection[6], creature2, creature3);
	// let game8 = new GameController(boardCollection[7], creature2, creature4);
	// let game9 = new GameController(boardCollection[8], creature3, creature1);
	// let game10 = new GameController(boardCollection[9], creature3, creature2);
	// let game11 = new GameController(boardCollection[10], creature3, creature3);
	// let game12 = new GameController(boardCollection[11], creature3, creature4);
	// let game13 = new GameController(boardCollection[12], creature4, creature1);
	// let game14 = new GameController(boardCollection[13], creature4, creature2);
	// let game15 = new GameController(boardCollection[14], creature4, creature3);
	// let game16 = new GameController(boardCollection[15], creature4, creature4);


	// setInterval( function() {
 	// 	game1.gameClock();
		// game2.gameClock();
		// game3.gameClock();
		// game4.gameClock();
		// game5.gameClock();
		// game6.gameClock();
		// game7.gameClock();
		// game8.gameClock();
		// game9.gameClock();
		// game10.gameClock();
		// game11.gameClock();
		// game12.gameClock();
		// game13.gameClock();
		// game14.gameClock();
		// game15.gameClock();
		// game16.gameClock();
	// }, 100)

})

