var slither,dots,dotsGroup,enemyGroup;
var xpos,ypos;
var score=0;
var gameState="play";
var gameOver;


function setup() {
  createCanvas(1800,1800);
  
  slither=createSprite(400, 400, 50, 10);
  slither.shapeColor="purple";
dotsGroup=new Group();
enemyGroup=new Group();
for (var i=0;i<250;i++){
  dots=createSprite(random(-550,1800),random(-550,1800),10,10);
  dots.shapeColor="red";
  dotsGroup.add(dots);
}

}

function draw() {
 background(0);  

 //move slither with mouse
 //slither.x=mouseX;
 //slither.y=mouseY;
if(gameState==="play"){
  if(keyIsDown(LEFT_ARROW)){
    slither.x-=5;
 }
 if(keyIsDown(RIGHT_ARROW)){
   slither.x+=5;
 }
 if(keyIsDown(UP_ARROW)){
   slither.y-=5;
 }
 if(keyIsDown(DOWN_ARROW)){
  slither.y+=5;
 }
  //set camera on slither
 camera.position.x=slither.x;
 camera.position.y=slither.y;
  
  for(var i=0;i<dotsGroup.length;i++){
    if(dotsGroup.get(i).isTouching(slither)){
      dotsGroup.get(i).destroy();
      score++;
    }
  }
 
  spawnSlither();

  if(enemyGroup.isTouching(slither)){
    gameState="end"
  }
}

fill(255)
stroke(255)
textSize(28);
 text("SCORE:"+score,20,10)
  drawSprites();

  if(gameState==="end"){
    dotsGroup.destroyEach();
    enemyGroup.destroyEach();
    slither.destroy();
    textSize(100);
    fill("white");
   text("GAME OVER",800,800)
   console.log("num")
  }
}

function spawnSlither(){
  if(frameCount===0||frameCount%80===0){
    var enemy=createSprite(100,100,30,30);
    enemy.shapeColor="green";
    var num=Math.round(random(1,4));
   
    switch(num){
      case 1:enemy.x=0;
      enemy.velocityX=3;
      enemy.velocityY=Math.round(random(-2,5));
      enemy.y=random(10,1790);
      break;
      case 2:enemy.x=400;
      enemy.velocityX=-3;
      enemy.velocityY=Math.round(random(-2,5));
      enemy.y=random(10,1790);
      break;
      case 3:enemy.y=0;
      enemy.velocityY=3;
      enemy.velocityX=Math.round(random(-2,5));
      enemy.x=random(10,1790);
      break;
      case 4:enemy.y=400;
      enemy.velocityY=-3;
      enemy.velocityX=Math.round(random(-2,5));
      enemy.x=random(10,1790);
      break;
      default:break;
    }
enemyGroup.add(enemy);
enemy.lifetime=600;
  }
}
