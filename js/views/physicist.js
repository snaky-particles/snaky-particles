(function(window) {
    function PhysicistView(modelObject){
        // this.graphics.beginFill("red").drawCircle(0, 0, window.cell_size * 0.9 / 2);
        var width = 131;
        var height = 135;
        var spriteSheet = new createjs.SpriteSheet({
            framerate: 15,
            images: ["img/physicist/physicist-spritesheet.png"],
            frames: {regX: height/2, height: height, count: 8, regY: width/2, width: width},
            animations: {
                run: [0, 7]
            }
        });
        var scale = width > height ? cell_size / width : cell_size / height;
        this.scaleX = scale;
        this.scaleY = scale;
        this.spriteSheet = spriteSheet;
        this.gotoAndPlay("run");
        this.model = modelObject;
    }

    PhysicistView.prototype = new createjs.Sprite();
    // PhysicistView.prototype = new createjs.Shape();

    PhysicistView.prototype.update = function(){
        this.x = cell_size * this.model.position.x;
        this.y = cell_size * this.model.position.y;
        this.rotation = this.model.direction.x > 0 ? -90 :
            this.model.direction.x < 0 ? 90 :
            this.model.direction.y > 0 ? 0 : 180;
    }

    window.PhysicistView = PhysicistView;
}(window));
