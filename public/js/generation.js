let Generation = function() {
	this.members = [];
};

Generation.prototype.build = function(size) {
	for (let i = 0; i < size; i++) {
		this.members.push(new Player("computer"));
	};
}

Generation.prototype.spawn = function(survivalRatio) {
	let descendants = Object.assign([], this.members);

	descendants.sort(function(a,b) {
		if (a.fitness > b.fitness) {
			return 1;
		}
		if (a.fitness < b.fitness) {
			return -1;
		}
		return 0;
	});
	
	nextGeneration = new Generation();
	let numberToKeepAlive = Math.floor(survivalRatio * descendants.length);

	for(let i = 0; i < numberToKeepAlive; i++) {
		nextGeneration.members.push(this.members[i]);
	}

	return nextGeneration;
};

