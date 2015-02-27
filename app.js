(function() {
    var app = angular.module('poddge', ["milestone-form-directives", 'nvd3ChartDirectives']);

    app.controller('editorController', function(){
        var editor = this;
        this.getFakeMilestone = function(){
            return {
                name: 'resolve issue x',
                hours: 10,
                uncertainty: 4
            };
        };

        app.milestones = [editor.getFakeMilestone()];
        this.milestones = app.milestones;

        this.addMilestone = function(milestone){
            editor.milestones.push(editor.getFakeMilestone());
        };
    });

    app.controller('graphCtrl', function($scope){
        var data = [];
        var cumulative = 0;
        var nSamples = 10; // 1/2 number of samples per distribution curve
        app.milestones.forEach(function(entry){
            for(var i = -nSamples; i <= nSamples; i++){
                var t = cumulative + entry.hours + entry.uncertainty * i/nSamples;
                var sigma = entry.uncertainty/2;
                var mu = cumulative + entry.hours;
                var p = Math.exp( - Math.pow(t-mu, 2)/(2*Math.pow(sigma, 2))  )
                        /(sigma*Math.sqrt(2*Math.PI));
                data.push([t, p]);
            }
            cumulative += entry.hours;

        });

        $scope.exampleData = [
            {
                "key": "Series 1",
                "values": data
            }
        ];
    });
})();