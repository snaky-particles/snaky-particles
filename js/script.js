var stage, controller;

function init() {
    controller = new Controller;

    resize();

    controller.start_game();
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
