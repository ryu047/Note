(function(){
    
    define([
        'jquery',
        'lodash',
        'backbone',
        './todoView',
        'text!../templates/statsTemplate.html',
        'text!../templates/mainTemplate.html'
    ],function($, _, Backbone, TodoView, statsTemplate, mainTemplate){

            var AppView = Backbone.View.extend({

            el: '#todoapp',
            events: {
                'keypress #new-todo': 'createOnEnter',
                'click #clear-completed': 'clearCompleted',
                'click #toggle-all': 'toggleAllComplete'
            },
            statsTemplate: _.template(statsTemplate),
            template: _.template(mainTemplate),
            initialize: function(options){
                var that = this,
                    collection = that.collection = options.collection,
                    router;
                
                that.$el.html(that.template);
                that.allCheckbox = that.$('#toggle-all')[0];
                that.$input = that.$('#new-todo');
                that.$stat = that.$('#stat');
                that.$main = that.$('#main');
                that.$markAll = that.$('#markAll')
                that.listenTo(collection, 'add', that.addOne);
                that.listenTo(collection, 'reset', that.addAll);
                that.listenTo(collection, 'all', that.render);
                
                collection.fetch();
                                
            },
                
            render : function(){
                var that = this,
                    completed = that.collection.completed().length,
                    remaining = that.collection.remaining().length;

                if ( that.collection.length ) {
                    that.$main.show();
                    that.$stat.show();
                    that.$markAll.show();
                    that.$stat.html(that.statsTemplate({
                        completed: completed,
                        remaining: remaining
                    }));

                } else {
                    that.$main.hide();
                    that.$stat.hide();
                    that.$markAll.hide();
                }

                that.allCheckbox.checked = !remaining;
            },
            
            addOne: function(todo){
                var view = new TodoView({ model: todo });
                $('#todo-list').append( view.render().el );
                window.scrollTo(0, $('body').prop('scrollHeight'));
            },
                
            addAll: function() {
                var that = this;
                that.$('#todo-list').html('');
                that.collection.each(that.addOne, that);
            },
                
            newAttributes: function() {
                var that = this;
                return {
                    title: that.$input.val().trim(),
                    order: that.collection.nextOrder(),
                    completed: false
                };
            },
                
            createOnEnter: function( event ) {
                var that = this,
                    collection = that.collection;
                if ( event.which !== 13 || !that.$input.val().trim() ) {
                    return;
                }
            
                that.collection.create( that.newAttributes(), {
                    success: function(model, response){
                        collection.models[collection.models.length - 1].id = response._id;
                    }
                } );
                that.$input.val('');
            },
                
            clearCompleted: function() {
              _.invoke(this.collection.completed(), 'destroy');
              return false;
            },
                
            toggleAllComplete: function() {
              var that = this,
                  completed = that.allCheckbox.checked;

              that.collection.each(function( todo ) {
                todo.save({
                  'completed': completed
                });
              });
            }
        });
        return AppView;

    });
    
})();

