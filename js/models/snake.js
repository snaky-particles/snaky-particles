var Snake = function(n_physicisits){
	this.physicists = [];
	for (var i = 0; i < n_physicisits; i++){
		this.physicists.push(new Physicist(this, {x: 0, y: 0}, i % 8));
	}
    this.physicists[0].direction = {x: 0, y: 0};
	this.new_physicists = [];
	this.bonuses = [];
	this.speed = 1;
}

Snake.prototype.add_physicist = function(physicist){
	this.new_physicists.push_back(new Physicist(this, this.physicists[this.physicists.length - 1].position));
}

Snake.prototype.add_bonus = function(bonus){
	this.bonuses.push_back(bonus);
}

Snake.prototype.remove_physicist = function(index){	
}


Snake.prototype.move = function(next_cell){
	for(var i = this.physicists.length - 1; i > 0; i--){
		this.physicists[i].position  = this.physicists[i-1].position;
		this.physicists[i].direction = this.physicists[i-1].direction;
	}
	this.physicists[0].position = next_cell;
}
