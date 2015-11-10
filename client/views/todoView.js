(function(){
    
    define([
        'jquery',
        'lodash',
        'backbone',
        'text!../templates/itemTemplate.html'
    ], function($, _, Backbone, itemTemplate){
       
        var TodoView = Backbone.View.extend({
           
            tagname: 'li',
            template: _.template(itemTemplate),
            events: {
                'click .toggle': 'togglecompleted',
                'keypress .edit': 'updateOnEnter',
            },
            
            initialize: function(){
                var that = this;
                that.listenTo(that.model, 'change', that.render);
                that.listenTo(that.model, 'destroy', that.remove);  
            },
            
            render: function(){
                var that = this;
                
                that.$el.html(that.template(that.model.attributes));
                that.$input = that.$('.edit');
                that.$input.tooltip({
                    title: 'Click here to update this task',
                    delay: {
                        'show':300,
                        'hide':0
                    }
                });
                that.$input.focus(function(){
                    that.$input.tooltip('hide');
                });
                
                return that;
            },
            
            togglecompleted: function() {
                this.model.toggle();
            },

            close: function() {
                var that = this,
                    value = that.$input.val().trim();

                if ( value ) {
                    that.model.save({ title: value });
                } else {
                    that.clear();
                }
            },
            
             updateOnEnter: function( e ) {
                if ( e.which === 13 ) {
                    this.close();
                }
            },
            
        });
        
        return TodoView;
    });
})();