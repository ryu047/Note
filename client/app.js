(function(){
    
    define([
        'jquery',
        'lodash',
        'backbone',
        'views/AppView',
        'collections/todoCollection'
    ], function($, _, Backbone, AppView, TodoCollection){
    
        var init = function(){
            var options = {},
                appView;
            options.collection = new TodoCollection();
            appView = new AppView(options);
        };
       return {
           init : init
       }; 
    });  
})();
