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

var LeftOn;
var UpOn;
var RightOn;
var WOn;
var AOn;
var SOn;
var DOn;
var JOn;

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
var SpaceManSheet;
var walkSheet;

//Buttons
var btnPlay;
var btnInstruct;
var btnMenu;
var btnContinue;

//Player Sheets
var SpaceMan;

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
var soundOn;
var soundOff;

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
var music;
var mute;

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
    
    //Control Setup
    LeftOn=false;
    UpOn=false;
    RightOn=false;
    WOn=false;
    AOn=false;
    SOn=false;
    DOn=false;
    JOn=false;
    
    stage.update();
}

function setupFiles()
{
    textTime=new createjs.Text("Placeholder", "12px Arial", "#ffffff");
    textScore=new createjs.Text("Placeholder", "12px Arial", "#ffffff");
    inputTextCases=new createjs.Text("Placeholder", "12px Arial", "#ffffff");

    alreadyWalking=false;
    textTime.x=250;
    textTime.y=20;
    textTime.scaleX=3;
    textTime.scaleY=3;
    textScore.x=450;
    textScore.y=20;
    textScore.scaleX=3;
    textScore.scaleY=3;
    spawnSpeed=120;
    spawnerCount=120;
    
    stage.addChild(titleScreen, backgroundScreen, instructionScreen, gameoverScreen, textTime, textScore);
    
    btnPlay=new createjs.Sprite(buttonSheet, "playUp");
    btnPlay.x=200;
    btnPlay.y=400;
    btnPlay.scaleX=1.3;
    btnPlay.scaleY=1.3;
    btnPlay.on("click", function(evt){gameState=PLAY_GAME; btnPlay.gotoAndPlay("playDown");});
    btnPlay.on("mouseover", function(evt){btnPlay.gotoAndPlay("playOver");});
    btnPlay.on("mouseout", function(evt){btnPlay.gotoAndPlay("playUp");});
    stage.addChild(btnPlay);
    
    btnInstruct=new createjs.Sprite(buttonSheet, "instructUp");
    btnInstruct.x=192;
    btnInstruct.y=460;
    btnInstruct.scaleX=1.3;
    btnInstruct.scaleY=1.3;
    btnInstruct.on("click", function(evt){gameState=LEARN_GAME; btnInstruct.gotoAndPlay("instructDown");});
    btnInstruct.on("mouseover", function(evt){btnInstruct.gotoAndPlay("instructOver");});
    btnInstruct.on("mouseout", function(evt){btnInstruct.gotoAndPlay("instructUp");});
    stage.addChild(btnInstruct);
    
    btnMenu=new createjs.Sprite(buttonSheet, "menuUp");
    btnMenu.x=400;
    btnMenu.y=500;
    btnMenu.scaleX=1.3;
    btnMenu.scaleY=1.3;
    btnMenu.on("click", function(evt){gameState=TITLE_SCREEN; btnMenu.gotoAndPlay("menuDown");});
    btnMenu.on("mouseover", function(evt){btnMenu.gotoAndPlay("menuOver");});
    btnMenu.on("mouseout", function(evt){btnMenu.gotoAndPlay("menuUp");});
    stage.addChild(btnMenu);
    
    btnContinue=new createjs.Sprite(buttonSheet, "continueUp");
    btnContinue.x=400;
    btnContinue.y=550;
    btnContinue.scaleX=1.3;
    btnContinue.scaleY=1.3;
    btnContinue.on("click", function(evt){gameState=PLAY_GAME; btnContinue.gotoAndPlay("continueDown");});
    btnContinue.on("mouseover", function(evt){btnContinue.gotoAndPlay("continueOver");});
    btnContinue.on("mouseout", function(evt){btnContinue.gotoAndPlay("continueUp");});
    stage.addChild(btnContinue);
    
    levelNumber=new createjs.Bitmap(queue.getResult("Badge"));
    levelNumber.x=100;
    levelNumber.y=100;
    
    levelSign=new createjs.Container();
    levelSign.addChild(levelNumber);
    
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
    
    var scale=0.6;
    var scale2=1.5;
    
    platforms.push(new createjs.Bitmap(queue.getResult("platform")));
    platforms[0].x=800/2-180;
    platforms[0].y=600/2-10;
    platforms[0].scaleY=scale;
    platforms[0].scaleX=scale2+0.3;
    platHeights.push(20);
    platWidths.push(300);
    
    platforms.push(new createjs.Bitmap(queue.getResult("platform")));
    platforms[1].y=580;
    platforms[1].x-=30;
    platforms[1].scaleY=scale;
    platforms[1].scaleX=scale2;
    platHeights.push(20);
    platWidths.push(830);
    
    platforms.push(new createjs.Bitmap(queue.getResult("platform")));
    platforms[2].y=150;
    platforms[2].x-=30;
    platforms[2].scaleY=scale;
    platforms[2].scaleX=scale2;
    platHeights.push(20);
    platWidths.push(250);
    
    platforms.push(new createjs.Bitmap(queue.getResult("platform")));
    platforms[3].y=150;
    platforms[3].x=800/2+120;
    platforms[3].scaleY=scale;
    platforms[3].scaleX=scale2+0.2;
    platHeights.push(20);
    platWidths.push(280);
    
    platforms.push(new createjs.Bitmap(queue.getResult("platform")));
    platforms[4].y=450;
    platforms[4].x-=30;
    platforms[4].scaleY=scale;
    platforms[4].scaleX=scale2;
    platHeights.push(20);
    platWidths.push(250);
    
    platforms.push(new createjs.Bitmap(queue.getResult("platform")));
    platforms[5].y=450;
    platforms[5].x=800/2+120;
    platforms[5].scaleY=scale;
    platforms[5].scaleX=scale2+0.2;
    platHeights.push(20);
    platWidths.push(280);
    
    platforms.push(new createjs.Bitmap(queue.getResult("platform")));
    platforms[6].y=580;
    platforms[6].x+=200;
    platforms[6].scaleY=scale;
    platforms[6].scaleX=scale2;
    platHeights.push(20);
    platWidths.push(800);
    
    platforms.push(new createjs.Bitmap(queue.getResult("platform")));
    platforms[7].y=580;
    platforms[7].x+=400;
    platforms[7].scaleY=scale;
    platforms[7].scaleX=scale2;
    platHeights.push(20);
    platWidths.push(830);
    
    platforms.push(new createjs.Bitmap(queue.getResult("platform")));
    platforms[8].y=580;
    platforms[8].x+=600;
    platforms[8].scaleY=scale;
    platforms[8].scaleX=scale2;
    platHeights.push(20);
    platWidths.push(800);
    
    door=new createjs.Bitmap(queue.getResult("door"));
    door.y=530;
    door.scaleX=1.6;
    door.x=400-25;
    doorHeight=50;
    doorWidth=50;
    
    doorHP=10;
    
    doorHPBar=new createjs.Bitmap(queue.getResult("HP"));
    doorHPBar.y=510;
    doorHPBar.x=375;
    doorHPBar.scaleY=0.2;
    
    doorTwo=new createjs.Bitmap(queue.getResult("door"));
    doorTwo.y=240;
    doorTwo.x=400-25;
    doorTwo.scaleX=1.6;
    
    doorTwoHP=10;
    
    doorTwoHPBar=new createjs.Bitmap(queue.getResult("HP"));
    doorTwoHPBar.y=220;
    doorTwoHPBar.x=375;
    doorTwoHPBar.scaleY=0.2;
    
    player=new createjs.Sprite(SpaceManSheet, "stand");
    player.y=530;
    player.regY=10;
    playerWidth=30;
    playerHeight=40;
    
    playerForce=0;
    
    SoundOff=new createjs.Bitmap(queue.getResult("SoundOFF"));
    SoundOff.y=550;
    SoundOff.x=740;
    SoundOff.scaleY=0.3;
    SoundOff.scaleX=0.3;
    SoundOff.on("click", function(evt){mute=false; SoundOff.visible=false; SoundOn.visible=true;});
    
    SoundOn=new createjs.Bitmap(queue.getResult("SoundON"));
    SoundOn.y=550;
    SoundOn.x=740;
    SoundOn.scaleY=0.3;
    SoundOn.scaleX=0.3;
    SoundOn.on("click", function(evt){mute=true; SoundOff.visible=true; SoundOn.visible=false;});
    
    stage.addChild(door, doorHPBar, doorTwo, doorTwoHPBar,player, SoundOff, SoundOn);
    for(i=0; i<platforms.length; i++)
    {
        stage.addChild(platforms[i]);
    }
    stage.addChild(levelSign, SoundOff, SoundOn);
    SoundOff.visible=false;
    SoundOn.visible=true;
    
    gameState=TITLE_SCREEN;
    music=createjs.Sound.play("./Assets/VastSpace.ogg", {loop:-1});
    
    stage.update();
}

function main()
{
    setupCanvas();
}

var alreadyPlaying;
function loop()
{   
    stage.update();
    
    switch(gameState)
    {
        case LOADING:
            break;
        case PLAY_GAME:
            levelSign.x=160;
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
            textTime.visible=true;
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
            platforms[6].visible=true;
            platforms[7].visible=true;
            platforms[8].visible=true;
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
            textTime.visible=false;
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
            platforms[6].visible=false;
            platforms[7].visible=false;
            platforms[8].visible=false;
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
            textScore.x=50;
            textScore.y=450;
            textScore.visible=true;
            textTime.visible=false;
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
            platforms[6].visible=false;
            platforms[7].visible=false;
            platforms[8].visible=false;
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
            textTime.text=Math.floor(gameTimer/60) + " : " + Math.round(gameTimer%60);
            textScore.text="Score: " + score;
            break;
        case PLAYING:
            textTime.text=Math.floor(gameTimer/60) + " : " + Math.round(gameTimer%60);
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
        PlayerHandle();
    }
    if(doorHP==0 || doorTwoHP==0)
            gameState=GAME_OVER;
    
    if(mute)
    {
        alreadyPlaying=false;
        music.stop();
    }
    else if(!alreadyPlaying)
    {
        alreadyPlaying=true;
        music.play({loop:-1});
    }
}
createjs.Ticker.addEventListener("tick", loop);
createjs.Ticker.setFPS(FPS);

function HPBarScale()
{
    doorHPBar.scaleX=doorHP/50;
    doorTwoHPBar.scaleX=doorTwoHP/50;
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
    {src:"Title(SIP).jpg", id:"title"},
    {src:"Background(SIP).png", id:"background"},
    {src:"Instructions(SIP)V2.jpg",id:"instructions"},
    {src:"GameOver(SIP)V2.jpg", id:"gameover"},
    {src:"levelsign.png", id:"levelsign"},
    {src:"Buttons(SIP)V2.png", id:"button"},
    {src:"sprites.png", id:"sprites"},
    {src:"Bullet.png", id:"bullet"},
    {src:"Platform(SIP).png", id:"platform"},
    {src:"door.png", id:"door"},
    {src:"HPBar.png", id:"HP"},
    {src:"AlienWalkSheet.png", id:"AW"},
    {src:"Badge.png", id:"Badge"},
    {src:"SpaceManV2.png", id:"SpaceMan"},
    {src:"SoundOff.png", id:"SoundOFF"},
    {src:"SoundOn.png", id:"SoundON"}
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
        images: [queue.getResult("AW")],
        frames: [[0,0,71,83,0,35.4,52.9],[71,0,68,76,0,32.4,49.9],[139,0,62,79,0,28.4,50.9],[0,83,56,83,0,22.4,52.9],[56,83,56,83,0,22.4,52.9],[112,83,64,83,0,28.4,50.9],[176,83,63,81,0,29.4,49.9],[0,166,62,83,0,28.4,50.9],[62,166,53,88,0,21.4,54.9],[115,166,53,89,0,18.4,54.9]],
        animations:{
            walk:{
                frames:[0,1,2,3,4,5,6,7,8,9],
                speed:0.2
            }
    }});
    
    SpaceManSheet=new createjs.SpriteSheet({
        images:[queue.getResult("SpaceMan")],
        frames: [[0,0,50,51,0,-30.5,0],[50,0,50,49,0,-30.5,0],[0,51,52,51,0,-29.5,0],[52,51,50,51,0,-30.5,0],[0,102,48,49,0,-31.5,0],[48,102,50,49,0,-30.5,0],[0,151,48,50,0,-31.5,0],[48,151,50,49,0,-30.5,0],[0,201,52,49,0,-29.5,0],[52,201,52,49,0,-29.5,0]],
        animations: {
            walk:{
                frames:[0,1,2,3,4,5,6,7],
                speed:0.5
            },
            jump:{
                frames:[8]
            },
            stand:{
                frames:[9]   
            }
        }});
    
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
    myTween=createjs.Tween.get(levelSign, {loop:false}).wait(500).to({x:160, y:50, rotation:0},1500, createjs.Ease.bounceOut).wait(2000).to({y:1000, rotation:0}, 1000, createjs.Ease.backIn).call(tweenComplete);
}

function addForce(force)
{
    playerForce+=force;
}

function spawnEnemy()
{
    enemyCount+=1;
    
    var newEnemy=new createjs.Sprite(walkSheet, "walk");
    
    var x=spawnPositionsX[Math.round(Math.random()*1)];
    var y=spawnPositionsY[Math.round(Math.random()*2)];
    
    newEnemy.x=x;
    newEnemy.y=y;
    var dir=Math.random()*2;
    
    if(dir<1)
    {
        enemyDir.push(true);
        newEnemy.scaleX=1;
    }
    else
    {
        enemyDir.push(false);   
        newEnemy.scaleX=-1;
    }
    
     enemies.push(newEnemy);
    
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
            enemies[i].scaleX=1;
        }
        else if(enemies[i].x+20>800)
        {
            enemyDir[i]=!enemyDir[i]; 
            enemies[i].scaleX=-1;
        }
        
        var step=1/((FPS)+300);
        enemies[i].y+=3000*step;
        
        var extraY=5;
        for(j=0; j<6; j++)
        {
            if((platforms[j].y+extraY<enemies[i].y+30 && platforms[j].y+extraY>enemies[i].y) && (platforms[j].x+20<enemies[i].x+playerWidth && platforms[j].x+platWidths[j]>enemies[i].x))
           {
               enemies[i].y=platforms[j].y+extraY-30;
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
            if(shooter[j].x+10<enemies[i].x+20 && shooter[j].x+10>enemies[i].x && shooter[j].y+5<enemies[i].y+50 && shooter[j].y+5>enemies[i].y-50)
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
    
    var newFire=new createjs.Bitmap(queue.getResult("bullet"));
    newFire.x=player.x+(playerWidth+30);
    newFire.y=player.y+(playerHeight/2-20);
    
    if(!direction)
    {
        newFire.rotation=180;
        newFire.y+=25;
    }
    
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
        
        if(shooter[i].x<0-20 || shooter[i].x>800)
        {
            stage.removeChild(shooter[i]);
            shooter.splice(i,1);
            shooterDir.splice(i,1);
            shooterCount--;
        }
    }
}

var alreadyWalking;
function PlayerHandle()
{
    if(gameState==PLAYING)
    {
        if(LeftOn)
        {
            player.x-=20;
            
            if(!alreadyWalking)
            {
                player.gotoAndPlay("walk");
                 alreadyWalking=true;
            }
            var tempX=player.x;
            player.regX=120;
            player.scaleX=-1;
        }
        else if(RightOn)
        {
            player.x+=20;
            
            if(!alreadyWalking)
            {
                player.gotoAndPlay("walk");
                alreadyWalking=true;
            }
            player.regX=0;
            player.scaleX=1;
        }
        else
        {
            player.gotoAndPlay("stand");
            alreadyWalking=false;
        }
        if(UpOn)
        {
            addForce(-1000);
            player.gotoAndPlay("jump");
        }
        if(AOn)
        {
             fire(false);
            player.regX=120;
            player.scaleX=-1;
        }
        if(DOn)
        {
            fire(true);
            player.regX=0;
            player.scaleX=1;
        }
        if(JOn)
            Jamie();
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
                LeftOn=true;
            inputTextCases.text="Input: Left";
            break;
        case KEYCODE_RIGHT:
            if(gameState===PLAYING && movePlayerRight)
                RightOn=true;
            inputTextCases.text="Input: Right";
            break;
        case KEYCODE_UP:
            if(gameState===PLAYING && movePlayerUP)
                UpOn=true;
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
            if(!DOn)
                AOn=true;
            break;
        case KEYCODE_S:
            inputTextCases.text="Input: S";
            break;
        case KEYCODE_D:
            inputTextCases.text="Input: D";
            if(!AOn)
                DOn=true;
            break;
        case KEYCODE_J:
            inputTextCases.text="Input: J";
            JOn=true;
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
            LeftOn=false;
            break;
        case KEYCODE_RIGHT:
            RightOn=false;
            break;
        case KEYCODE_UP:
            UpOn=false
            break;
        case KEYCODE_DOWN:
            break;
        case KEYCODE_A:
            AOn=false;
            break;
        case KEYCODE_D:
            DOn=false;
            break;
        case KEYCODE_J:
            JOn=false;
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
}

function collisionHandle()
{
    movePlayerRight=true;
    movePlayerLeft=true;
    movePlayerUP=true;
    movePlayerDOWN=true;
    
    var extraY=5;
    var offsetX=100;
       
    //Ground
       if((platforms[1].y+extraY<player.y+playerHeight))
       {
            movePlayerDOWN=false; 
           player.y=580+extraY-playerHeight;
       }
       else if(movePlayerDOWN)
       {
            movePlayerDOWN=true;   
       }
       
    
    //plat1
    if((platforms[0].x+platWidths[0]>player.x) && (platforms[0].y+extraY>player.y+playerHeight && platforms[0].y+platHeights[0]<player.y+playerHeight))
       {
            movePlayerRight=false;
       }
       else if(movePlayerRight)
       {
            movePlayerRight=true;   
       }
       
       if((platforms[0].x<player.x+playerWidth) && (platforms[0].y+extraY>player.y+playerHeight && platforms[0].y+platHeights[0]<player.y+playerHeight))
       {
             movePlayerLeft=false;  
       }
       else if(movePlayerLeft)
       {
           movePlayerLeft=true;
       }
       
       if((platforms[0].y+extraY<player.y+playerHeight && platforms[0].y+extraY>player.y) && (platforms[0].x<player.x+playerWidth && platforms[0].x+platWidths[0]>player.x))
       {
           movePlayerDOWN=false;
           player.y=platforms[0].y+extraY-playerHeight;
       }
       else if(movePlayerDOWN)
       {
            movePlayerDOWN=true;   
       }
    
    //plat2
    if((platforms[2].x+platWidths[2]>player.x) && (platforms[2].y+extraY>player.y+playerHeight && platforms[2].y+platHeights[2]<player.y+playerHeight))
       {
            movePlayerRight=false;
       }
       else if(movePlayerRight)
       {
            movePlayerRight=true;   
       }
       
       if((platforms[2].x<player.x+playerWidth) && (platforms[2].y+extraY>player.y+playerHeight && platforms[2].y+platHeights[2]<player.y+playerHeight))
       {
             movePlayerLeft=false;  
       }
       else if(movePlayerLeft)
       {
           movePlayerLeft=true;
       }
       
       if((platforms[2].y+extraY<player.y+playerHeight && platforms[2].y+extraY>player.y) && (platforms[2].x<player.x+playerWidth && platforms[2].x+platWidths[2]>player.x))
       {
           movePlayerDOWN=false;
           player.y=platforms[2].y+extraY-playerHeight;
       }
       else if(movePlayerDOWN)
       {
            movePlayerDOWN=true;   
       }
    
    //plat1
    if((platforms[3].x+platWidths[3]>player.x) && (platforms[3].y+extraY>player.y+playerHeight && platforms[3].y+platHeights[3]<player.y+playerHeight))
       {
            movePlayerRight=false;
       }
       else if(movePlayerRight)
       {
            movePlayerRight=true;   
       }
       
       if((platforms[3].x<player.x+playerWidth) && (platforms[3].y+extraY>player.y+playerHeight && platforms[3].y+platHeights[3]<player.y+playerHeight))
       {
             movePlayerLeft=false;  
       }
       else if(movePlayerLeft)
       {
           movePlayerLeft=true;
       }
       
       if((platforms[3].y+extraY<player.y+playerHeight && platforms[3].y+extraY>player.y) && (platforms[3].x<player.x+playerWidth && platforms[3].x+platWidths[3]>player.x))
       {
           movePlayerDOWN=false;
           player.y=platforms[3].y+extraY-playerHeight;
       }
       else if(movePlayerDOWN)
       {
            movePlayerDOWN=true;   
       }
    
    //plat1
    if((platforms[4].x+platWidths[4]>player.x) && (platforms[4].y+extraY>player.y+playerHeight && platforms[4].y+platHeights[4]<player.y+playerHeight))
       {
            movePlayerRight=false;
       }
       else if(movePlayerRight)
       {
            movePlayerRight=true;   
       }
       
       if((platforms[4].x<player.x+playerWidth) && (platforms[4].y+extraY>player.y+playerHeight && platforms[4].y+platHeights[4]<player.y+playerHeight))
       {
             movePlayerLeft=false;  
       }
       else if(movePlayerLeft)
       {
           movePlayerLeft=true;
       }
       
       if((platforms[4].y+extraY<player.y+playerHeight && platforms[4].y+extraY>player.y) && (platforms[4].x<player.x+playerWidth && platforms[4].x+platWidths[4]>player.x))
       {
           movePlayerDOWN=false;
           player.y=platforms[4].y+extraY-playerHeight;
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
       
       if((platforms[5].x<player.x+playerWidth) && (platforms[5].y+extraY>player.y+playerHeight && platforms[5].y+platHeights[5]<player.y+playerHeight))
       {
             movePlayerLeft=false;  
       }
       else if(movePlayerLeft)
       {
           movePlayerLeft=true;
       }
       
       if((platforms[5].y+extraY<player.y+playerHeight && platforms[5].y+extraY>player.y) && (platforms[5].x<player.x+playerWidth && platforms[5].x+platWidths[5]>player.x))
       {
           movePlayerDOWN=false;
           player.y=platforms[5].y+extraY-playerHeight;
       }
       else if(movePlayerDOWN)
       {
            movePlayerDOWN=true;   
       }
    
    if(player.x<-10)
    {
        player.x=-20;   
    }
    if(player.x+playerWidth>740)
    {
        player.x=740-playerWidth;
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