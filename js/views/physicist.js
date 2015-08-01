(function(window) {
    function PhysicistView(modelObject){
        // this.graphics.beginFill("red").drawCircle(0, 0, window.cell_size * 0.9 / 2);
        // TODO: read those values from json/whatever
        var width = 131;
        this.width = width;
        var height = 135;
        this.height = height;
        var spriteSheet = new createjs.SpriteSheet({
            framerate: 15,
            images: ["img/physicist/physicist-spritesheet.png"],
            frames: {regX: height/2, height: height, count: 8, regY: width/2, width: width},
            animations: {run: [0, 7]}
        });
        var scale = width > height ? cell_size / width : cell_size / height;
        this.scaleX = scale;
        this.scaleY = scale;
        this.spriteSheet = spriteSheet;
        this.gotoAndPlay("run");
        this.currentAnimationFrame = Math.floor(Math.random() * 7);
        this.model = modelObject;
    }

    PhysicistView.prototype = new createjs.Sprite();
    // PhysicistView.prototype = new createjs.Shape();

    PhysicistView.prototype.update = function(){
        this.x = cell_size * this.model.position.x + cell_size / 2;
        this.y = cell_size * this.model.position.y + cell_size / 2;
        this.rotation = this.model.direction.x > 0 ? -90 :
            this.model.direction.x < 0 ? 90 :
            this.model.direction.y > 0 ? 0 : 180;
    }

    window.PhysicistView = PhysicistView;
}(window));
