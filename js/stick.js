function Stick(){
	//view property
	var stickView = function(){
    	for(var i=0;i<3;i++){ //loading 3 div for single stick
			var element = document.createElement("div");
			var parentPrimary = document.getElementsByClassName("board")[0];
			var parentSecondary = document.getElementsByClassName("stick")[0];
			if(i == 0){
				addClass(element,"stick");
				appendTo(element,parentPrimary);
				that.wrp = element; //stick wrapper
				setWrapper();
			}
			else if(i == 1){
				addClass(element,"innerstick");
				appendTo(element,parentSecondary);
				that.mainStick = element; //mainstick
			}
			else{
				addClass(element,"stick-arrow");
				appendTo(element,parentSecondary);
				arrow = element; //pointer of stick
				setPointer();
			}
    	}
  	}
  	var appendTo = function(element,parentElement){
    	parentElement.appendChild(element);
  	}
  	var addClass = function(element,className){
    	element.setAttribute("class", 
    	element.getAttribute("class") + " " + className);
  	}
  	var testVisibility = function(){
    	if(that.hiddenFlag == true){
      		that.wrp.style.visibility = "hidden";
	   	}
    	else{
      		that.wrp.style.visibility = "visible";
    	}
  	} 
  	var display = function(xPos,yPos){
    	that.wrp.style.left = xPos + "px";
    	that.wrp.style.top = yPos + "px";
	}
  	var displayMove = function(){
    	that.mainStick.style.marginLeft = that.stickMargin + "px";
  	}
  	var setPointer = function(){
    	arrow.style.width = arrowlength + "px";
    	arrow.style.marginRight = arrowMargin + "px";
  	}
  	var setWrapper = function(){
    	that.wrp.style.width = wrpLength+"px";
  	}
  	this.wrp; //stick wraper
  	this.mainStick; //main stick in view
  	var arrow; //arrow of stick

	//model
	var that = this;
	var lengthFactor = 0.8; //% stickArrow
	var mainLength = 383; //main stick length;
	var widthFactor = 12; //widht of stick to be entered in center
	var wrpLength = mainLength*2+8*widthFactor; //length of stickWrp
	var heightValue = 12; //height of stick
	var arrowlength = mainLength*lengthFactor+3*widthFactor; //lenght of pointe
	var arrowMargin = (1-lengthFactor)*mainLength;

	this.posX; //original reference position
	this.posY;
	this.rotatedX;
	this.rotatedY;//dx and dy position
	this.angle = 0; //angle of rotation
	this.stickMargin = 0; //inner stick left margin
	this.hiddenFlag = true;  //if it is hidden or not;

	//function that moves main stick
	this.move = function(factor){
		that.stickMargin += 1*factor;
		displayMove(); // view property
		if(that.stickMargin >= 3*widthFactor){
			that.stickMargin = 0;
			displayMove();
			return true; //end point reached
		}
		else{
			return false;
		}
	}
	this.hide = function(){
		that.hiddenFlag = true;
		testVisibility(); //view property
	}
	this.initialise = function(x,y){
		that.posX = x;  //that.posX signfies the initial position
		that.posY = y; //that.posY signifies the initial position of stick
		display(x,y-heightValue/2); //display property; //display altert
	}
	this.rotate = function(){
		that.rotatedX = (that.posX + wrpLength/2 - 5*Math.cos((Math.PI/180)*that.angle))//centre of stick plus rotation effect;
		that.rotatedY = (that.posY - 5*Math.sin((Math.PI/180)*that.angle));
	}
	//placing with reference to white ball; white ball array given;
	this.placeStick = function(x,y){ //
		var newX = x+widthFactor-wrpLength/2;
		var newY = y+widthFactor;
		that.initialise(newX,newY);
		that.hiddenFlag = false;
		testVisibility();
	}
	stickView(); //view property
}