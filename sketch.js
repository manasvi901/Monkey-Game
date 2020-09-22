var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running;
var invisibleGround;

var obstaclesGroup, obstacle1, bananaGroup;

var ground;

var banana;

var score;
var bananaTouched;

function preload(){
  trex_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  banana = loadImage("banana.png");
  
  obstacle1 = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(600, 600);

  var message = "This is a message";
 console.log(message)
  
  trex = createSprite(100,300,20,50);
  trex.addAnimation("running", trex_running);

  trex.scale = 0.2 ;
  
  ground = createSprite(200,400,2000,10);
  ground.velocityX = -2;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(200,400,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  trex.debug = true
  
  score = 0;
  bananaTouched = 0;
}

function draw() {
  
  background(180);
  //displaying score
  text("Survival Time: "+ score, 350 ,50);
  text("Banana Touched: "+bananaTouched,350,80);
  
  if(gameState === PLAY){
    
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn obstacles on the ground
    spawnObstacles();
    
    spawnBanana();
    
    if (bananaGroup.isTouching(trex)){ 
   bananaTouched = +1;
    }
    
    if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
        gameState = END;
    }
  }
   else if (gameState === END) {
  
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);

  drawSprites();
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,350 ,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacle1 );
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2  ;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}


function spawnBanana(){
 if (frameCount % 60=== 0){
   var banana0 = createSprite(600,150   ,10,40);
   banana0.velocityX = -(6 + score/100);
   banana0.addImage(banana);
    
    //assign scale and lifetime to the obstacle           
    banana0.scale = 0.1 ;
    banana0.lifetime = 300;
   
   //add each obstacle to the group
    bananaGroup.add(banana0);
 }
}

