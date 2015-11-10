(function(){
    
    define([
        'jquery',
        'lodash',
        'backbone',
        '../models/todoModel',
    ], function($, _, Backbone, TodoModel){
       
        var TodoCollection = Backbone.Collection.extend({
            url: 'http://localhost:8888/api/todos',
            model: TodoModel,
            completed: function(){
                return this.filter(function(todo){
                    return todo.get('completed');
                });
            },
            remaining: function(){
                var that = this;
                return that.without.apply(that, that.completed() );
            },
            nextOrder: function(){
                var that = this;
                if(!that.length){
                    return 1;
                }
                
                return that.last().get('order') + 1;
            },
            comparator: function(todo){
                return todo.get('order');
            }
        });
        
        return TodoCollection;
    });
})();