var Player = function(number, type) {
	this.number = number;
	this.type = type;
}

Player.prototype.takeTurn = function(boardState) {

	switch(this.type) {
		case 'mouse':
			this.player1 = new Player(1, player1Type);
		break;
		case 'keyboard':
			this.player1 = new Player(1, player1Type);
		break;
	}
	switch(player2Type) {
		case 'mouse':
			this.player2 = new Player(2, player2Type);
		break;
		case 'keyboard':
			this.player2 = new Player(2, player2Type);
		break;
	}

}