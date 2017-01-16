let Generation = function() {
	this.members = [];
};

Generation.prototype.create = function(size) {
	for (let i = 0; i < size; i++) {
		this.members.push(new Player("computer"));
	};
}

Generation.prototype.spawn = function(survivalRatio, newPopulationSize) {//, doesPromoteElites) {
	let nextGeneration = new Generation();
	let numberToKeepAlive = Math.floor(survivalRatio * descendants.length);
	let descendantsPerAncestor = newPopulationSize / numberToKeepAlive;
	let descendants = [];

	for (let member in this.members) {		//deep clone
		descendants.push(this.members[member].clone());
	}

	descendants.sort(function(a,b) {		//sort by fitness performance
		if (a.fitness > b.fitness) { return -1; }
		if (a.fitness < b.fitness) { return 1; }
		return 0;
	});	

	nextGeneration.members = descendants.slice(0, numberToKeepAlive);  //promote high performers

	return nextGeneration;
};