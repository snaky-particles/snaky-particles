(function(window) {
    function ParticleView(modelObject){
        createjs.Shape.call(this);
        this.model = modelObject;
		this.model.view = this;
		var dp = this.model.draw_properties;
		var cs = window.cell_size;
        this.graphics
			.beginRadialGradientFill(dp.colors, dp.ratios, 
				dp.inner_center.x * cs, dp.inner_center.y * cs , dp.inner_radius * cs,
				dp.outer_center.x * cs, dp.outer_center.y * cs, dp.outer_radius * cs)
			.drawCircle(0, 0, cs * dp.outer_radius);
        // this.graphics.beginFill("red").drawCircle(0, 0, window.cell_size * 0.2 / 2);
        this.animate();
    }

    ParticleView.prototype = new createjs.Shape();

    ParticleView.prototype.update = function(){
        this.x = cell_size * this.model.position.x + cell_size / 2;
        this.y = cell_size * this.model.position.y + cell_size / 2;
    }

    ParticleView.prototype.animate = function(){
        if(this.model.target){
            var own_view = this;
            this.update();
            this.update = function(){};
            createjs.Tween.get(this).to(
                {
                    x: cell_size * this.model.target.x + cell_size / 2,
                    y: cell_size * this.model.target.y + cell_size / 2 
                },
                // We do not want to have magnetically curved particles for now
                // {guide:{ path:[0,0, 0,200,200,200, 200,0,0,0] }},
                this.model.target.time - this.model.start_time
				)
            .call(function(){
                own_view.update = ParticleView.prototype.update;
                own_view.model.position.x = own_view.model.target.x;
                own_view.model.position.y = own_view.model.target.y;
            })
			/*
			.addEventListener("change", function(){
				controller.hit_test(own_view.model);
	        })*/
			;
        }

		this.model.animation_function(this);

    }

    window.ParticleView = ParticleView;
}(window));
