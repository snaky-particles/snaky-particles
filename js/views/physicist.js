(function(window) {
    function PhysicistView(modelObject){
        this.graphics.beginFill("red").drawCircle(0, 0, 20);
        this.model = modelObject;
    }

    PhysicistView.prototype = new createjs.Shape();

    PhysicistView.prototype.update = function(){
        this.x = this.model.position.x;
        this.y = this.model.position.y;
    }

    window.PhysicistView = PhysicistView;
}(window));
