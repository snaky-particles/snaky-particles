var stage, controller;

var minimum_cell_size = 30;
var maximum_grid_size = 20;

function init() {
    // Do not use this for now...
    // createjs.MotionGuidePlugin.install();
    controller = new Controller;

    resize();

    controller.start_game();

    /*var p2 = new Particle({x: 3, y: 3});
    p2.start_time = createjs.Ticker.getTime();
    p2.target = {
        time: p2.start_time + 1000,
        x: 10,
        y: 7
    }
    var p2v = new ParticleView(p2);
    controller.add_view(p2v);*/
}

$(function(){
  // Bind the swipeHandler callback function to the swipe event on div.box
  $( "#demoCanvas" ).on( "swipe", swipeHandler );
  $.event.special.swipe.horizontalDistanceThreshold = 1;
  $.event.special.swipe.verticalDistanceThreshold = 1000;
  $.mobile.loader.prototype.options.disabled = true;
 
  // Callback function references the event target and adds the 'swipe' class to it
  function swipeHandler( event ){
    // $( event.target ).addClass( "swipe" );
    var direction = {x: 0, y: 0};
    var start = event.swipestart.coords;
    var stop = event.swipestop.coords;
    var diff = {x: stop[0] - start[0], y: stop[1] - start[1]};
    direction.x = Math.abs(diff.x) > Math.abs(diff.y) ? diff.x > 0 ? 1 : -1 : 0;
    direction.y = Math.abs(diff.y) > Math.abs(diff.x) ? diff.y > 0 ? 1 : -1 : 0;
    console.log(direction);
    controller.turn_snake(direction);
  }
});

function resize() {
    var height = window.innerHeight - 50;
    var width = window.innerWidth;
    window.cell_size = 50;
    controller.grid_size.y = Math.floor(height / window.cell_size);
    controller.grid_size.x = Math.floor(width / window.cell_size);
    // if((height / minimum_cell_size) > maximum_grid_size){
    //     cs = height / maximum_grid_size;
    //     controller.grid_size.y = maximum_grid_size;
    // } else {
    //     controller.grid_size.y = Math.floor(height / minimum_cell_size);
    //     cs = minimum_cell_size;
    // }
    // if((width / minimum_cell_size) > maximum_grid_size){
    //     window.cell_size = width / maximum_grid_size ;
    //     controller.grid_size.x = maximum_grid_size;
    // } else {
    //     controller.grid_size.x = Math.floor(width / minimum_cell_size);
    //     window.cell_size = minimum_cell_size;
    // }
    controller.stage.canvas.width = width;
    controller.stage.canvas.height = height;
}
