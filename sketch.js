//write code here
var PLAY = 1
var END = 0

var gameState = PLAY
var mario, mario_running, mario_collided
var ground, invisibleground, groundImg
var obstaclesGroup, obstacles1, obstacles2, obstacles3, obstacles4, obstacles5
var score = 0
var mario1
var obstacle1img,obstacle2img,obstacle3img,obstacle4img,obstacle5img
var gameOver,gameOverImg,restart,restartImg;
var invisibleGround;
var bgImg

function preload() {
    mario_running = loadAnimation("./mario.png")
    mario1=loadImage("./mario.png");
    mario_collided = loadAnimation("./mario_colided.png")
    groundImg = loadImage("./ground.png")
    obstacle1img = loadImage("./obstacle1.png")
    obstacle2img = loadImage("./obstacle2.jpg")
    obstacle3img = loadImage("./obstacle3.png")
    obstacle4img = loadImage("./obstacle4.png")
    obstacle5img = loadImage("./obstacle5.png")
    backgroundImg=loadImage("./background.png")
    bananaImage = loadImage("./banana.png");
    gameOverImg=loadImage("./gameOver.png");
    restartImg=loadImage("./restart.png");
    sunImg=loadImage("./sun.png");
}

function setup() {
    createCanvas(1000, 600)
    mario=createSprite(50,400,20,50);
    mario.addAnimation("mario",mario_running);
    mario.scale=0.5;
    mario.addAnimation("collided", mario_collided)

    ground=createSprite(400,height-1,800,10);
    ground.addImage(groundImg);
    
    invisibleGround=createSprite(100,630,1000,10);
    invisibleGround.visible=false;
    
    sun=createSprite(700,30,10,10);
    sun.addImage(sunImg);
    sun.scale=0.1;
    
    gameOver = createSprite(500,400,50, 50);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(500,500,50,50);
    restart.addImage(restartImg);
    restart.scale=0.1;
    console.log(mario);
    console.log("mario image loaded !");

    
    obstaclesGroup = createGroup()
    FoodGroup=createGroup();

    score = 0


    mario.setCollider("circle",0,0,300)


}


function draw() {
    background(backgroundImg)
    stroke("black");
  textSize(20);  
  fill("blue");
  text("Survival Time: "+score,110,100);
  
  if(gameState===PLAY){
    text("Get bonus 100 points for banana",50,50);
    
    gameOver.visible=false;
    restart.visible=false;
    
   score=score + Math.round(frameCount/200); 
    
    ground.velocityX=-(3 + score/100);
    
    
  if(ground.x<0){
   ground.x=ground.width/2; 
  }
    
    if(keyDown("space")||keyDown("UP_ARROW")||keyDown("RIGHT_ARROW")&&mario.y>500){
   mario.velocityY=-8; 
   mario.velocityX= +1;
  }
    
   
    mario.velocityY=mario.velocityY+0.3;
    
   obstacles1()
   obstacles2()
   obstacles3()
   obstacles4()
   obstacles5()
   food();

   
   if(FoodGroup.isTouching(mario)){
    FoodGroup.destroyEach();
    score=score+100;  
  }
  
    if(obstaclesGroup.isTouching(mario)){
      gameState=END;

   }  
  
}else if(gameState===END){
  
 mario.changeAnimation("collided",mario_collided);
  
  gameOver.visible=true;
  restart.visible=true;
  
 ground.velocityX=0;
 mario.velocityX=0; 
 mario.velocityY=0;
  
 obstaclesGroup.setVelocityXEach(0);
 FoodGroup.setVelocityXEach(0);
  
  obstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);

  
  
  if(mousePressedOver(restart)){
   reset(); 
  }
}
  
mario.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState=PLAY; 
 score=0;
 obstaclesGroup.destroyEach();
 FoodGroup.destroyEach();

 
   mario.changeAnimation("mario",mario_running)
  frameCount=0;
  
  
} 

function food(){
    if(frameCount%80===0){
      banana=createSprite(390,300,50,50);
      banana.y=Math.round(random(200,250));
      banana.addImage(bananaImage);
      banana.scale=0.15;
      banana.velocityX=-(3 + score/300);
      banana.lifetime=100;
      
      mario.depth=banana.depth;
      mario.depth=mario.depth+1;
      
      
      FoodGroup.add(banana);
      
    }
   }
function obstacles1() {
    if(frameCount%320===0){
        obstacle1=createSprite(370,300,20,20);
        obstacle1.addImage(obstacle1img);
        obstacles1.y=Math.round(random(10,220))
        //obstacle1.scale=0.15;
        obstacle1.velocityX=-(3 + score/100);
        obstacle1.lifetime=100;
         
         mario.depth=obstacle1.depth;
         
         
         obstaclesGroup.add(obstacle1);
         
         obstacle1.setCollider("circle",0,0,200)
        // obstacle.debug=true;
    }

}

function obstacles2() {
    if(frameCount%100===0){
        obstacle2=createSprite(370,300,20,20);
        obstacle2.addImage(obstacle2img);
        obstacle2.scale=0.8;
        obstacle2.velocityX=-(3 + score/100);
        obstacle2.lifetime=100;
         
         mario.depth=obstacle2.depth;
         
         
         obstaclesGroup.add(obstacle2);
         
         obstacle2.setCollider("circle",0,0,200)
        // obstacle.debug=true;
    }

}
function obstacles3() {
    if(frameCount%200===0){
        obstacle3=createSprite(370,300,20,20);
        obstacle3.addImage(obstacle3img);
       // obstacle3.scale=0.15;
        obstacle3.velocityX=-(3 + score/100);
        obstacle3.lifetime=100;
         
         mario.depth=obstacle3.depth;
         
         
         obstaclesGroup.add(obstacle3);
         
         obstacle3.setCollider("circle",0,0,200)
        // obstacle.debug=true;
    }

}
function obstacles4() {
    if(frameCount%80===0){
        obstacle4=createSprite(370,300,20,20);
        obstacle4.addImage(obstacle4img);
        //obstacle4.scale=0.15;
        obstacle4.velocityX=-(3 + score/100);
        obstacle4.lifetime=100;
         
         mario.depth=obstacle4.depth;
         
         
         obstaclesGroup.add(obstacle4);
         
         obstacle4.setCollider("circle",0,0,200)
        // obstacle.debug=true;
    }

}
function obstacles5() {
    if(frameCount%280===0){
        obstacle5=createSprite(370,300,20,20);
        obstacle5.addImage(obstacle5img);
       // obstacle5.scale=0.15;
        obstacle5.velocityX=-(3 + score/100);
        obstacle5.lifetime=100;
         
         mario.depth=obstacle5.depth;
         
         
         obstaclesGroup.add(obstacle5);
         
         obstacle5.setCollider("circle",0,0,200)
        // obstacle.debug=true;

    }

}
