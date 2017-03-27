let GeneticAlgorithmView = function(htmlElement) {
	this.htmlElement = htmlElement;
};

GeneticAlgorithmView.prototype.updateGenerationCount = function() {
	$(this.htmlElement).html("Generation " + Generation.id)
}