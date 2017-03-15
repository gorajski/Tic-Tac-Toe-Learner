describe("Player object", function() {

	beforeEach(function() {
		thisPlayer = new Player("computer");
		thatPlayer = new Player("computer");
	});

	it("has type representations", function() {
		expect(thisPlayer.type).toEqual("computer");
	});

	it("has fitness representations", function() {
		expect(thisPlayer.fitness).toEqual(0);
	});

	it("has a genome representation", function() {
		expect(thisPlayer.genome instanceof Array).toEqual(true);
		expect(thisPlayer.genome.length).toEqual(5890);
		expect(thisPlayer.nextMove('000000000') >= 0).toEqual(true);
		expect(thisPlayer.nextMove('000000000') <= 8).toEqual(true);
		expect(thisPlayer.nextMove('000000001') >= 0).toEqual(true);
		expect(thisPlayer.nextMove('000000001') <= 8).toEqual(true);
		expect(thisPlayer.nextMove('000000012') >= 0).toEqual(true);
		expect(thisPlayer.nextMove('000000012') <= 8).toEqual(true);
	});

	describe('.newGenome', function() {
		it('generates a new genome from scratch', function() {
			let genome = thisPlayer.genome;
			let newGenome = thisPlayer.newGenome();
			expect(newGenome).not.toEqual(genome);
			expect(newGenome instanceof Array).toEqual(true);
			expect(newGenome.length).toEqual(5890);
		});
	});

	describe('.clone', function() {
		it('generates a deep copy of the Player object', function() {
			thisPlayer.fitness = 44;
			let copy = thisPlayer.clone();
			expect(copy).not.toBe(thisPlayer);		//expect these to be independent objects
			expect(copy.type).toEqual('computer');
			expect(copy.fitness).toEqual(0);
			expect(copy.genome).not.toBe(thisPlayer.genome);		//expect the genomes to be independent objects
			expect(copy.genome).toEqual(thisPlayer.genome);		//but with identical key/value pairs
		});
	});

	describe('.mutate', function() {		//Uses helper method countIdenticalGenes
		it("modifies the Player object's genome", function() {
			let copy = thisPlayer.clone();
			let mutant = thisPlayer.mutate(0.99);
			expect(mutant).not.toEqual(copy);
			expect(mutant.genome).not.toEqual(copy.genome);
		});
	});

	describe('.breedWith', function() {		//Uses helper method countIdenticalGenes
		it("generates a new Player object whose genome is a mix of two ancestors  ***statistically dependent***", function() {
			let descendant = thisPlayer.breedWith(thatPlayer);
			expect(descendant).not.toEqual(thisPlayer);
			expect(descendant).not.toEqual(thatPlayer);

			//This following criteria are based on statistics.  A descendant in this model should have roughly, but not strictly, 50% of its genes from each parent.
			//50% of 5890 is 2945.  However, since some of the genes will inevitably match in both parents, the expected value will be higher than 2945, experimentally determined to be near 4100.
			//Therefore, 2945 serves as a lower bound.
			//The upper bound set in the tests at 4500, although this is somewhat arbitrary, as nothing prevents the parents genes from matching each other exactly.
			//However 4500 was chosen based on experiments that showed commonly the result was around 4100, and 400 was added as a tolerance.
			expect(countIdenticalGenes(thisPlayer.genome, descendant.genome)).toBeGreaterThan(2945);
			expect(countIdenticalGenes(thisPlayer.genome, descendant.genome)).toBeLessThan(4500);
			expect(countIdenticalGenes(thatPlayer.genome, descendant.genome)).toBeGreaterThan(2945);
			expect(countIdenticalGenes(thatPlayer.genome, descendant.genome)).toBeLessThan(4500);
		});
	});

});