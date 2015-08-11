(function(){
    var cellSize = 1;

    var app = angular.module("app", ["views"]);

    var views = angular.module("views", []);

    views.factory("Particle", function(){
        function Particle(modelObject){
            this.particle = new createjs.Shape();
            this.particle.graphics.beginFill("#FFE989").drawCircle(0, 0, modelObject.radius);
            this.particle.animationTarget = modelObject.target;
            this.particle.gridPosition = modelObject.position;
            this.animate();
        }
        Particle.prototype = {
            addToStage: function(stage){
                stage.addChild(this.particle);
            },
            removeFromStage: function(stage){
                stage.removeChild(this.particle);
            },
            get x () {
                return this.particle.gridPosition.x;
            },
            set x (val) {
                this.particle.x = cellSize * val + cellSize / 2;
            },
            get y () {
                return this.particle.gridPosition.y;
            },
            set y (val) {
                this.particle.y =  cellSize * val + cellSize / 2;
            },
            animate: function(){
                if(this.particle.animationTarget){
                    console.log("Will animate");
                    createjs.Tween.get(this.particle, {loop: true}).to({
                        x: this.particle.animationTarget.x * cellSize + cellSize / 2,
                        y: this.particle.animationTarget.y * cellSize + cellSize / 2
                    }, this.particle.animationDuration);
                }
            }
        }
        return (Particle);
    })

    app.service('modelService', function(){
        this.prop = function(){
            return 100;
        }();
    });

    app.directive('gameControl', ['modelService', function(modelService){
        return {
            restrict: 'E',
            templateUrl: 'templates/game-control.html',
            controller: ['$scope', function($scope){
                $scope.score = modelService.prop;
            }],
            controllerAs: 'control'
        }
    }]);

    app.directive('screen', ['modelService', 'Particle', function(modelService, Particle){
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            template: '<canvas id="screen" width="100" height="100"></canvas>',
            link: function(scope, element, attribute){
                var manifest, loader, particle;
                drawGame();
                function drawGame(){
                    if(scope.stage){
                        scope.stage.autoClear = true;
                        scope.stage.removeAllChildren();
                        scope.stage.update();
                    } else {
                        scope.stage = new createjs.Stage(element[0]);
                    }
                    manifest = [{src: 'README.md', id: 'readme'}];
                    loader = new createjs.LoadQueue(false);
                    loader.addEventListener("complete", handleComplete);
                    loader.loadManifest(manifest, true, "/");
                }
                function handleComplete(){
                    particle = new Particle({
                        radius: 10,
                        target: {x: 5, y: 1},
                        duration: 200
                    });
                    particle.addToStage(scope.stage);
                    createjs.Ticker.timingMode = createjs.Ticker.RAF;
                    createjs.Ticker.addEventListener("tick", scope.stage);
                }
            }
        }
    }])
}());
