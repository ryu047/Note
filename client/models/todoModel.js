(function(){
    
    define([
        'jquery',
        'lodash',
        'backbone'
    ],function($, _, Backbone){
        
        var TodoModel = Backbone.Model.extend({
            idAttribute: '_id',
            urlRoot: '/api/todos',
            defaults: {
                title: '',
                completed: false
            },
            toggle: function(){
                var that = this;
                that.save({
                    completed: !that.get('completed')
                });
            }
        });
        return TodoModel;
    });
})();