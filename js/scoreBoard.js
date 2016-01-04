function ScoreBoard(){
  //view property 
	var scoreBoardView = function(){
		var parentClass = document.getElementsByClassName("background")[0];
		var className = "score-wrp";
		for(var i=0;i<=12;i++){
			var el = document.createElement("div");
	  		if(i==0){
	    		addClass(el,className);
	    		appendTo(el,parentClass);
	  		}
	    	else if(i<=2){
		      	var parent = document.getElementsByClassName("score-wrp")[0];
		      	addClass(el,"score-main");
		      	appendTo(el,parent);
	    	}
	    	else if(i<=7){
		      	var parent = document.getElementsByClassName("score-main")[0];
		      	addClass(el,"score-block");
		      	appendTo(el,parent);
	    	}
	    	else{
		      	var parent = document.getElementsByClassName("score-main")[1];
		      	addClass(el,"score-block");
		      	appendTo(el,parent);
	    	}
	    	that.blocksArray[i]=el; //blocks signifies individual entity
		}
	}
	var appendTo = function(elementName,parentElement){
		parentElement.appendChild(elementName);
	}
	var addClass = function(elementName,className){
		elementName.setAttribute("class", 
		elementName.getAttribute("class") + " " + className);
	}
	var that = this;
	this.blocksArray = new Array();
	scoreBoardView(); //view constructor

		//model section;
	var contents = ["","ACTIVE",1,"RED + BLUE","PENDING","","PASSIVE",0,"RED+BLUE","PENDING"];
	var title = ["PLAYER 1","STATUS","HIT REMAINING","BALL-TYPE","BALLS ","PLAYER2","STATUS","HITREMAINING","BALL-TYPE","BALLS"];
	var displayBoard = function(){
		for(i=0;i<title.length;i++){
	  		that.blocksArray[3+i].innerHTML = title[i] +" : "+ " " +contents[i];
	  	}
	}
		 //constructor;
	displayBoard();
	this.assignValue = function(values){
		contents=values;
		displayBoard(); //view
	}
}