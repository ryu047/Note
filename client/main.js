require.config({
    paths: {
        jquery: 'lib/jquery',
        backbone: 'lib/backbone',
        lodash: 'lib/lodash',
        require: 'lib/require',
        underscore: 'lib/underscore',
        text: 'lib/text'
    }
});

require([
    'app'
], function(App){
    App.init();
});