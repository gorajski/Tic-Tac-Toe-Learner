let Generation = function() {
	this.members = [];
	Generation.id += 1;
};

Generation.id = 0;

Generation.prototype.create = function(size) {
	for (let i = 0; i < size; i++) {
		this.members.push(new Player("computer"));
	}
};

Generation.prototype.spawn = function(survivalRatio, mutationRate, newPopulationSize, doesPromoteElites) {

	let ancestors = this.members;
	let nextGeneration = new Generation();

	ancestors.sort(function(a,b) {		//sort by fitness performance
		if (a.fitness > b.fitness) { return -1; }
		if (a.fitness < b.fitness) { return 1; }
		return 0;
	});	

	let numberToKeepAlive = Math.floor(survivalRatio * this.members.length);
	let descendantsPerAncestor = Math.floor(newPopulationSize / numberToKeepAlive);
	
	ancestors = ancestors.slice(0, numberToKeepAlive);  //promote high performers

	var ancestorIndex = 0;
	for (let i = 0; i < newPopulationSize; i++) {		//create new population
		if (doesPromoteElites) {	//add in an unmodified copy of the best performing ancestor
			let elite = ancestors[0].clone();																												//*****************
			elite.genome['000000000'] = Math.floor(Math.random() * 8);	//*****************
			nextGeneration.members.push(elite);																												//*****************
			doesPromoteElites = false;
		} 
		else {	//add in mutated copies of ancestors
			let descendant = ancestors[ancestorIndex].clone();
			nextGeneration.members.push(descendant.mutate(mutationRate));
			if ((i+1) % descendantsPerAncestor === 0  && ancestorIndex < numberToKeepAlive - 1 ) { 
				ancestorIndex += 1;
			}
		}
	}

	return nextGeneration;
};