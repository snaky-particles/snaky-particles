var Controller = function(){
	this.grid_size = {x: 20, y: 20};
	this.initial_length = 3;
	this.time_step = 400;
	this.collectibles = [];
    this.views = [];
	this.snake = new Snake(this.initial_length);
	var pos0 = {x: -1, y: -1};
	
	var higgs = new Particle(pos0);
	higgs.mass = 125;
	higgs.type = "Higgs"
	var electron = new Particle(pos0);
	electron.mass = .0005;
	electron.type = "electron";

	this.possible_collectibles = [
		{collectible: higgs, probability: 3e-3},
		{collectible: electron, probability: .05}
		]
	this.stage = new createjs.Stage("demoCanvas");
}

Controller.prototype.update_views = function(){
    for(view in this.views){
        this.views[view].update();
    }
}

this.prototype.spawn_collectibles = function(){
	var collectible = Object.create(get_random_element_with_probabilities(this.possible_collectibles));
	if (!collectible) return;
	var rnd_pos = this.get_random_position();
	if (this.is_position_free(rnd_pos)) {
		collectible.position = rnd_pos;
	}
}

Controller.prototype.start_game = function(){
	// this.session = new Session();
    var c = this;
	createjs.Ticker.on("tick", function(e){c.tick(e);});
	createjs.Ticker.setFPS(20);
	this.bind_events();
	this.time = 0;

    for(phModel in controller.snake.physicists){
        var model = controller.snake.physicists[phModel];
        var phView = new PhysicistView(model);
        this.add_view(phView);
    }
}

Controller.prototype.add_view = function(view){
    this.stage.addChild(view);
    this.views.push(view);
}

Controller.prototype.bind_events = function(){
    var c = this;
	window.onkeydown = function(e){
		var direction = null;
		switch (e.keyCode){
			case 37:
				direction = {x: -1, y: 0};
				break;
			case 38:
				direction = {x: 0, y: -1};
				break;
			case 39:
				direction = {x: 1, y: 0};
				break;
			case 40:
				direction = {x: 0, y: 1};
				break;

		}
		if (direction){
			c.turn_snake(direction);
		}
	}
}

Controller.prototype.turn_snake = function(direction){
	this.snake.physicists[0].direction = direction;
}


Controller.prototype.tick = function(event){
	if(event.time - this.time > this.time_step){
		this.time = event.time;
        var next_cell = this.get_next_cell_position();
		this.snake.move(next_cell);
		this.spawn_collectibles();
        this.update_views();
	}
	this.stage.update(event);
}

Controller.prototype.get_next_cell_position = function(){
	var ph0 = this.snake.physicists[0];
	var next_cell = Object.create(ph0.position);
	next_cell.x += ph0.direction.x;
	next_cell.y += ph0.direction.y;
	if (next_cell.x < 0) next_cell.x = this.grid_size.x - 1;
	if (next_cell.y < 0) next_cell.y = this.grid_size.y - 1;
	if (next_cell.x == this.grid_size.x) next_cell.x = 0;
	if (next_cell.y == this.grid_size.y) next_cell.y = 0;
	return next_cell;
}

Controller.prototype.get_random_position = function(){
	return {x: Math.floor(Math.random()*this.grid_size.x),
			y: Math.floor(Math.random()*this.grid_size.y)
		};
}

var get_random_element_with_probabilities(array){
	var previous_probability = 0;
	var rnd = Math.random();
	for (ind in array){
		var probability = array[ind].probability;
		if (rnd  < probability + previous_probability) return array[ind];
		previous_probability += probability;
	}
	return null;
}
