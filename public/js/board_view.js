let BoardView = function(htmlElement) {
	this.htmlElement = htmlElement;
	this.cells = $(htmlElement.find(".cell"));
};

BoardView.prototype.updateBoardView = function(state) {
	for (let i = 0; i < this.cells.length; i++) {
		let mark = "";
		if (state[i] === 1) { mark = "X"; }
		if (state[i] === 2) { mark = "O"; }
		$(this.cells[i]).html(mark);
	}
};

BoardView.prototype.updateBoardWin = function(winner) {
	if (winner === 1) 
		{ $(this.cells).css('border-color','blue') 
	} else { 
		$(this.cells).css('border-color','red'); 
	}
};

BoardView.prototype.updateBoardDraw = function() {
	$(this.cells).css('border-color','#bbbb00');
}

BoardView.prototype.enablePlayerMoveListener = function(callback) {
	this.htmlElement.on("click", 
		function() {
			const cell = event.target;
			// There is a minor bug here, when highlighting the board 
			// throws an error because the event.target is actually a 
			// <tbody> instead of a <tr class="cell">.  Still functions
			// otherwise.  Bug only noticed when console is open.
			const cellIndex = parseInt($(cell).attr("class")[1]);
			callback(cellIndex);
		}
	)
}

BoardView.prototype.disablePlayerMoveListener = function(callback) {
	this.htmlElement.off("click")
}