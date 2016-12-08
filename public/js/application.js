$(document).ready(function() {
 
	var player1 = new Player(1, "keyboard");
	var player2 = new Player(2, "mouse");
 	var mygame = new Board(player1, player2);
	mygame.play();
	
});

