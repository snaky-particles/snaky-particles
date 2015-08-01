(function(window) {
    function ParticleView(modelObject){
        this.model = modelObject;
		var dp = this.model.draw_properties;
		var cs = window.cell_size;
        this.graphics
			.beginRadialGradientFill(dp.colors, dp.ratios, 
				dp.inner_center.x * cs, dp.inner_center.y * cs , dp.inner_radius * cs,
				dp.outer_center.x * cs, dp.outer_center.y * cs, dp.outer_radius * cs)
			.drawCircle(0, 0, cs * dp.outer_radius);
    }

    ParticleView.prototype = new createjs.Shape();

    ParticleView.prototype.update = function(){
        this.x = cell_size * this.model.position.x;
        this.y = cell_size * this.model.position.y;
    }

    window.ParticleView = ParticleView;
}(window));
