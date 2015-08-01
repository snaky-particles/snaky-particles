var Controller = function(){
	this.grid_size = {x: 20, y: 20};
	this.initial_length = 3;
	this.time_step = 400;
	this.collectibles = [];
	this.snake = new Snake(this.initial_length);
}

Controller.prototype.start_game = function(){
	// this.session = new Session();
	this.stage = new createjs.Stage("demoCanvas");
	createjs.Ticker.on("tick", this.tick);
	createjs.Ticker.setFPS(20);
	this.bind_events();
	this.time = 0;
}

Controller.prototype.bind_events = function(){
	window.onkeydown = function(e){
		var direction = null;
		switch (e.keyCode){
			case 37:
				direction = {x: -1, y: 0};
				break;
			case 38:
				direction = {x: 0, y: 1};
				break;
			case 39:
				direction = {x: 1, y: 0};
				break;
			case 40:
				direction = {x: 0, y: -1};
				break;

		}
		if (direction){
			this.turn_snake(direction);
		}
	}
}

Controller.prototype.turn_snake = function(direction){
	this.snake.physicsts[0].direction = direction;
}


Controller.prototype.tick = function(event){
	if(event.time - this.time > this.time_step){
		this.time = event.time;
		this.snake.move(next_cell);
	}
	stage.update(event);
}

Controller.prototype.get_next_cell_position = function(){
	var ph0 = this.snake.physicsts[0];
	var next_cell = ph0.position;
	next_cell.x += ph0.direction.x;
	next_cell.y += ph0.direction.y;
	if (next_cell.x < 0) next_cell.x = grid_size.x - 1;
	if (next_cell.y < 0) next_cell.y = grid_size.y - 1;
	if (next_cell.x = grid_size.x) next_cell.x = 0;
	if (next_cell.y = grid_size.y) next_cell.y = 0;
	return next_cell;
}
