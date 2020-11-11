//Create variables here
var dog,dogimg,dogimg2,database,foodstock,bedroom,garden,livingroom,washroom,food,foodobj; 
var feed,addFood,fedTime;
var gameState,readState,currentTime;
function preload()
{
  //load images here
  dogimg=loadImage("images/Dog.png");
  dogimg2=loadImage("images/happy dog.png");
  bedroom=loadImage("images/Bed Room.png");
  garden=loadImage("images/Garden.png");
  livingroom=loadImage("images/Living Room.png");
  washroom=loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(700, 700);
  imageMode(CENTER);
  database=firebase.database();
  dog=createSprite(600,350);
  dog.addImage(dogimg);
  dog.scale=0.2;
  foodobj=new Food();

  feed=createButton('FEED');
  feed.position(650,100);
  feed.mousePressed(feedDog);

  addfood=createButton('ADD FOOD');
  addfood.position(750,100);
  addfood.mousePressed(addFood);

  foodstock=database.ref('food');
  foodstock.on("value",function(data){
    food=data.val();
    foodobj.updatefood(food);
  },showErr);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
}


function draw() {  
  background("yellow");
  fill("white");
  textSize(20);
  text("Food Remaining:"+food,280,150);
  text("PRESS THE BUTTON TO FEED BRUNO",200,20);
  
  foodobj.display();

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    foodobj.lastfed = data.val();
  })

  currentTime = hour();
  if(currentTime===(foodobj.lastfed+1)){
    console.log("garden");
    update("Playing");
    foodobj.garden();
  }
  else if(currentTime===(foodobj.lastfed+2)){
    update("Bathing");
    foodobj.washroom();
  }
  else if(currentTime===(foodobj.lastfed+3)){
    update("livingroom");
    foodobj.livingroom();
  }
  else if(currentTime===(foodobj.lastfed+4)){
    update("sleeping");
    foodobj.bedroom();
  }
  else{
    update("hungry");
    dog.addImage(dogimg);
  }

  if(foodobj.lastfed>=12)
    text("Last feed time : "+ foodobj.lastfed%12 + " PM",300,650);
  else if(foodobj.lastfed == 0)
    text("Last feed time : 12 AM");
  else
    text("Last feed time : "+ foodobj.lastfed + " AM",300,650);
  
  if(gameState!=="hungry"){
    feed.hide();
    addfood.hide();
    dog.visible=false;
  }
  else{
    feed.show();
    addfood.show();
    dog.visible=true;
  }

  drawSprites();
  
  
}

function feedDog(){
  
  dog.addImage(dogimg2);

  foodobj.updatefood(foodobj.foodstock-1);
  database.ref('/').update({
    food:foodobj.foodstock,
    feedTime : hour()
  });

}

function update(state){
  database.ref('/').update({
    gameState : state
  });
}

function addFood(){
  foodobj.updatefood(foodobj.foodstock+1);
  database.ref('/').update({
    food:foodobj.foodstock
  })
}

function showErr(){
  console.log("error");
}