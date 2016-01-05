function Rule(){
	//view propery
	var that = this;
	var noticeBoardView = function(){
		var element = document.createElement("div");
		var className = "info-board";
		var parentClass = document.getElementsByClassName("board")[0];
		element.setAttribute("class",className);
		parentClass.appendChild(element);
		return element;
	}
	var displayContent = function(value){
		that.element.style.visibility= "visible"; //make the board visible;
		that.element.innerHTML = value;
		//that.element.style.backgroundImage = "url"+("../images/game-over.jpg");
	}
	this.hideBoard = function(){
		that.element.style.visibility = "hidden";
	}
	this.element = noticeBoardView();

	//model
	var winnerFlag;
	var foulFlag = false;
	var successFlag = false; //ball scored without foul
	var blackEntered = false;
	var gameOverFlag = false;
	var foulTouch = function(player,firstTouch){ //testing foul touch 
		if(firstTouch == 0 || firstTouch == 15){ //if first touch nothing or black
			foulFlag=true;
		}
		//touching the opponents ball //in case ball is assigned
		else if( (firstTouch%2 != player.ballCatageory) && (player.ballCatageory != 2) ){
			foulFlag = true;
		}
		else{}
	}
	//no. of remaining balls of each player
	var ballCounter = function(currentPlayer,ballArray){
		var countValues = [0,0];
		if(currentPlayer.ballCatageory != 2){
			for(var i = 1; i < ballArray.length-1 ; i++ ){ //excluding black ball
				if(ballArray[i].identity%2 == currentPlayer.ballCatageory){
				countValues[0] += 1;
				}
				else{
					countValues[1] += 1;
				}
			}
		}
		return countValues;
	}
	//counting the no of hit offered to opponent in foul case
	var hitCounter = function(player){
		if(player.ballCatageory == 2){
			return 1;
		}
		else{
			return 2;
		}
	}
	//assigning Ball types to players
	var assignBall = function(currentPlayer,nextPlayer,ballArray){
		var count1 = 0,count2 = 0;
		if(ballArray[0].deadFlag == true){
			ballArray[0].reposition(); //repositioning white ball
			foulFlag = true;
		}
		for(var i=1;i<ballArray.length-1;i++){
			if(ballArray[i].identity%2 == 0 && ballArray[i].deadFlag == true){
				count1++;
			}
			if(ballArray[i].identity%2 != 0 && ballArray[i].deadFlag == true){
				count2++;
			}
		}
		if(foulFlag == false){
			if(count1 >=1 && count2 == 0){
				currentPlayer.ballCatageory = 0;
				nextPlayer.ballCatageory = 1;
			}
			if(count2 >=1 && count1 == 0){
				currentPlayer.ballCatageory = 1;
				nextPlayer.ballCatageory = 0;
			}
		}
	}
	//test if ball is entered
	var checkBallEntry = function(player,ballArray){
		var temp = player.ballCatageory;
		if(ballArray[0].deadFlag == true){
			ballArray[0].reposition();
			foulFlag = true;
		}
		for(var i=1;i<ballArray.length;i++){
			if(ballArray[i].deadFlag == true){
				if(ballArray[i].identity == 15){
					blackEntered = true;
				}
				else if(ballArray[i].identity%2 != player.ballCatageory){ //if opponent ball is scored
					foulFlag = true;
				}
				else{
					successFlag = true; //own ball entered
				}
				ballArray.splice(i,1); //remove the ball from array
				i--;
			}
		}
	}
	var assignToPlayer = function(player,activeStatus,hitLeft,ballCount){
		player.hitRemaining=hitLeft;
		player.activeStatus=activeStatus;
		player.ballsLeft=ballCount;
	}
	//game rule; first touch -> white ball first touched
	this.ruleTest = function(ballArray,players,firstTouch){
		var currentPlayer;
		var nextPlayer;
		var counter;
		var counterChanged;

		if(players[0].activeStatus == true){
			currentPlayer = players[0];
			nextPlayer = players[1];
		}
		else{
			currentPlayer = players[1];
			nextPlayer = players[0];
		}
		foulTouch(currentPlayer,firstTouch); //test for foul touch
		if(currentPlayer.ballCatageory == 2){ //if ball is not assigned
			assignBall(currentPlayer,nextPlayer,ballArray);
		}
		checkBallEntry(currentPlayer,ballArray); //check if ball is entered;
		counter = ballCounter(currentPlayer,ballArray); //count the number of balls

		if(currentPlayer.ballCatageory == 2){
			counter = ["pending","pending"]; //will remain 0 if ball not assigned so pending
		}
		//check if game is over
		if(blackEntered == true){
			if(currentPlayer.ballCatageory !=2 && foulFlag != true && currentPlayer.ballsLeft == 0){
				displayContent("PLAYER "+ currentPlayer.identity + " : WINNER");
			}
			else{
				displayContent("PLAYER "+ nextPlayer.identity + " : WINNER");
			}
			gameOverFlag = true;

		}
		else{
			//finally at the end if game is not over
			if(foulFlag == true){
				assignToPlayer(currentPlayer,false,0,counter[0]);
				var hitLeft = hitCounter(nextPlayer); //counting hit offered to next player
				assignToPlayer(nextPlayer,true,hitLeft,counter[1]);
				displayContent("FOUL");
			}
			else if(foulFlag == false && (currentPlayer.hitRemaining == 2 || successFlag == true)){ //same player is offered another hit
				assignToPlayer(currentPlayer,true,1,counter[0]);	
				assignToPlayer(nextPlayer,false,0,counter[1]);
				displayContent("NEXT HIT");
			}
			else{ //player changed
				assignToPlayer(currentPlayer,false,0,counter[0]);
				assignToPlayer(nextPlayer,true,1,counter[1]);
				displayContent("NEXT PLAYER");
			}	
		}


		var playerDetails = ["",players[0].activeStatus,players[0].hitRemaining,players[0].ballCatageory,players[0].ballsLeft,"",players[1].activeStatus,players[1].hitRemaining,players[1].ballCatageory,players[1].ballsLeft];
		foulFlag = false;
		successFlag = false;
		if(gameOverFlag == false){
			return scoreBoardDecoder(playerDetails);	
		}
		else{
			return 1; //return gameOver
		}
		
	}


	var scoreBoardDecoder = function(contents){
		var decodedValue = contents;
		if(contents[1] == true){
			decodedValue[1] = "ACTIVE";
			decodedValue[6] = "PASSIVE";
		}
		if(contents[1] == false){
			decodedValue[1] = "PASSIVE";
			decodedValue[6] = "ACTIVE";
		}
		if(contents[3] == 2){
			decodedValue[3] = "RED + BLUE";
			decodedValue[8] = "RED + BLUE";
		}
		if(contents[3] == 0){
			decodedValue[3] = "BLUE";
			decodedValue[8] = "RED";
		}
		if(contents[3] == 1){
			decodedValue[3] = "RED";
			decodedValue[8] = "BLUE";
		}
		if(contents[4] == 0){
			decodedValue[4] = 1;
			decodedValue[3] = "BLACK";
		}
		if(contents[9] == 0){
			decodedValue[9] = 1;
			decodedValue[8] = "BLACK";
		}
		return decodedValue;
	}
}
