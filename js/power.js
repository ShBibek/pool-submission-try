function Power(){
  //view section;
	var mover;
	var powerView = function(){ //creating 2 div and a button for power
		var wrapper = document.createElement("div"); //wrapper power
		var parentPrimary = document.getElementsByClassName("background")[0];
		var className = "pow-wrapper";
		wrapper.setAttribute("class",className);
		parentPrimary.appendChild(wrapper);
		var parentSecondary = document.getElementsByClassName("pow-wrapper")[0];
		mover = document.createElement("div");
		mover.setAttribute("class","pow-bg");
		parentSecondary.appendChild(mover);   
	}
	var createButton = function(){
	    that.button= document.createElement('button');
	    that.button.innerHTML = 'POWER LEVEL';
	    document.getElementsByClassName("pow-wrapper")[0].appendChild(that.button);
	    that.button.style.position = "absolute";
	    that.button.style.bottom = "0px";
	    that.button.style.width = "100"+"%";
	    that.button.style.height = "50"+"px";
	}
	var heightDisplay = function(value){
		mover.style.top = that.topValue+'px';
	}
	var that = this;
	this.button; //accessible from out
	powerView();
	createButton();
	//model section
	var bottomlevel = 250; //300 height
	this.powerLevel = 0;
	this.topValue = 250;
	this.vely = -1; //initially moves up
	
	this.resetToBottom = function(){
		that.topValue = bottomlevel;
	    heightDisplay(); //view property;
	}
	this.powerMover = function(){
		if(that.topValue >= bottomlevel){
			that.vely = -1; //moves up
		}
		if(that.topValue <= 0){
			that.vely = 1; //moves down
		}
		that.topValue += that.vely*2;
		that.powerLevel = bottomlevel-that.topValue;
		heightDisplay(); //view property
	}
}