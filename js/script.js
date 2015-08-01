var stage, controller;

function init() {
    controller = new Controller;

    controller.start_game();

    resize();
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
