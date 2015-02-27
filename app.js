(function() {
    var app = angular.module('poddge', ["milestone-form-directives", 'nvd3ChartDirectives']);

    app.getFakeMilestone = function(milestoneName){
        if (typeof milestoneName === "undefined") {
            var name = "resolve issue #" + (app.milestones.length+1);
        } else {
            var name = milestoneName;
        }
        return {
            name: name,
            hours: 10,
            uncertainty: 4
        };
    };

    app.milestones = [app.getFakeMilestone("resolve issue #1")];

    app.getData = function() {
        // TODO: don't recalc all of it, only what has changed
        var data = [];
        var cumulative = 0;
        var nSamples = 5; // 1/2 number of samples per distribution curve
        app.milestones.forEach(function (entry) {
            data.push({key: entry.name, values: []});
            for (var i = -nSamples; i <= nSamples; i++) {
                var t = cumulative + entry.hours + entry.uncertainty * i / nSamples;
                var sigma = entry.uncertainty / 2;
                var mu = cumulative + entry.hours;
                var p = Math.exp(-Math.pow(t - mu, 2) / (2 * Math.pow(sigma, 2)))
                    / (sigma * Math.sqrt(2 * Math.PI));
                data[data.length - 1]["values"].push([t, p]);
            }
            cumulative += entry.hours;
        });
        window.data = data;
        return data;
    };

    app.controller('editorController', function(){
        this.milestones = app.milestones;
        this.addMilestone = function(milestone){
            app.milestones.push(app.getFakeMilestone());
        };
    });

    app.controller('graphCtrl', function($scope){
        $scope.exampleData = app.getData();

        // TODO: refresh on command, not set interval
        setInterval(function() {
            $scope.$apply(function() {
                $scope.exampleData = app.getData();
            });
        }, 1000);

    });
})();