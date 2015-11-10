var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    fs = require('fs'),
    app = express();

mongoose.connect('mongodb://localhost:27017'); 
app.use(express.static('client'));                
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


var Todo = mongoose.model('Todo', {
    title: String,
    order: Number,
    completed: Boolean
});

app.get('/api/todos', function(req, res){
    
    Todo.find(function(err, todos){
        if(err){
            res.send(err);
        } else {
            res.json(todos);    
        }
    });
});

app.post('/api/todos', function(req, res){

    var todo = new Todo({
        title: req.body.title,
        order: req.body.order,
        completed: req.body.completed
    });
    
    todo.save(function() {
        res.send(todo);
    });
    
});

app.put('/api/todos/:id', function(req, res){
   
    var todo = new Todo({
        title: req.body.title,
        order: req.body.order,
        completed: req.body.completed
    });
    var id = req.params.id;
    Todo.findById(id, function(err, todo){
        if(err){
            throw err;
        }
        todo.title = req.body.title;
        todo.order = req.body.order;
        todo.completed = req.body.completed;
        todo.save(function(err) {
            if(err){
                throw err;
            }
            res.send(todo);
        });
    });
});

app.delete('/api/todos/:id', function(req, res){
   
    var id = req.params.id;
    Todo.findById(id, function(err, todo){
        if(err){
            throw err;
        }
        todo.remove(function(err) {
            if(err){
                throw err;
            }
        });
    });
    res.end();
    
});

app.get('/', function(req,res){
    res.end(fs.readFileSync('index.html'));
})


app.listen(8888);
console.log("Server started");



