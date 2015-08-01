(function(window) {
    function PhysicistView(modelObject){
        this.graphics.beginFill("red").drawCircle(0, 0, window.cell_size * 0.9 / 2);
        this.model = modelObject;
		this.model.view = this;
    }

    PhysicistView.prototype = new createjs.Shape();

    PhysicistView.prototype.update = function(){
        this.x = cell_size * this.model.position.x;
        this.y = cell_size * this.model.position.y;
    }

    window.PhysicistView = PhysicistView;
}(window));
