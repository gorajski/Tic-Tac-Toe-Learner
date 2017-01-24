let Player = function(type) {
	this.type = type;
	this.fitness = 0;

	this.genome = this.newGenome();
};

Player.prototype.newGenome = function() {
	let template = genomeTemplate;
	let choices = genomeOpenSpaces;
	const minIndex = 0;
	const maxIndex = 8;
		// console.log(template);
		// debugger
	for (let key in template) { 
		let choice = choices[key];
		template[key] = choice[Math.floor(Math.random() * choice.length)]
	}
	// debugger
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

	for (let key in this.genome) {
		if (Math.random() < mutationFactor) {
			this.genome[key] = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex);
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