var Board = function(html_element) {
	this.html_element = html_element;
	this.state = [
							  0,0,0,
								0,0,0,
								0,0,0 
											];

};

Board.prototype.updateBoardView = function() {
	const $cells = $(this.html_element.find(".cell"))

	for (let i = 0; i < $cells.length; i++) {
		let mark = "";
		if (this.state[i] === 1) {
			mark = "X";
		}
		if (this.state[i] === 2) {
			mark = "O";
		}
		$($cells[i]).html(mark);
	}
}

// Jasmine Tested
Board.prototype.cellIsFree = function(cell) {
	return this.state[cell] === 0;
};

// Jasmine Tested
Board.prototype.markAsPlayer = function(player, cell) {
	this.state[cell] = player.number;
}

// Jasmine Tested
Board.prototype.checkForWinner = function() {
	winner = "NO match"
	if ((this.state[0] === 1 || this.state[0] === 2) && this.state[0] === this.state[4] && this.state[0] === this.state[8]) {
			winner = this.state[0]; }  // downward diagonal
	if ((this.state[2] === 1 || this.state[2] === 2) && this.state[2] === this.state[4] && this.state[2] === this.state[6]) {
			winner =  this.state[2]; }  // upward diagonal
	for (let i = 0; i < 3; i++) {
		if ((this.state[3*i] === 1 || this.state[3*i] === 2) && this.state[3*i] === this.state[3*i+1] && this.state[3*i] === this.state[3*i+2]) {
			winner =  this.state[3*i]; }  // matching row
		if ((this.state[i] === 1 || this.state[i] === 2) && this.state[i] === this.state[i+3] && this.state[i] === this.state[i+6]) {
			winner =  this.state[i]; }  // matching column
	}

	if (winner != "NO match") {
		console.log(winner);
		return winner;
	}
	return null;
}

// Jasmine Tested
Board.prototype.checkForFullBoard = function() {
	var isFull = true;
	for (var i = 0; i < this.state.length; i++) {
		isFull = isFull && (this.state[i] != 0);
	}
	if (isFull) {
		console.log("No winner!")
		return true;
	}
	return false;
}
