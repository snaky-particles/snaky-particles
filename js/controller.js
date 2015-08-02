var Controller = function(){
	this.grid_size = {x: 20, y: 20};
	this.initial_length = 3;
	this.time_step = 400;
    this.maximum_spawns = 2;
	this.collectibles = [];
	this.views = [];
	this.snake = new Snake(this.initial_length);
	this.canTurn = true;
	this.counter = 0;
	var pos0 = {x: -1, y: -1};
    this.score = 0;
	
    createjs.DisplayObject.suppressCrossDomainErrors = true;

	var higgs = new Particle(pos0);
	higgs.mass = 125;
	higgs.type = "Higgs"
	var electron = new Particle(pos0);
	electron.mass = .0005;
	electron.type = "electron";
    electron.decays = null;
	higgs.draw_properties = {
		colors: ["hsl(120, 100%, 50%)", "hsl(120, 40%, 50%)"],
		ratios: [0, 1],
		inner_radius: .03,
		outer_radius: .25,
		inner_center: {x: .07, y: .07},
		outer_center: {x: 0, y: 0}
	};

	this.possible_collectibles = [
		{collectible: higgs, probability: .5},
		{collectible: electron, probability: .5}
		]
	this.stage = new createjs.Stage("demoCanvas");
}

Controller.prototype.update_views = function(){
    for(var view in this.views){
        this.views[view].update();
    }
}

Controller.prototype.spawn_collectibles = function(){
	var collectible = get_random_element_with_probabilities(this.possible_collectibles);
	if (!collectible) return;
	collectible = Object.create(collectible.collectible);
	var rnd_pos = this.get_random_position();
	if (!this.is_position_occupied(rnd_pos)) {
        collectible.position = rnd_pos;
        this.add_collectible(collectible);
    }
}

Controller.prototype.add_collectible = function(collectible){
    if(collectible.halflife_time > 0){
        collectible.decay_time = createjs.Ticker.getTime() + collectible.halflife_time;
    }
    this.collectibles.push(collectible);
    this.add_view(new ParticleView(collectible));
}

Controller.prototype.add_physicist = function(){
	//var new_physicist = Object.create(this.snake.physicists[this.snake.physicists.length - 1]);
	var	new_physicist = new Physicist(this, {x: 0, y: 0});//Object.create(physicist.physicist);
	new_physicist.position = this.snake.physicists[this.snake.physicists.length - 1].position;
	new_physicist.direction = this.snake.physicists[this.snake.physicists.length - 1].direction;
	this.snake.physicists.push(new_physicist);
	this.add_view(new PhysicistView(new_physicist));
}

Controller.prototype.start_game = function(){
	// this.session = new Session();
    var c = this;
	createjs.Ticker.on("tick", function(e){c.tick(e);});
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	this.bind_events();
	this.time = 0;
	this.score = 0;

    this.update_interface();

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
		var dir = {x: c.snake.physicists[0].direction.x, y: c.snake.physicists[0].direction.y};

		switch (e.keyCode){
			case 37:
			case 65:
				if(dir.x == 1)
					{
						break;}
				else {
						direction = {x: -1, y: 0};
						break;
					}
			case 38:
			case 87:
				if(dir.y == 1)
					{
						break;}
				else {
						direction = {x: 0, y: -1};
						break;
					}
			case 39:
			case 68:
				if(dir.x == -1)
					{
						break;}
				else {
						direction = {x: 1, y: 0};
						break;
				}
			case 40:
			case 83:
				if(dir.y == -1)
					{
						break;}
				else {
						direction = {x: 0, y: 1};
						break;
					}
		}
		if (direction && c.canTurn){
			c.turn_snake(direction);
			c.canTurn = false;
		}
	}
}

Controller.prototype.turn_snake = function(direction){
	this.snake.physicists[0].direction = direction;
}


Controller.prototype.tick = function(event){
    if(event.paused) return;
	if(event.time - this.time > this.time_step){
		this.time = event.time;
        var next_cell = this.get_next_cell_position();
		var next_cell_content = this.is_position_occupied(next_cell);
		this.snake.move(next_cell);
		this.canTurn = true;
		this.physicists_count();
		if (next_cell_content && next_cell_content.collectible) this.snake.physicists[0].collect(next_cell_content.collectible);
		if (next_cell_content && next_cell_content.physicist && event.time > 5000) this.game_over();
        if(this.collectibles.length < this.maximum_spawns){
		    this.spawn_collectibles();
        }
        this.update_views();
	}
    this.check_decays();
	this.stage.update(event);
}

Controller.prototype.check_decays = function(){
    for(var pIndex in this.collectibles){
        var p = this.collectibles[pIndex];
        if(p.decay_time && p.decays && p.decays.length && createjs.Ticker.getTime() > p.decay_time){
            var offset = {x: 0, y: 0};
            var counter = 0;
            for(var daughterInd in p.decays[0]){
                if(counter % 2){
                    offset.x = - offset.x;
                    offset.y = - offset.y;
                } else {
                    offset.x = Math.floor((Math.random() * this.grid_size.x / 10)) % this.grid_size.x;
                    offset.y = Math.floor((Math.random() * this.grid_size.y / 10)) % this.grid_size.y;
                }
                while(this.is_position_occupied(offset)){
                    offset.x++;
                    offset.y++;
                }
                var daughter = new Particle(p.position);
                daughter.start_time = createjs.Ticker.getTime();
                daughter.target = {
                    time: daughter.start_time + 500,
                    x: daughter.position.x + offset.x,
                    y: daughter.position.y + offset.y
                }
                daughter.decays = null;
                this.add_collectible(daughter);
                counter++;
            }
            this.remove_collectible(p);
        }
    }
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

Controller.prototype.is_position_occupied = function(position){
	var phs = this.snake.physicists;
	for (var ph in phs){
		var pos = phs[ph].position;
		if (pos.x == position.x && pos.y == position.y) return {physicist:phs[ph]};
	}
	for (var c in this.collectibles){
		var pos = this.collectibles[c].position;
		if (pos.x == position.x && pos.y == position.y) return {collectible:this.collectibles[c]};
	}
	return null;
}

Controller.prototype.hit_test = function(particle){
	for (var ph_i in this.snake.physicists){
		var ph = this.snake.physicists[ph_i];
		if (ph.view.hitTest(particle.position.x, particle.position.y)) {
			this.ph.collect(particle);
		}
	}
}

Controller.prototype.remove_collectible = function(collectible){
	var i = this.collectibles.indexOf(collectible);
	if (i > -1) {
	    this.collectibles.splice(i, 1);
	}
	i = -1;
	i = this.views.indexOf(collectible.view);
	if (i > -1) {
	    this.views.splice(i, 1);
	}
	this.stage.removeChild(collectible.view);
}

var get_random_element_with_probabilities = function(array){
	var previous_probability = 0;
	var rnd = Math.random();
	for (ind in array){
		var probability = array[ind].probability;
		if (rnd  < probability + previous_probability) return array[ind];
		previous_probability += probability;
	}
	return null;
}


Controller.prototype.physicists_count = function(){
	if(this.counter >= 1) {
		this.add_physicist();
		this.counter = 0;
	}
}

Controller.prototype.game_over = function(){
	alert("Game Over!\nScore: " + this.score);
	this.snake = new Snake(this.initial_length);
	this.canTurn = true;
	this.counter = 0;
	createjs.Ticker.reset();
	createjs.Ticker.init();
	for(var view in this.views){
		this.stage.removeChild(this.views[view]);
    }
	for(var collectible in this.collectibles){
		this.stage.removeChild(this.collectibles[collectible]);
    }
    this.collectibles = [];
	this.views = [];
	this.stage.clear();
	this.start_game()// ...
}

Controller.prototype.update_interface = function(){
    $("#score").html(this.score);
}
