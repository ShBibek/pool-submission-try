function Board(){
  //view section;
	var boardView = function(){
		var element = document.createElement("div");
		var className = "board";
		var parentClass = document.getElementsByClassName("background")[0];
		element.setAttribute("class",className);
		parentClass.appendChild(element);
		return element;
	}
	this.element = boardView();
	var that = this;
	//model section  
	var lengthBoard = 770;
	var thickness = 45;
	var heightBoard = 430;
	var outerHole = 45+13; //board width and hole radius
	var midHoleLeft = 365; //left part of middle hole
	var midHoleRight = 380; //right part of middle hole
	var that = this;
	var collisonFactor=0.95;
	this.numBalls = 16;
	this.ballsArray = new Array();
	this.stick;
	//ball section
	var loadBalls = function(){
		var initPoints = [195,200,550,199,574,213,574,188,598,175,598,225,622,238,622,212,622,187,622,162,646,150,646,175,646,200,646,225,646,250,598,200];
		for(i=0;i<that.numBalls;i++){
			var ball;
			if(i == 0){
				ball= new WhiteBall();
			}
			else if(i == 15){
				ball = new Ball("blackBall"); //view property
			}
			else if(i%2 == 0){
				ball = new Ball("blueBall"); //view property;
			}
			else{
			  ball = new Ball('redBall'); //view property;
			}
			ball.initialise(initPoints[2*i],initPoints[2*i+1],i);
			that.ballsArray[i] = ball;
		}
	}
	var moveBalls = function(){
		for(var i=0;i<that.ballsArray.length;i++){
		  that.ballsArray[i].move();
			for(var j=i+1;j<that.ballsArray.length;j++){
				if(i!=j){
			    	that.ballsArray[i].hitTest(that.ballsArray[j]);
				}
		  	}
		}
	}
	var borderTest=function(){
		for(var i=0;i<that.ballsArray.length;i++){
			if(that.ballsArray[i].posX<=thickness){ //left part of board
				if(that.ballsArray[i].posY<outerHole || that.ballsArray[i].posY>(heightBoard-outerHole-3)){ //left part of board
				  that.ballsArray[i].makeDead();
				  //play the sound
				}
				else{
				  that.ballsArray[i].velX=Math.abs(collisonFactor*that.ballsArray[i].velX); //change velocity
				}
			}
			if(that.ballsArray[i].posX >= lengthBoard-thickness-that.ballsArray[i].radius*2){ //right part of board
				if(that.ballsArray[i].posY<outerHole|| that.ballsArray[i].posY>(heightBoard-outerHole-3)){
				  that.ballsArray[i].makeDead(); 
				}
				else{
				  that.ballsArray[i].velX = -1*Math.abs(collisonFactor*that.ballsArray[i].velX);
				}
			}
			if(that.ballsArray[i].posY <= thickness){ //upper part of board including middle hole
				if(that.ballsArray[i].posX<outerHole || that.ballsArray[i].posX>(lengthBoard-outerHole-3) || (that.ballsArray[i].posX>midHoleLeft&&that.ballsArray[i].posX<midHoleRight)){
				  that.ballsArray[i].makeDead();
				}
				else{
				  that.ballsArray[i].velY = Math.abs(collisonFactor*that.ballsArray[i].velY);
				}
			}
			if(that.ballsArray[i].posY >= heightBoard-thickness-that.ballsArray[i].radius*2){ //lower part of board middle hole
				if(that.ballsArray[i].posX<outerHole || that.ballsArray[i].posX>(lengthBoard-outerHole-3)||(that.ballsArray[i].posX>midHoleLeft&&that.ballsArray[i].posX<midHoleRight)){
				  that.ballsArray[i].makeDead();
				}
				else{
				  that.ballsArray[i].velY = -1*Math.abs(collisonFactor*that.ballsArray[i].velY); 
				}
			}
		}
	}
	this.velProfile=function(){
		for(var i=0;i<that.ballsArray.length;i++){
			if(that.ballsArray[i].velFlag==true){
		    	return true;
		  	}
		}
		    return false;
	}
	this.ballMover = function(){
		moveBalls();
		borderTest();
	}
	//stick section
	var loadStick = function(){
		that.stick = new Stick;
	}
	var loadObjects = function(){
		loadBalls();
		loadStick();
	}
		loadObjects();  
}

