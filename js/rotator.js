Rotator = function(stick){
    var elem = stick.wrp;//wrapper of stick
    var drag = false;
    var pos = [];
    var size = [];
    var axis = [];
    var cursor = [];
    var rad = 0;
    var lastRad = 0;
    var lastPer = 0;
    var lastFullRad = 0;
    var maxRad = 6.283185307179586;
    var maxDeg = 360;
    var output = {};

    output.rad = 0;
    output.deg = 0;
    output.per = 0;
    output.radianValue = 0;
    output.degValue = 0;
    output.spin = 0;
    output.clock = false;
    
    output.onchange = function(){};
    var preventDefault = function(e){
        if(window.event == true){
             e=window.event;   
        }
        if(e.preventDefault == true){
            e.preventDefault()
        }
        else{
            e.returnValue=false
        }
    }
    var getPos = function(elem){
        var tmp = elem;
        var left = tmp.offsetLeft;
        var top = tmp.offsetTop;
        while (tmp = tmp.offsetParent){ 
            left += tmp.offsetLeft;
        }
        tmp = elem;
        while(tmp = tmp.offsetParent){
            top += tmp.offsetTop;
        }
        return [left,top];
    }
    var getSize = function(elem){
        //return the size [width,height] of the element
        return [elem.offsetWidth,elem.offsetHeight];
    }
    var getAxis = function(elem){
        //return the center point [left,top] of the element
        return [getPos(elem)[0]+getSize(elem)[0]/2,getPos(elem)[1]+getSize(elem)[1]/2];
    }
    var  getCursorPos = function(e){
        //return the cursor's position [x,y]
        var cursorPos;
        if(window.event == true){
            e = window.event;
        }
        if(e.clientX == true){
            cursorPos = [e.clientX,e.clientY];
        }
        if(e.pageX){
            cursorPos = [e.pageX,e.pageY];
        }
        try{if(e.targetTouches[0]) cursorPos = [e.targetTouches[0].pageX,e.targetTouches[0].pageY];}catch(err){};
        return cursorPos;
    }
    var getAngle = function(e){
        //getting rotation angle by Arc Tangent 2
        var rad;
        pos = getPos(elem);
        size = getSize(elem);
        axis = getAxis(elem);
        cursor = getCursorPos(e);
        try{rad = Math.atan2(cursor[1]-axis[1],cursor[0]-axis[0])}catch(err){};
        //correct the 90° of difference starting from the Y axis of the element
        rad += maxRad/4;
        //transform opposite angle negative value, to possitive
        if(rad < 0) rad += maxRad;
        return rad;
    }
    var setDrag = function(e,bool){
        //set or unset the drag flag
        if(bool){
            preventDefault(e);
            rad = getAngle(e);
            drag = true;
        }else{
            drag = false;
        }
    }
    var rotate = function(e){
        //Rotate the element
        if(drag){
            //setting control variables
            var cursorRad;
            var relativeRad;
            var rotationRad;
            cursorRad = getAngle(e);
            relativeRad = cursorRad - rad;
            var rotationRad = lastRad + relativeRad;
            if(isNaN(rotationRad)) rotationRad = lastRad;
            if(rotationRad<0) rotationRad = maxRad;
            if(rotationRad>maxRad) rotationRad = 0;
            
            rad = cursorRad;
            
            //applying rotation to element
            elem.style.transform = "rotate("+rotationRad+"rad)";
            elem.style.MozTransform = "rotate("+rotationRad+"rad)";
            elem.style.WebkitTransform = "rotate("+rotationRad+"rad)";
            elem.style.OTransform = "rotate("+rotationRad+"rad)";
            elem.style.MsTransform = "rotate("+rotationRad+"rad)";
            //assigning values to public properties
            output.rad = rotationRad;
            output.deg = maxDeg*output.rad/(2*Math.PI);
            
            if((lastPer <= 100 && lastPer >= 60) && (output.per >= 0 && output.per <= 30)) output.spin++;
            if((lastPer <= 30 && lastPer >= 0) && (output.per >= 60 && output.per <= 100)) output.spin--;
            
            output.radianValue = output.rad+(maxRad*output.spin);
            output.degValue = output.deg+(maxDeg*output.spin);
            
            if(lastFullRad < output.radianValue) output.clock=true;
            if(lastFullRad > output.radianValue) output.clock=false;
            
            lastRad = rotationRad;
            lastPer = output.per;
            lastFullRad = output.radianValue;
            output.onchange();

            //assigning the values to the stick
            stick.angle = output.degValue;
            stick.rotate();

        }
    }
    
    //Listen events
    if(elem.attachEvent){
		
		elem.attachEvent('onmousedown',function(){setDrag(0,true)});
		document.attachEvent('onmouseup',function(){setDrag(0,false)});
		document.attachEvent('onmousemove',function(){rotate(0)});
		
	}else if(elem.addEventListener){
		
		elem.addEventListener('mousedown',function(e){setDrag(e,true)});
		document.addEventListener('mouseup',function(e){setDrag(e,false)});
		document.addEventListener('mousemove',function(e){rotate(e)});
			
		try{elem.addEventListener('touchstart',function(e){setDrag(e,true);})}catch(err){}
		try{document.addEventListener('touchend',function(e){setDrag(e,false);})}catch(err){}
		try{document.addEventListener('touchmove',function(e){rotate(e)})}catch(err){}
		
	}
	return output;
}
