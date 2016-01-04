function WhiteBall(){
  //view section;
	var whiteBallView = function(){
		var element = document.createElement("div");
		var parentClass = document.getElementsByClassName("board")[0];
		var className = "whiteBall";
		element.setAttribute("class",className);
		parentClass.appendChild(element);
		return element;
	}
	var render=function(){
		that.element.style.left = that.posX + "px";
		that.element.style.top = that.posY + "px";
	}
	var testVisibility = function(){
		if(that.deadFlag == true){
			that.element.style.visibility="hidden";  
		}
		else{
			that.element.style.visibility="visible";
		}
	}
	this.element = whiteBallView();
	//audio proterty
	var sound = new Audio("collide.mp3");

	//model section
	var meu = 0.03;
	var gravity = 0.098;
	var that = this;
	var color = "white";

	this.velX = 0;
	this.velY = 0;
	this.posX;
	this.posY;
	this.radius = 12;
	this.mass = 1;
	this.identity;
	this.velFlag = false;
	this.deadFlag = false;
	this.collisionFlag=false;
	this.firstCollide = 0; //first collided ball;
	this.collisonFactor = 0.95;


	//model
	var resultantVector = function(dx,dy){
		return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
	}
	this.initialise = function (x,y,id){
		that.posX=x;
		that.posY=y;
		that.identity=id;
		render();
	}
	this.reposition = function(){//when it enters the pocket called again
		that.deadFlag = false;
		that.posX = 195;
		that.posY = 200;
		render();
		testVisibility(); //view property

	}
	this.makeDead = function(){
		that.velX = 0;
		that.velY = 0;
		that.deadFlag = true;
		that.posX = 0;
		that.posY = 0;
		testVisibility(); //view property
	}
	this.reset = function(){
		that.collisionFlag = false;
		that.firstCollide = 0;
	}
	this.velocityStarter = function(x,y,speedValue){
		var cosTheta = (that.posX+that.radius-x)/Math.sqrt((Math.pow(that.posX+that.radius-x,2)+Math.pow(that.posY+that.radius-y,2)));
		var sinTheta = (that.posY+that.radius-y)/Math.sqrt((Math.pow(that.posX+that.radius-(x),2)+Math.pow(that.posY+that.radius-y,2)));
		that.velX = speedValue*cosTheta;  
		that.velY = speedValue*sinTheta;
	}
	this.move = function(){
		that.posX += that.velX;
		that.posY += that.velY;
		var resultant = Math.sqrt(Math.pow(that.velX,2)+Math.pow(that.velY,2));
		resultant>0?that.velFlag = true:that.velFlag = false;
		var fricResult = resultant-meu*gravity;
		if(fricResult>0.8){
			that.velX *= (fricResult/resultant);
			that.velY *= (fricResult/resultant);
		}
		else{
			that.velX = 0;
			that.velY = 0;
		}
		render();
	}
	this.hitTest = function(ball){
		var dCenters = Math.sqrt(Math.pow(this.posX-ball.posX,2) + Math.pow(this.posY-ball.posY,2));
		if(dCenters <= that.radius+ball.radius){
			var normalX = (ball.posX - that.posX) / dCenters; 
			var normalY = (ball.posY - that.posY) / dCenters; 
			var p = 2 * (that.velX * normalX + that.velY * normalY - ball.velX*normalX - ball.velY * normalY) / (that.mass + ball.mass); 
			that.velX = (that.velX  - p * that.mass * normalX)*that.collisonFactor; 
			that.velY = (that.velY - p * that.mass * normalY)*that.collisonFactor; 
			ball.velX = (ball.velX + p * ball.mass * normalX)*that.collisonFactor; 
			ball.velY = (ball.velY + p * ball.mass * normalY)*that.collisonFactor;
			//moving the circle to prevent overlaping;
			var  midX = (that.posX + ball.posX)/2;
			var midY = (that.posY + ball.posY)/2;
			that.posX = midX + that.radius * (that.posX - ball.posX)/dCenters;
			that.posY = midY + that.radius * (that.posY - ball.posY)/dCenters;
			ball.posX = midX + ball.radius * (ball.posX - that.posX)/dCenters;
			ball.posY = midY + ball.radius * (ball.posY - that.posY)/dCenters;
			//storing first collided ball identity
			if(that.collisionFlag==false){
				that.collisionFlag=true;
				that.firstCollide=ball.identity;
			}
			var a = resultantVector(ball.velX,ball.velY)*(1-ball.collisonFactor)+resultantVector(that.velX,that.velY)*(1-that.collisonFactor);
			sound.volume = a/(2*30*(1-ball.collisonFactor));
			sound.play();
		}
	}
}





