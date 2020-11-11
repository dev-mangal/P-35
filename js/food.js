class Food{
    constructor(){
        this.foodstock=0;
        this.lastfed;
        this.image=loadImage("images/Milk.png");
    }
    deductfood(){
        if(this.foodstock>0){
         this.foodstock-=1;  
        }
    }
    updatefood(stock){
        this.foodstock=stock;
    }
    updatetime(time){
        this.lastfed=time;
    }
    display(){
        var x=50;
        var y=100;
        imageMode(CENTER);
        
        if(this.foodstock>0){
            for(var i=0;i<this.foodstock;i++){
                if(i%10===0){
                    x=50;
                    y+=50;
                }
                image(this.image,x,y+30,30,30);
                x+=30;
            }
        }
    }

    bedroom(){
        background(bedroom);  
    }
      
    garden(){
        background(garden,350,350);  
    } 

    washroom(){
        background(washroom); 
    }
    livingroom(){
        background(livingroom); 
    }
}