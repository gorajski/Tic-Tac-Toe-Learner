$(document).ready(function() {

	let creature1 = new Player("computer");
	let creature2 = new Player("computer");
	let creature3 = new Player("computer");
	let creature4 = new Player("computer");

	let board = new Board($("#board"));
	let board2 = new Board($("#board2"));
	let board3 = new Board($("#board3"));
	let board4 = new Board($("#board4"));

	let game = new GameController(board, creature1, creature2);
	let game2 = new GameController(board2, creature2, creature1);
	let game3 = new GameController(board3, creature3, creature4);
	let game4 = new GameController(board4, creature4, creature3);

 	setInterval( function() {
 		game.gameClock();
 		console.log(game2.current_player);
		game2.gameClock();
 		console.log(game2.current_player);
		game3.gameClock();
 		console.log(game2.current_player);
		game4.gameClock();
 		console.log(game2.current_player);
	}, 100)

})

