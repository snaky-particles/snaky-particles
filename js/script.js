var stage, controller;

function init() {
    // Do not use this for now...
    // createjs.MotionGuidePlugin.install();

    controller = new Controller;

    resize();

    controller.start_game();

    var p2 = new Particle({x: 3, y: 3});
    p2.start_time = createjs.Ticker.getTime();
    p2.target = {
        time: p2.start_time + 1000,
        x: 10,
        y: 7
    }
    var p2v = new ParticleView(p2);
    controller.add_view(p2v);
}

function resize() {
    var height = window.innerHeight;
    var width = window.innerWidth;
    window.cell_size = height > width ?
        height / controller.grid_size.y :
        width / controller.grid_size.x;
    controller.stage.canvas.width = width;
    controller.stage.canvas.height = height;
}
