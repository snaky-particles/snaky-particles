(function(window) {
    function ParticleView(modelObject){
        //this.graphics.beginFill("blue").drawCircle(0, 0, window.cell_size * 0.15 / 2);
        this.model = modelObject;
    }

    ParticleView.prototype = new createjs.Bitmap("img/higgs/higgs.gif");

    ParticleView.prototype.update = function(){
        this.x = cell_size * this.model.position.x;
        this.y = cell_size * this.model.position.y;
    }

    window.ParticleView = ParticleView;
}(window));
