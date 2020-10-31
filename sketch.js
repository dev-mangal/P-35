//Create variables here
var dog,dogimg,dogimg2,database,foodstock,food,foodobj; 
var feed,addFood,fedTime;;
function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png");
  dogimg2=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(700, 700);
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

  if(foodobj.lastfed>=12)
    text("Last feed time : "+ foodobj.lastfed%12 + " PM",300,650);
  else if(foodobj.lastfed == 0)
    text("Last feed time : 12 AM");
  else
    text("Last feed time : "+ foodobj.lastfed + " AM",300,650);
  
  
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

function addFood(){
  foodobj.updatefood(foodobj.foodstock+1);
  database.ref('/').update({
    food:foodobj.foodstock
  })
}