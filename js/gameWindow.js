function GameWindow(parent){
	var parentClass = parent;
	var that = this;
	this.players = new Array();
	this.bg;
	this.gameRule;

	var loadPlayers = function(){
		for(var i = 0 ; i<2 ; i++){
			var player = new Player();
			if(i == 0){
				player.activeStatus = true;
				player.hitRemaining = 1;
			}
			player.identity = i+1;
			that.players[i] = player;
		}	
	}
	var loadBackground = function(className){
		var backg = new Background(className);
		that.bg = backg;
	}
	var loadGameRule = function(){
		that.gameRule = new Rule();
	}
	var loadObjects = function(className){
		loadBackground(className);
		loadPlayers();
		loadGameRule();

	}
	//constructor
	loadObjects(parentClass);

	
	
}