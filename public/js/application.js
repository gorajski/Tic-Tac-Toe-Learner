$(document).ready(function() {

	let creature1 = new Player("computer");
	let creature2 = new Player("computer");
	let creature3 = new Player("computer");
	let creature4 = new Player("computer");

	let board1 = new Board($("#board1"));
	let board2 = new Board($("#board2"));
	let board3 = new Board($("#board3"));
	let board4 = new Board($("#board4"));
	let board5 = new Board($("#board5"));
	let board6 = new Board($("#board6"));
	let board7 = new Board($("#board7"));
	let board8 = new Board($("#board8"));
	let board9 = new Board($("#board9"));
	let board10 = new Board($("#board10"));
	let board11 = new Board($("#board11"));
	let board12 = new Board($("#board12"));
	let board13 = new Board($("#board13"));
	let board14 = new Board($("#board14"));
	let board15 = new Board($("#board15"));
	let board16 = new Board($("#board16"));

	let game1 = new GameController(board1, creature1, creature1);
	let game2 = new GameController(board2, creature1, creature2);
	let game3 = new GameController(board3, creature1, creature3);
	let game4 = new GameController(board4, creature1, creature4);
	let game5 = new GameController(board5, creature2, creature1);
	let game6 = new GameController(board6, creature2, creature2);
	let game7 = new GameController(board7, creature2, creature3);
	let game8 = new GameController(board8, creature2, creature4);
	let game9 = new GameController(board9, creature3, creature1);
	let game10 = new GameController(board10, creature3, creature2);
	let game11 = new GameController(board11, creature3, creature3);
	let game12 = new GameController(board12, creature3, creature4);
	let game13 = new GameController(board13, creature4, creature1);
	let game14 = new GameController(board14, creature4, creature2);
	let game15 = new GameController(board15, creature4, creature3);
	let game16 = new GameController(board16, creature4, creature4);

 	setInterval( function() {
 		game1.gameClock();
		game2.gameClock();
		game3.gameClock();
		game4.gameClock();
		game5.gameClock();
		game6.gameClock();
		game7.gameClock();
		game8.gameClock();
		game9.gameClock();
		game10.gameClock();
		game11.gameClock();
		game12.gameClock();
		game13.gameClock();
		game14.gameClock();
		game15.gameClock();
		game16.gameClock();
	}, 100)

})

