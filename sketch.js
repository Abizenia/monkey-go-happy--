
var monkey , monkey_running,monkey_standing,monkey_standingimage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var survivalscore = 0;
var ground;
var lifescore,life2score;
var score = 0;
var PLAY=1;
var END=0;
var MIDDLE=2
var gameState=PLAY;
var life=2;
var lifeimage,life2image
var gameover,gameoverimg;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundimg= loadImage("jungle.jpg");
  lifeimage= loadImage("images.jpg");
  life2image= loadImage("images-1.jpg");
  gameoverimg= loadImage("download.png")

}



function setup() {
    createCanvas(600,450);
    ground = createSprite (10,400,900,10);
    ground.x=ground.width/2;
    ground.visible=false;
  
    monkey = createSprite(50,400,10,10);
    monkey.addAnimation("monkey",monkey_running);
    monkey.scale=0.12;
    monkey.collide(ground);
    monkey.debug=false;
    monkey.setCollider("circle",0,0,300)
   
    obstacleGroup = new Group();
    FoodGroup = new Group();
 
  /* lifescore= createSprite(550,30,20,20);
   lifescore.addImage(lifeimage);
   lifescore.scale=0.3;
   
   life2score= createSprite(480,30,20,20);
   life2score.addImage(life2image);
   life2score.scale=0.3;
  */
}
   

function draw() {
  
  background(backgroun img);
  console.log(monkey.y)
  textSize(20);
  fill("black")
  text("score:"+score,340,60);
  
    if (gameState===PLAY){
       if(keyDown("space")&&monkey.y>=352.02){
          monkey.velocityY=-20;
       }
      if(keyDown("space")&&monkey.y>=348.02){
          monkey.velocityY=-20;
       }
      /*  if(keyDown("space") && monkey.y===352.02){
          monkey.velocityY=-20;
         }
         
      if(keyDown("space") && monkey.y>=373.51){
        monkey.velocityY=-20;
      }
      if(keyDown("space") && monkey.y>=370.44){
        monkey.velocityY=-20;
      }*/
      monkey.velocityY=monkey.velocityY + 0.8;
       if(monkey.isTouching(FoodGroup)){
        monkey.scale=monkey.scale + 0.01 ;
       score = score+1;
       FoodGroup.destroyEach();
   }
   
      
      if(monkey.isTouching(obstacleGroup)){
        obstacleGroup.setVelocityXEach(0,0);
        FoodGroup.setVelocityXEach(0,0);
        monkey.scale=monkey.scale/2;
        FoodGroup.destroyEach()
       obstacleGroup.destroyEach();
        gameState=MIDDLE;
      //  lifescore.visible=false;
        //obstacle.debug=true
        
     }

      if(monkey.isTouching(obstacleGroup)){
        //life2score.visible=false;
        obstacleGroup.setVelocityXEach(0,0);
        FoodGroup.setVelocityXEach(0,0);
        gameState=END;
      }
      
        
        
      
    if(frameCount % 100 === 0){
       spawnfruit();
    }
    if(frameCount % 150 === 0){
    spawnobstacle();
  }
    }
  
  
  if(gameState===MIDDLE){
    if(keyDown("space")&&monkey.y>=300.02){
          monkey.velocityY=-20;
    }
          monkey.velocityY=monkey.velocityY + 0.8;

       if(frameCount % 100 === 0){
       spawnfruit();
    }
    if(frameCount % 70 === 0){
    spawnobstacle();
  }
   if(monkey.isTouching(obstacleGroup)){
        obstacleGroup.setVelocityXEach(0,0);
        FoodGroup.setVelocityXEach(0,0);
        FoodGroup.destroyEach()
       obstacleGroup.destroyEach();
        gameState=END;
}
    if(monkey.isTouching(FoodGroup)){
        monkey.scale=monkey.scale + 0.01 ;
       score = score+1;
       FoodGroup.destroyEach();
   }
   
    }
  if(gameState===END){
     FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    monkey.velocityY=0
    gameover=createSprite(320,200,20,20);
    gameover.addImage(gameoverimg);
    gameover.scale=0.7;
  }
  
 
  
    monkey.collide(ground);

    
  drawSprites();

}
function spawnfruit(){
  
   banana = createSprite(600,Math.round(random(150,300)),10,10);
   banana.addImage("banana",bananaImage);
   banana.scale=0.1;
   banana.velocityX=-(5 +2* score/100);
   banana.lifetime=150
   FoodGroup.add(banana);
}

function spawnobstacle(){
 
  obstacle = createSprite(600,355,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.velocityX=-(5 + score/100);
  obstacle.lifetime=150;
  
  obstacleGroup.add(obstacle);
  
}



