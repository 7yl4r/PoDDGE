(function() {
    var app = angular.module('poddge', ["milestone-form-directives"]);

    app.controller('editorController', function(){
        var editor = this;
        this.getFakeMilestone = function(){
            return {
                name: 'resolve issue x',
                hours: 10,
                uncertainty: 4
            };
        };

        this.milestones = [editor.getFakeMilestone()];

        this.addMilestone = function(milestone){
            editor.milestones.push(editor.getFakeMilestone());
        };
    });
})();