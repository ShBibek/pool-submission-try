function Loading(){
	var pageView = function(){
		var pageElement = document.createElement("div");
		var className = "loadingPage";
		var parentClass = document.getElementsByTagName("body")[0];
		pageElement.setAttribute("class",className);
		parentClass.appendChild(pageElement);
		//wrapper section
		var wrapper = document.createElement("div");
		var className = "loadingWrp";
		var parentClass = document.getElementsByClassName("loadingPage")[0];
		wrapper.setAttribute("class",className);
		parentClass.appendChild(wrapper);
		return pageElement;
	}
	//mover section
	var moveView = function(){
		var mover = document.createElement("div");
		var parentClass = document.getElementsByClassName("loadingWrp")[0];
		mover.style.height = "100"+"%";
		mover.style.width = "100"+"%";
		mover.style.backgroundColor = "green";
		mover.style.position = "absolute";
		mover.style.right = "90"+"%";
		parentClass.appendChild(mover);
		return mover;
	}
	var hideElement = function(){
		that.pageElement.style.visibility = "hidden";
	}
	var moveRight = function(value){
		that.moveElement.style.right = value + "%";
	}
	this.pageElement  = pageView();
	this.moveElement = moveView();
	//model
	var that = this;
	var rightPer = 100; //right position of the mover in %.
	this.loadingMover = function(number){ //number of times the loading should be displayed.
		var step = 100/number;
		rightPer -= step;
		moveRight(rightPer);
		if(rightPer <= 0){
			hideElement(); //hide the given div
			rightPer = 100;	
		}
		
	}
}
