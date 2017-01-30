let Player = function(type) {
	this.type = type;
	this.fitness = 0;

	this.genome = this.newGenome();
};

Player.prototype.newGenome = function() {
	let template = Object.assign({}, genomeTemplate);
	let choices = genomeOpenSpaces;
	const minIndex = 0;
	const maxIndex = 8;

	for (let key in template) { 
		let choice = choices[key];
		template[key] = choice[Math.floor(Math.random() * choice.length)]
	}
	let freshGenome = Object.assign({}, template)		
	return freshGenome;
};

Player.prototype.clone = function() {
	let newPlayer = new Player(this.type);
	newPlayer.fitness = 0;
	newPlayer.genome = Object.assign({}, this.genome);
	return newPlayer;
};

Player.prototype.mutate = function() {
	// let mutationFactor = 0.07 * Math.random();		//revisit for a better distribution... maybe http://www.meredithdodge.com/2012/05/30/a-great-little-javascript-function-for-generating-random-gaussiannormalbell-curve-numbers/
	let mutationFactor = 0.005;
	const minIndex = 0;
	const maxIndex = 8;

	//************************
	if (Math.random() < 0.4) {
		this.genome['000000000'] = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex);
	}
	//************************


	// CAN BE REFACTORED FOR BETTER PERFORMANCE
	let choices = genomeOpenSpaces;
	for (let key in this.genome) {
		let choice = choices[key];
		if (Math.random() < mutationFactor) {
			this.genome[key] = choice[Math.floor(Math.random() * choice.length)];
		} 
	};
	return this;
};

Player.prototype.breedWith = function(otherPlayer) {
	let newPlayer = this.clone();
	for (let key in newPlayer.genome) {
		if (Math.random() < 0.5) {
			newPlayer.genome[key] = otherPlayer.genome[key];
		}
	}
	return newPlayer;
};