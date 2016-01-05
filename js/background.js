function Background(parent){
  //view section
	var backgroundView = function(parentName){
		var element = document.createElement("div");
		var className = "background";
		element.setAttribute("class",className);
		parentName.appendChild(element);
		return element;
	}
	var button = function(){
	    var button= document.createElement('button');
	    button.style.backgroundImage = 'url(images/' + "newGame" + '.png)';
	    button.style.backgroundSize = "100"+"%";
	    button.style.backgroundRepeat = "no-repeat";
	    button.style.position = "absolute";
	    button.style.bottom = "60px";
	    button.style.right = "0px";
	    button.style.width = "13"+"%";
	    button.style.marginRight = "2" + "%";
	    button.style.height = "40"+"px";
	    document.getElementsByClassName("background")[0].appendChild(button);
	    return button;
	}
	this.element = backgroundView(parent);
	this.newGameButton = button();
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