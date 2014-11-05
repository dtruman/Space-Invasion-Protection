var stage;
var FPS=30;
var frameCount;

//Key Codes
var KEYCODE_LEFT=37;
var KEYCODE_UP=38;
var KEYCODE_RIGHT=39;
var KEYCODE_DOWN=40;
var KEYCODE_W=87;
var KEYCODE_A=65;
var KEYCODE_S=83;
var KEYCODE_D=68;
var KEYCODE_SPACE=32;
var KEYCODE_J=74;

//Mouse Locations
var mouseX, mouseY;

//Screen Images
var titleScreen;
var backgroundScreen;
var instructionScreen;
var gameoverScreen;
var levelFrame;

//GameStates
var gameState;
var PLAY_GAME=0;
var TITLE_SCREEN=1;
var GAME_OVER=2;
var LEARN_GAME=3;
var STANDBY=4;
var PLAYING=5;
var LOADING=6;

//Mouse Text
var mxText, myText;

//Sprite sheets
var buttonSheet;

//Buttons
var btnPlay;
var btnInstruct;
var btnMenu;
var btnContinue;

//Player Sheets
var walkSheet;
var walk;

//Miscellaneous
var textTime;
var textScore;
var score;
var inputTextCases;
var levelSign;
var levelNumber;
var platforms;
var platHeights;
var platWidths;
var door;
var doorHeight;
var doorWidth;
var playerHeight;
var playerWidth;
var playerForce;
var movePlayerLeft;
var movePlayerRight;
var movePlayerUP;
var movePlayerDOWN;

var shooter;
var shooterDir;
var shooterCount;

var enemies;
var enemyDir;
var enemyCount;

var spawnPositionsX;
var spawnPositionY;
var spawnSpeed;
var spawnerCount;

var doorHP;
var doorHPBar;

var doorTwo;
var doorTwoHP;
var doorTwoHPBar;

var doorHitSound;
var gameOverSound;

//Physics stuff
var gravity;

function setupCanvas()
{
    var canvas=document.getElementById("game");
    canvas.width=800;
    canvas.height=600;
    stage=new createjs.Stage(canvas);
    score=0;
    stage.enableMouseOver();
    loadFiles();
    gameState=LOADING;

    stage.update();
}

function setupFiles()
{
    mxText=new createjs.Text("Placeholder", "12px Arial", "#ffffff");
    myText=new createjs.Text("Placeholder", "12px Arial", "#ffffff");
    textTime=new createjs.Text("Placeholder", "12px Arial", "#ffffff");
    textScore=new createjs.Text("Placeholder", "12px Arial", "#ffffff");
    inputTextCases=new createjs.Text("Placeholder", "12px Arial", "#ffffff");
        
    mxText.x=10;
    mxText.y=50;
    myText.x=10;
    myText.y=100;
    textTime.x=10;
    textTime.y=200;
    textScore.x=10;
    textScore.y=250;
    inputTextCases.x=10;
    inputTextCases.y=300;
    spawnSpeed=120;
    spawnerCount=120;
    
    stage.addChild(titleScreen, backgroundScreen, instructionScreen, gameoverScreen, mxText, myText, textTime, textScore);
    
    btnPlay=new createjs.Sprite(buttonSheet, "playUp");
    btnPlay.x=200;
    btnPlay.y=500;
    btnPlay.on("click", function(evt){gameState=PLAY_GAME; btnPlay.gotoAndPlay("playDown");});
    btnPlay.on("mouseover", function(evt){btnPlay.gotoAndPlay("playOver");});
    btnPlay.on("mouseout", function(evt){btnPlay.gotoAndPlay("playUp");});
    stage.addChild(btnPlay);
    
    btnInstruct=new createjs.Sprite(buttonSheet, "instructUp");
    btnInstruct.x=300;
    btnInstruct.y=500;
    btnInstruct.on("click", function(evt){gameState=LEARN_GAME; btnInstruct.gotoAndPlay("instructDown");});
    btnInstruct.on("mouseover", function(evt){btnInstruct.gotoAndPlay("instructOver");});
    btnInstruct.on("mouseout", function(evt){btnInstruct.gotoAndPlay("instructUp");});
    stage.addChild(btnInstruct);
    
    btnMenu=new createjs.Sprite(buttonSheet, "menuUp");
    btnMenu.x=400;
    btnMenu.y=500;
    btnMenu.on("click", function(evt){gameState=TITLE_SCREEN; btnMenu.gotoAndPlay("menuDown");});
    btnMenu.on("mouseover", function(evt){btnMenu.gotoAndPlay("menuOver");});
    btnMenu.on("mouseout", function(evt){btnMenu.gotoAndPlay("menuUp");});
    stage.addChild(btnMenu);
    
    btnContinue=new createjs.Sprite(buttonSheet, "continueUp");
    btnContinue.x=500;
    btnContinue.y=500;
    btnContinue.on("click", function(evt){gameState=PLAY_GAME; btnContinue.gotoAndPlay("continueDown");});
    btnContinue.on("mouseover", function(evt){btnContinue.gotoAndPlay("continueOver");});
    btnContinue.on("mouseout", function(evt){btnContinue.gotoAndPlay("continueUp");});
    stage.addChild(btnContinue);
    
    levelNumber=new createjs.Text("1", "28px Arial", "#000000");
    levelNumber.x=100;
    levelNumber.y=100;
    
    levelSign=new createjs.Container();
    levelSign.addChild(levelFrame, levelNumber);
    
    platforms=new Array();
    platHeights=new Array();
    platWidths=new Array();
    shooter=new Array();
    shooterDir=new Array();
    spawnPositionsX=[0,780];
    spawnPositionsY=[550,120,420];
    shooterCount=0;
    
    enemies=new Array();
    enemyDir=new Array();
    enemyCount=0;
    
    platforms.push(new createjs.Shape());
    platforms[0].graphics.beginFill("A66").drawRect(0,0,300,20);
    platforms[0].x=800/2-150;
    platforms[0].y=600/2-10;
    platHeights.push(20);
    platWidths.push(300);
    
    platforms.push(new createjs.Shape());
    platforms[1].graphics.beginFill("A66").drawRect(0,0,800,20);
    platforms[1].y=580;
    platHeights.push(20);
    platWidths.push(800);
    
    platforms.push(new createjs.Shape());
    platforms[2].graphics.beginFill("A66").drawRect(0,0,250,20);
    platforms[2].y=150;
    platHeights.push(20);
    platWidths.push(250);
    
    platforms.push(new createjs.Shape());
    platforms[3].graphics.beginFill("A66").drawRect(0,0,250,20);
    platforms[3].y=150;
    platforms[3].x=800/2+150;
    platHeights.push(20);
    platWidths.push(250);
    
    platforms.push(new createjs.Shape());
    platforms[4].graphics.beginFill("A66").drawRect(0,0,250,20);
    platforms[4].y=450;
    platHeights.push(20);
    platWidths.push(250);
    
    platforms.push(new createjs.Shape());
    platforms[5].graphics.beginFill("A66").drawRect(0,0,250,20);
    platforms[5].y=450;
    platforms[5].x=800/2+150;
    platHeights.push(20);
    platWidths.push(250);
    
    door=new createjs.Shape();
    door.graphics.beginFill(["F00", "#00F"]).drawRect(0,0,50,50);
    door.y=530;
    door.x=400-25;
    doorHeight=50;
    doorWidth=50;
    
    doorHP=10;
    
    doorHPBar=new createjs.Shape();
    doorHPBar.graphics.beginFill("FF0000").drawRect(0,0,50,10);
    doorHPBar.y=510;
    doorHPBar.x=375;
    
    doorTwo=new createjs.Shape();
    doorTwo.graphics.beginFill(["F00", "#00F"]).drawRect(0,0,50,50);
    doorTwo.y=240;
    doorTwo.x=400-25;
    
    doorTwoHP=10;
    
    doorTwoHPBar=new createjs.Shape();
    doorTwoHPBar.graphics.beginFill("FF0000").drawRect(0,0, 50, 10);
    doorTwoHPBar.y=220;
    doorTwoHPBar.x=375;
    
    player=new createjs.Shape();
    player.graphics.beginFill("F00").drawRect(0,0,30,40);
    player.y=530;
    playerWidth=30;
    playerHeight=40;
    
    playerForce=0;
    
    stage.addChild(door, doorHPBar, doorTwo, doorTwoHPBar,player);
    for(i=0; i<6; i++)
    {
        stage.addChild(platforms[i]);
    }
    stage.addChild(inputTextCases, levelSign);
    
    gameState=TITLE_SCREEN;
    stage.update();
}

function main()
{
    setupCanvas();
}

function loop()
{   
    stage.update();
    
    switch(gameState)
    {
        case LOADING:
            break;
        case PLAY_GAME:
            levelSign.x=350;
            levelSign.y=-1000;
			levelSign.visible=true;
            titleScreen.visible=false;
            gameoverScreen.visible=false;
            instructionScreen.visible=false;
            backgroundScreen.visible=true;
            btnPlay.visible=false;
            btnInstruct.visible=false;
            btnMenu.visible=false;
            btnContinue.visible=false;
            textScore.visible=true;
            door.visible=true;
            doorHPBar.visible=true;
            doorTwo.visible=true;
            doorTwoHPBar.visible=true;
            player.visible=true;
            platforms[0].visible=true;
            platforms[1].visible=true;
            platforms[2].visible=true;
            platforms[3].visible=true;
            platforms[4].visible=true;
            platforms[5].visible=true;
            resetGameTimer();
            score=0;
            tweenObj();
            break;
        case TITLE_SCREEN:
            resetGameTimer();
			levelSign.visible=false;
            titleScreen.visible=true;
            gameoverScreen.visible=false;
            instructionScreen.visible=false;
            backgroundScreen.visible=false;
            btnPlay.visible=true;
            btnInstruct.visible=true;
            btnMenu.visible=false;
            btnContinue.visible=false;
            textScore.visible=false;
            door.visible=false;
            player.visible=false;
            doorHPBar.visible=false;
            doorHP=10
            doorTwo.visible=false;
            doorTwoHP=10;
            doorTwoHPBar.visible=false;
            platforms[0].visible=false;
            platforms[1].visible=false;
            platforms[2].visible=false;
            platforms[3].visible=false;
            platforms[4].visible=false;
            platforms[5].visible=false;
            gameState=STANDBY;
            break;
        case GAME_OVER:
            resetGameTimer();
            playerReset();
            levelSign.visible=false;
            titleScreen.visible=false;
            gameoverScreen.visible=true;
            instructionScreen.visible=false;
            backgroundScreen.visible=false;
            btnPlay.visible=false;
            btnInstruct.visible=false;
            btnMenu.visible=true;
            btnContinue.visible=true;
            textScore.visible=true;
            door.visible=false;
            player.visible=false;
            doorHPBar.visible=false;
            doorTwo.visible=false;
            doorTwoHPBar.visible=false;
            platforms[0].visible=false;
            platforms[1].visible=false;
            platforms[2].visible=false;
            platforms[3].visible=false;
            platforms[4].visible=false;
            platforms[5].visible=false;
            doorHitSound.stop();
            if(gameOverSound==undefined)
                    gameOverSound=createjs.Sound.play("./Assets/GO.ogg");
            else
                gameOverSound.play();
            gameState=STANDBY;
            break;
        case LEARN_GAME:
			levelSign.visible=false;
            titleScreen.visible=false;
            gameoverScreen.visible=false;
            instructionScreen.visible=true;
            backgroundScreen.visible=false;
            btnPlay.visible=false;
            btnInstruct.visible=false;
            btnMenu.visible=true;
            btnContinue.visible=false;
            textScore.visible=false;
            door.visible=false;
            player.visible=false;
            gameState=STANDBY;
            break;
        case STANDBY:
            textTime.text="Time: " + gameTimer;
            textScore.text="Score: " + score;
            break;
        case PLAYING:
            textTime.text="Time: " + gameTimer;
            textScore.text="Score: " + score;
            break;
    }
    if(gameState!=LOADING)
    {
        runGameTimer();
        mouseInit();
        collisionHandle();
        handleFire();
        handleEnemies();
        HPBarScale();
    }
    if(doorHP==0 || doorTwoHP==0)
            gameState=GAME_OVER;
}
createjs.Ticker.addEventListener("tick", loop);
createjs.Ticker.setFPS(FPS);

function HPBarScale()
{
    doorHPBar.scaleX=doorHP/10;
    doorTwoHPBar.scaleX=doorTwoHP/10;
}

function playerReset()
{
    doorHP=10;
    doorTwoHP=10;
    for(i=0; i<enemyCount; i++)
    {
        stage.removeChild(enemies[i]);   
    }
    enemies.splice(0,enemyCount);
    enemyCount=0;
    spawnSpeed=120;
    spawnerCount=120;
}


createjs.Sound.registerPlugins([ createjs.HTMLAudioPlugin]);
createjs.Sound.alternateExtensions = ["ogg"];

manifest=[
    {src:"title.jpg", id:"title"},
    {src:"background.jpg", id:"background"},
    {src:"INSTRUCTScreen.jpg",id:"instructions"},
    {src:"GOScreen.jpg", id:"gameover"},
    {src:"levelsign.png", id:"levelsign"},
    {src:"buttons.png", id:"button"},
    {src:"sprites.png", id:"sprites"}
];

var queue;
function loadFiles()
{
    queue=new createjs.LoadQueue(true, "Assets/");
    queue.on("complete", loadComplete, this);
    queue.loadManifest(manifest);
}
function loadComplete(evt)
{
    titleScreen=new createjs.Bitmap(queue.getResult("title"));
    backgroundScreen=new createjs.Bitmap(queue.getResult("background"));
    instructionScreen=new createjs.Bitmap(queue.getResult("instructions"));
    gameoverScreen=new createjs.Bitmap(queue.getResult("gameover"));
    levelFrame=new createjs.Bitmap(queue.getResult("levelsign"));
    buttonSheet=new createjs.SpriteSheet({
        images:[queue.getResult("button")],
        frames: {width: 93, height: 33, regX: 46, regY: 15},
        animations: {
            playUp: [0,0, "playUp"],
            playOver:[1,1,"playOver"],
            playDown:[2,2,"playDown"],
            instructUp:[3,3,"instructUp"],
            instructOver:[4,4,"instructOver"],
            instructDown:[5,5,"instructDown"],
            menuUp:[6,6,"menuUp"],
            menuOver:[7,7,"menuOver"],
            menuDown:[8,8,"menuDown"],
            continueUp:[9,9,"continueUp"],
            continueOver:[10,10,"continueOver"],
            continueDown:[11,11,"continueDown"],
        }
    });
    
    walkSheet = new createjs.SpriteSheet({
        images: [queue.getResult("sprites")],
        frames: [[160,0,19,49,0,10.05,48.6],[179,0,34,44,0,17.05,43.6],     [213,0,22,46,0,9.05,45.6],[235,0,17,49,0,8.05,48.6],[0,49,25,49,0,10.05,48.6],[25,49,31,46,0,14.05,45.6],[56,49,33,44,0,16.05,43.6],[89,49,30,44,0,17.05,43.6],[119,49,28,46,0,17.05,45.6],[147,49,19,49,0,10.05,48.6],[166,49,23,49,0,14.05,48.6],[189,49,31,46,0,16.05,45.6],[220,49,34,44,0,17.05,43.6],[0,98,19,49,0,9.05,48.6],[19,98,34,44,0,17.05,43.6],[53,98,22,46,0,13.05,45.6],[75,98,17,49,0,9.05,48.6],[92,98,25,49,0,15.05,48.6],[117,98,31,46,0,17.05,45.6],[148,98,33,44,0,17.05,43.6],[181,98,30,44,0,13.05,43.6],[211,98,28,46,0,11.05,45.6],[0,147,19,49,0,9.05,48.6],[19,147,23,49,0,9.05,48.6],[42,147,31,46,0,15.05,45.6],[73,147,34,44,0,17.05,43.6]],
        animations: {
            standRight: [0, 0, "standRight"],
            walkRight: [1, 12, "walkRight", .5],
            standLeft: [13, 13, "standLeft"],
            walkLeft: [14, 25, "walkLeft", .5]
            }     
        });
    
    titleScreen.scaleX=stage.canvas.width/titleScreen.image.width;
    titleScreen.scaleY=stage.canvas.height/titleScreen.image.height;
    
    backgroundScreen.scaleX=stage.canvas.width/backgroundScreen.image.width;
    backgroundScreen.scaleY=stage.canvas.height/backgroundScreen.image.height;
    
    instructionScreen.scaleX=stage.canvas.width/instructionScreen.image.width;
    instructionScreen.scaleY=stage.canvas.height/instructionScreen.image.height;
    
    gameoverScreen.scaleX=stage.canvas.width/gameoverScreen.image.width;
    gameoverScreen.scaleY=stage.canvas.height/gameoverScreen.image.height;
    
    setupFiles();
}

var myTween;
function tweenComplete(tween)
{
    gameState=PLAYING;
}
function tweenObj()
{
    myTween=createjs.Tween.get(levelSign, {loop:false}).wait(500).to({x:200, y:200, rotation:0},1500, createjs.Ease.bounceOut).wait(2000).to({y:1000, rotation:0}, 1000, createjs.Ease.backIn).call(tweenComplete);
}

function addForce(force)
{
    playerForce+=force;
}

function spawnEnemy()
{
    enemyCount+=1;
    
    var newEnemy=new createjs.Shape();
    newEnemy.graphics.beginFill("#A66").drawRect(0,0,20,30);
    
    var x=spawnPositionsX[Math.round(Math.random()*1)];
    var y=spawnPositionsY[Math.round(Math.random()*2)];
    
    newEnemy.x=x;
    newEnemy.y=y;
    var dir=Math.random()*2;
    
    enemies.push(newEnemy);
    
    if(dir<1)
    {
        enemyDir.push(true);
    }
    else
    {
        enemyDir.push(false);   
    }
    
    stage.addChild(enemies[enemyCount-1]);
}
                   
function handleEnemies()
{
    for(i=0; i<enemyCount; i++)
    {
        if(enemyDir[i])
        {
            enemies[i].x+=2;   
        }
        else
        {
            enemies[i].x-=2;   
        }
        
        if(enemies[i].x<0)
        {
            enemyDir[i]=!enemyDir[i];   
        }
        else if(enemies[i].x+20>800)
        {
            enemyDir[i]=!enemyDir[i];   
        }
        
        var step=1/((FPS)+300);
        enemies[i].y+=3000*step;
        
        for(j=0; j<6; j++)
        {
            if((platforms[j].y<enemies[i].y+30 && platforms[j].y>enemies[i].y) && (platforms[j].x<enemies[i].x+playerWidth && platforms[j].x+platWidths[j]>enemies[i].x))
           {
               enemies[i].y=platforms[j].y-30;
           }
        }
        
        if(enemies[i].y>door.y && enemies[i].x+20>door.x && enemies[i].x<door.x+50 && doorHP!=0)
        {
            stage.removeChild(enemies[i]);
            enemies.splice(i,1);
            enemyDir.splice(i,1);
            enemyCount--;
            doorHP--;
            if(doorHitSound==undefined)
                doorHitSound=createjs.Sound.play("./Assets/DH.ogg");
            else
                doorHitSound.play();
        }
        else if(enemies[i].y>doorTwo.y && enemies[i].x+20>doorTwo.x && enemies[i].x<doorTwo.x+50 && doorTwoHP!=0)
        {
            stage.removeChild(enemies[i]);
            enemies.splice(i,1);
            enemyDir.splice(i,1);
            enemyCount--;
            doorTwoHP--;
            if(doorHitSound==undefined)
                doorHitSound=createjs.Sound.play("./Assets/DH.ogg");
            else
                doorHitSound.play();        }
        
        for(j=0; j<shooterCount; j++)
        {
            if(shooter[j].x+10<enemies[i].x+20 && shooter[j].x+10>enemies[i].x && shooter[j].y+10<enemies[i].y+30 && shooter[j].y+10>enemies[i].y)
            {
                stage.removeChild(enemies[i]);
                enemies.splice(i,1);
                enemyDir.splice(i,1);
                enemyCount--; 
                stage.removeChild(shooter[j]);
                shooter.splice(j,1);
                shooterDir.splice(j,1);
                shooterCount-=1;
                score++;
            }
        }
    }
}

function fire(direction)
{
    shooterCount+=1;
    
    var newFire=new createjs.Shape();
    newFire.graphics.beginFill("#A66").drawCircle(0,0,10);
    newFire.x=player.x+(playerWidth/2);
    newFire.y=player.y+(playerHeight/2);
    shooter.push(newFire);
    shooterDir.push(direction);
    
    stage.addChild(shooter[shooterCount-1]);
}

function handleFire()
{
    for(i=0; i<shooterCount; i++)
    {
        if(shooterDir[i])
        {
            shooter[i].x+=10;   
        }
        else
        {
            shooter[i].x-=10;   
        }
        
        if(shooter[i].x<0 || shooter[i].x>800)
        {
            stage.removeChild(shooter[i]);
            shooter.splice(i,1);
            shooterDir.splice(i,1);
            shooterCount--;
        }
    }
}

function handleKeyDown(evt)
{
    if(!evt)
    {
        var evt=window.event;   
    }
    switch(evt.keyCode)
    {
        case KEYCODE_LEFT:
            if(gameState===PLAYING && movePlayerLeft)
                player.x-=20;
            inputTextCases.text="Input: Left";
            break;
        case KEYCODE_RIGHT:
            if(gameState===PLAYING && movePlayerRight)
                player.x+=20;
            inputTextCases.text="Input: Right";
            break;
        case KEYCODE_UP:
            if(gameState===PLAYING && movePlayerUP)
                addForce(-6000);
            inputTextCases.text="Input: Up";
            break;
        case KEYCODE_DOWN:
            if(gameState===PLAYING)
                
            inputTextCases.text="Input: Down";
            break;
        case KEYCODE_W:
            inputTextCases.text="Input: W";
            break;
        case KEYCODE_A:
            inputTextCases.text="Input: A";
            fire(false);
            break;
        case KEYCODE_S:
            inputTextCases.text="Input: S";
            break;
        case KEYCODE_D:
            inputTextCases.text="Input: D";
            fire(true);
            break;
        case KEYCODE_J:
            inputTextCases.text="Input: J";
            Jamie();
        case KEYCODE_SPACE:
            inputTextCases.text="Input: Space";
            break;
    }
}
document.onkeydown=handleKeyDown;            

function Jamie()
{
    for(i=0; i<enemyCount; i++)
    {
        stage.removeChild(enemies[i]);   
    }
    enemies.splice(0,enemyCount);
    enemyCount=0;
}

function handleKeyUp(evt)
{
    if(!evt)
    {
        var evt=window.event;   
    }
    switch(evt.keyCode)
    {
        case KEYCODE_LEFT:
            break;
        case KEYCODE_RIGHT:
            break;
        case KEYCODE_UP:
            break;
        case KEYCODE_DOWN:
            break;
    }
}
document.onkeyup=handleKeyUp;

function mouseInit()
{
     stage.on("stagemousemove", function(evt)
    {
        mouseX = Math.floor(evt.stageX);
        mouseY = Math.floor(evt.stageY);
    });
    
    mxText.text="X Position: " + mouseX;
    myText.text="Y Position: " + mouseY;
}

function collisionHandle()
{
    movePlayerRight=true;
    movePlayerLeft=true;
    movePlayerUP=true;
    movePlayerDOWN=true;
       
    //Ground
       if((platforms[1].y<player.y+playerHeight))
       {
            movePlayerDOWN=false; 
           player.y=580-playerHeight;
       }
       else if(movePlayerDOWN)
       {
            movePlayerDOWN=true;   
       }
       
    
    //plat1
    if((platforms[0].x+platWidths[0]>player.x) && (platforms[0].y>player.y+playerHeight && platforms[0].y+platHeights[0]<player.y+playerHeight))
       {
            movePlayerRight=false;
       }
       else if(movePlayerRight)
       {
            movePlayerRight=true;   
       }
       
       if((platforms[0].x<player.x+playerWidth) && (platforms[0].y>player.y+playerHeight && platforms[0].y+platHeights[0]<player.y+playerHeight))
       {
             movePlayerLeft=false;  
       }
       else if(movePlayerLeft)
       {
           movePlayerLeft=true;
       }
       
       if((platforms[0].y<player.y+playerHeight && platforms[0].y>player.y) && (platforms[0].x<player.x+playerWidth && platforms[0].x+platWidths[0]>player.x))
       {
           movePlayerDOWN=false;
           player.y=platforms[0].y-playerHeight;
       }
       else if(movePlayerDOWN)
       {
            movePlayerDOWN=true;   
       }
    
    //plat2
    if((platforms[2].x+platWidths[2]>player.x) && (platforms[2].y>player.y+playerHeight && platforms[2].y+platHeights[2]<player.y+playerHeight))
       {
            movePlayerRight=false;
       }
       else if(movePlayerRight)
       {
            movePlayerRight=true;   
       }
       
       if((platforms[2].x<player.x+playerWidth) && (platforms[2].y>player.y+playerHeight && platforms[2].y+platHeights[2]<player.y+playerHeight))
       {
             movePlayerLeft=false;  
       }
       else if(movePlayerLeft)
       {
           movePlayerLeft=true;
       }
       
       if((platforms[2].y<player.y+playerHeight && platforms[2].y>player.y) && (platforms[2].x<player.x+playerWidth && platforms[2].x+platWidths[2]>player.x))
       {
           movePlayerDOWN=false;
           player.y=platforms[2].y-playerHeight;
       }
       else if(movePlayerDOWN)
       {
            movePlayerDOWN=true;   
       }
    
    //plat1
    if((platforms[3].x+platWidths[3]>player.x) && (platforms[3].y>player.y+playerHeight && platforms[3].y+platHeights[3]<player.y+playerHeight))
       {
            movePlayerRight=false;
       }
       else if(movePlayerRight)
       {
            movePlayerRight=true;   
       }
       
       if((platforms[3].x<player.x+playerWidth) && (platforms[3].y>player.y+playerHeight && platforms[3].y+platHeights[3]<player.y+playerHeight))
       {
             movePlayerLeft=false;  
       }
       else if(movePlayerLeft)
       {
           movePlayerLeft=true;
       }
       
       if((platforms[3].y<player.y+playerHeight && platforms[3].y>player.y) && (platforms[3].x<player.x+playerWidth && platforms[3].x+platWidths[3]>player.x))
       {
           movePlayerDOWN=false;
           player.y=platforms[3].y-playerHeight;
       }
       else if(movePlayerDOWN)
       {
            movePlayerDOWN=true;   
       }
    
    //plat1
    if((platforms[4].x+platWidths[4]>player.x) && (platforms[4].y>player.y+playerHeight && platforms[4].y+platHeights[4]<player.y+playerHeight))
       {
            movePlayerRight=false;
       }
       else if(movePlayerRight)
       {
            movePlayerRight=true;   
       }
       
       if((platforms[4].x<player.x+playerWidth) && (platforms[4].y>player.y+playerHeight && platforms[4].y+platHeights[4]<player.y+playerHeight))
       {
             movePlayerLeft=false;  
       }
       else if(movePlayerLeft)
       {
           movePlayerLeft=true;
       }
       
       if((platforms[4].y<player.y+playerHeight && platforms[4].y>player.y) && (platforms[4].x<player.x+playerWidth && platforms[4].x+platWidths[4]>player.x))
       {
           movePlayerDOWN=false;
           player.y=platforms[4].y-playerHeight;
       }
       else if(movePlayerDOWN)
       {
            movePlayerDOWN=true;   
       }
    
    //plat1
    if((platforms[5].x+platWidths[5]>player.x) && (platforms[5].y>player.y+playerHeight && platforms[5].y+platHeights[5]<player.y+playerHeight))
       {
            movePlayerRight=false;
       }
       else if(movePlayerRight)
       {
            movePlayerRight=true;   
       }
       
       if((platforms[5].x<player.x+playerWidth) && (platforms[5].y>player.y+playerHeight && platforms[5].y+platHeights[5]<player.y+playerHeight))
       {
             movePlayerLeft=false;  
       }
       else if(movePlayerLeft)
       {
           movePlayerLeft=true;
       }
       
       if((platforms[5].y<player.y+playerHeight && platforms[5].y>player.y) && (platforms[5].x<player.x+playerWidth && platforms[5].x+platWidths[5]>player.x))
       {
           movePlayerDOWN=false;
           player.y=platforms[5].y-playerHeight;
       }
       else if(movePlayerDOWN)
       {
            movePlayerDOWN=true;   
       }
    
    if(player.x<0)
    {
        player.x=0;   
    }
    if(player.x+playerWidth>800)
    {
        player.x=800-playerWidth;
    }
    if(player.y+playerHeight<0)
    {
        player.y=0;
        playerForce=0;
    }
}
             
function resetGameTimer()
{
    frameCount=0;
    gameTimer=0;
}

function runGameTimer()
{
    frameCount+=1;
    if(frameCount%(FPS/10)==0)
    {
        gameTimer=frameCount/(FPS);   
    }
    if(gameState==PLAYING && movePlayerDOWN)
    {
        playerForce+=300;
    }
    else if(playerForce>0)
    {
        playerForce=0;   
    }
    
    if(gameState==PLAYING && frameCount==spawnSpeed)
    {
        spawnEnemy();
        if(spawnerCount>1)
        {
            spawnSpeed+=spawnerCount-1;
            spawnerCount--;
        }
        else
        {
            spawnSpeed+=spawnerCount+1;
        }
        console.log("Spawn "+spawnSpeed);
        console.log("Frame "+frameCount);
    }
    
    var step=1/((FPS)+300);
    player.y+=playerForce*step;
    
    playerForce=playerForce-playerForce*step;
}

//makes sure DOM is ready then loads main()
if(!!(window.addEventListener))
{
    window.addEventListener("DOMContentLoaded", main);
}
else
{
    window.attachEvent("onload", main);
}