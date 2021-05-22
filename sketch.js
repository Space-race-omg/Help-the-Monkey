var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 200, road
var gamestate = "Play"

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  FoodGroup = new Group()
  obstacleGroup = new Group()
 
}



function setup() {
  createCanvas(450,450)
  
  monkey = createSprite(40,420,10,10);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1
  
  road = createSprite(200,430,600,12.5)
}


function draw() {
  background(400)
  
  text("Survival Time : "+score,190,40)
  
  if(gamestate === "Play")
  {
  
  score = score - Math.round(getFrameRate()/60);
  
  if(keyDown("space") && monkey.y > 390)
  {
    monkey.velocityY = monkey.velocityY - 9
  }
  
    monkey.velocityY = monkey.velocityY + 0.2
  
  monkey.collide(road)
  
  spawnBananas()
  spawnobstacles()
  
  if(monkey.isTouching(FoodGroup))
    {
       score = score + 50
       banana.destroy(monkey)
    }
  
  if(monkey.isTouching(obstacleGroup))
    {
       score = 0
    }
  
  if(score === 0)
    {       
       gamestate = "End"
    }
  }
  
  if(gamestate === "End")
    {
      FoodGroup.setVelocityXEach(0);
       obstacleGroup.setVelocityXEach(0);
      
      FoodGroup.setLifetimeEach(-1)
      obstacleGroup.setLifetimeEach(-1)
      
       monkey.destroy()
    }
  
  drawSprites()
}

function spawnBananas()
{
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) 
  {
    banana = createSprite(450,120,40,10);
    banana.y = Math.round(random(190,300));
    banana.addImage(bananaImage);
    banana.scale = 0.09
    banana.velocityX = -3;
    
    banana.lifetime = 150
    
    FoodGroup.add(banana)
  }
}

function spawnobstacles()
{
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) 
  {
    obstacle = createSprite(450,393,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2
    obstacle.velocityX = -3;
    
    obstacle.lifetime = 160
    
    obstacleGroup.add(obstacle)
  }
}




