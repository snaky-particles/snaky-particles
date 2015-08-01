var Particle = function(position){
	Collectible.call(this, position);
	this.type = "Higgs";
	this.mass = 125;
	this.charge = 0;
	this.start_time = 1234;
	this.target = null;
	this.velocity = null;
	this.points = 125;
	this.parent_type = "W";
}
