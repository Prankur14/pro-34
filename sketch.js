var balloon,balloonImage1,balloonImage2;
var database;
var pos;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(465, 250,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.7;
  database.ref('position').on("value", valueWriter)
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    dataUpdater(-15, 0)
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    dataUpdater(+15, 0)
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)&& balloon.y>10){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    dataUpdater(0, -10)
    if(balloon.y>250 && balloon.y<450 && balloon.scale>0.009){
      balloon.scale-= 0.004;
    }
    if(balloon.y>20&&balloon.y<250 && balloon.scale>0.009){
      balloon.scale-= 0.01
    }
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    dataUpdater(0, 10)
   if(balloon.scale<0.7){ balloon.scale+=0.01;}
    //write code to move air balloon in down direction
  }
  console.log(balloon.scale)

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
}
function dataUpdater(x1, y1){
database.ref('position').set({
  'x': pos.x+x1,
  'y': pos.y+y1
})
}


function valueWriter(data){
pos = data.val();
// console.log(pos.x);
// console.log(pos.y);
balloon.x = pos.x;
balloon.y = pos.y;
}

