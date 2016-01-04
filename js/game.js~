function Game(){
	var loadGame = new Loading();
	var parent = document.getElementsByTagName("body")[0];
	var gameWindow1 = new GameWindow(parent);
	//function that places stick
	var placeStick = function(){
		gameWindow1.bg.board.stick.placeStick(gameWindow1.bg.board.ballsArray[0].posX,gameWindow1.bg.board.ballsArray[0].posY);
		gameWindow1.bg.board.stick.rotate();
	}
	placeStick();
	function writeBoard(displayContents){
		gameWindow1.bg.scoreBoard.assignValue(displayContents);
	}
	var buttonClicked = false;
	var powerLevel = 0; //signifies the power value of button
	var moveBalls = false;
	var powerFlag = true;
	var stickFlag = false; //stick unmoved
	var whiteBallFlag = false; //ball is not moved
	var ballMoverFlag = false;
	var ruleFlag = false; //rule test condition is false
	var noticeBoardCounter = 0; //time periode to show notice baord
	var stickRotation = new Rotator(gameWindow1.bg.board.stick); //wrapper of the stick
	var loadingCounter = 0;
	var ruleOutput;
	var mainInterval = function(){
		if(loadingCounter < 500){
			loadingCounter++;
			loadGame.loadingMover(500);
		}
		else{
			if(powerFlag == true){
				gameWindow1.bg.power.powerMover(); //continue power moving animation
			}
			if(stickFlag == true){
				gameWindow1.bg.power.resetToBottom(); 
				whiteBallFlag  = gameWindow1.bg.board.stick.move(powerLevel/2); 
				ruleFlag = false;
			}
			if(whiteBallFlag  == true){
				stickFlag = false;
				gameWindow1.bg.board.ballsArray[0].velocityStarter(gameWindow1.bg.board.stick.rotatedX,gameWindow1.bg.board.stick.rotatedY,powerLevel); //white ball velocity started
				moveBalls = true;
				whiteBallFlag  = false;
				ballMoverFlag = true; 
			}
			if(ballMoverFlag == true){
				gameWindow1.bg.board.stick.hide(); //hide the stick
				gameWindow1.bg.board.ballMover();
				ruleFlag =  !(gameWindow1.bg.board.velProfile()); //true if ball is moving;
				
			}
			if(ruleFlag == true){
				ballMoverFlag = false;
				ruleFlag = false;
				ruleOutput = gameWindow1.gameRule.ruleTest(gameWindow1.bg.board.ballsArray,gameWindow1.players,gameWindow1.bg.board.ballsArray[0].firstCollide);
				if(ruleOutput == 1){
					clearInterval(mainIntervalId); //game is over and operate on new Game menu
				}
				else{
					writeBoard(ruleOutput);	
				}
				
				noticeBoardCounter++;
			}
			if(noticeBoardCounter > 0){
				noticeBoardCounter++;
				if(noticeBoardCounter>150){
					gameWindow1.gameRule.hideBoard();
					powerFlag = true;
					buttonClicked= false;
					gameWindow1.bg.board.ballsArray[0].reset();
					placeStick();
					noticeBoardCounter = 0;
				}
			}
		}
	}
	gameWindow1.bg.power.button.onclick = (function(){
		if(buttonClicked == false){
			buttonClicked = true;
			powerLevel = gameWindow1.bg.power.powerLevel/30;
			powerFlag = false;
			stickFlag = true;
		}
	})
	var mainIntervalId = setInterval(mainInterval,10);
}
var startGame = new Game();	
