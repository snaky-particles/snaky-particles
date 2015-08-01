var stage;

function init() {
    stage = new createjs.Stage("demoCanvas");

    var dummyModel = {position: {x: 10, y: 20}};
    var p = new PhysicistView(dummyModel);
    stage.addChild(p);

    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setFPS(60);

    var time = 0;
    
    function tick(event) {
        time = event.time - time > 400 ? event.time : time;
    
        // time based
        if(event.time == time){
            dummyModel.position.x += 20;        
            p.update();
            stage.update(event);
        }
    }

    resize();
}

function resize() {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
}

function 
