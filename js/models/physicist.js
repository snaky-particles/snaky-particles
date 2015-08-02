var Physicist = function(snake, position) {
	this.direction = 0;
	this.position = position;
	this.name = 'Fermi';
	this.bonus = '';
	this.snake = snake;
};

Physicist.prototype.collect = function(collectible) {
	this.bonus += " fat!";
	controller.score += collectible.points;
	controller.remove_collectible(collectible);
	controller.counter += 1;
    controller.update_interface();
    if(collectible.facts){
        if(!controller.facts_shown[collectible.type]){
            $("#ticker").html(collectible.facts[0]);
            controller.facts_shown[collectible.type] = 1;
        } else {
            $("#ticker").html(collectible.facts[controller.facts_shown[collectible.type]++]);
        }
    }
};
