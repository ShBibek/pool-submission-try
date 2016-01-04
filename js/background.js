function Background(parent){
  //view section
	var backgroundView = function(parentName){
		var element = document.createElement("div");
		var className = "background";
		element.setAttribute("class",className);
		parentName.appendChild(element);
		return element;
	}
	this.element = backgroundView(parent);
	//model section;
	var that = this;
	this.widthValue = 1200;
	this.heightValue = 500;
	this.board;
	this.scoreBoard;
	this.power;

	var loadObjects = function(){
		that.scoreBoard = new ScoreBoard();
		that.board = new Board();
		that.power = new Power();
	}
	loadObjects();
}