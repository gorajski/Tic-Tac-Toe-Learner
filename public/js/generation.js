let Generation = function() {
	this.members = [];
};

Generation.prototype.create = function(size) {
	for (let i = 0; i < size; i++) {
		this.members.push(new Player("computer"));
	};
}

Generation.prototype.spawn = function(survivalRatio, newPopulationSize, doesPromoteElites) {
	let nextGeneration = new Generation();

	let numberToKeepAlive = Math.floor(survivalRatio * this.members.length); //10
	let descendantsPerAncestor = Math.floor(newPopulationSize / numberToKeepAlive); //3

	let ancestors = [];
	for (let member in this.members) {		//deep clone
		ancestors.push(this.members[member].clone());
	}

	ancestors.sort(function(a,b) {		//sort by fitness performance
		if (a.fitness > b.fitness) { return -1; }
		if (a.fitness < b.fitness) { return 1; }
		return 0;
	});	

	ancestors = ancestors.slice(0, numberToKeepAlive);  //promote high performers

	var ancestorIndex = 0;
	for (let i = 0; i < newPopulationSize; i++) {		//create new population
		if (doesPromoteElites) {	//add in an unmodified copy of the best performing ancestor
			nextGeneration.members.push(ancestors[0].clone());
			doesPromoteElites = false;
		} 
		else {	//add in mutated copies of ancestors
			let descendant = ancestors[ancestorIndex].clone();
			nextGeneration.members.push(descendant.mutate());
			if ((i+1) % descendantsPerAncestor === 0  && ancestorIndex < numberToKeepAlive - 1 ) { 
				ancestorIndex += 1;
			}
		}
	}

	return nextGeneration;
};