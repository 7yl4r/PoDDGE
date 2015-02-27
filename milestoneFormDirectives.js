(function(){
    var app = angular.module('milestone-form-directives', []);

    app.directive("milestoneForm", function() {
        return {
            restrict: 'E',
            templateUrl: "milestone-form.html"
        };
    });
})();