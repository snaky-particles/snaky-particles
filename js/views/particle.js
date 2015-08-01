(function(window) {
    function ParticleView(modelObject){
        this.model = modelObject;
		this.model.view = this;
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

    ParticleView.prototype.animate = function(){
        if(this.model.target){
            var own_view = this;
            this.update();
            this.update = function(){};
            createjs.Tween.get(this).to(
                { x: cell_size * this.model.target.x, y: cell_size * this.model.target.y },
                // We do not want to have magnetically curved particles for now
                // {guide:{ path:[0,0, 0,200,200,200, 200,0,0,0] }},
                this.model.target.time - this.model.start_time
				)
			.addEventListener("change", function(e){
				controller.hit_test(e, own_view.model);
				})
			.call(function(){
                own_view.update = ParticleView.prototype.update;
                own_view.model.position.x = own_view.model.target.x;
                own_view.model.position.y = own_view.model.target.y;
            });
        }
    }

    window.ParticleView = ParticleView;
}(window));
