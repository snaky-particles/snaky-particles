var Particle = function(position){
	Collectible.call(this, position);
	this.type = "Higgs";
	this.mass = 125;
	this.draw_properties = {
		colors: ["hsl(0, 100%, 50%)", "hsl(0, 40%, 50%)"],
		ratios: [0, 1],
		inner_radius: .03,
		outer_radius: .13,
		inner_center: {x: .07, y: .07},
		outer_center: {x: 0, y: 0}
		};
	this.charge = 0;
	this.start_time = 1234;
	this.decay_time = 4444;
    this.halflife_time = 1000;
	this.target = null;
	this.velocity = null;
	this.points = 125;
	this.parent_type = "W";
	this.decays = [{particles: ["W", "W"], probability: 1}]
}
