(function(window) {
    function ParticleView(modelObject){
        this.graphics.beginFill("blue").drawCircle(0, 0, window.cell_size * 0.15 / 2);
        this.model = modelObject;
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
            ).call(function(){
                own_view.update = ParticleView.prototype.update;
                own_view.model.position.x = own_view.model.target.x;
                own_view.model.position.y = own_view.model.target.y;
            });
        }
    }

    window.ParticleView = ParticleView;
}(window));
