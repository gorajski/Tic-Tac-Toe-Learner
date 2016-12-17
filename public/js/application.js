$(document).ready(function() {

	let player1 = new Player(1, "human");
	let player2 = new Player(2, "computer");
	let board = new Board($("#board"));
	let board2 = new Board($("#board2"));
	let board3 = new Board($("#board3"));
	let board4 = new Board($("#board4"));

	console.log(board.html_element)
	let game = new GameController(board, player1, player2);
	let game2 = new GameController(board2, player1, player2);
	let game3 = new GameController(board3, player1, player2);
	let game4 = new GameController(board4, player1, player2);
})