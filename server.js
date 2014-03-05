var express  =  require('express'),
	app      =  express(),
	mongoose =  require('mongoose'),
	port     =  process.env.PORT || 8080

mongoose.connect('mongodb://admin:password@novus.modulusmongo.net:27017/mUj4asav');

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});


var Todo = mongoose.model('Todo', {
	text: String,
	done: Boolean
});

app.get('/api/todos', function(req, res){
	Todo.find(function(error, todos){
		if(error){
			res.send(error);
		} else {
			res.json(todos);
		}
	});
});

app.post('/api/todos', function(req, res){

	Todo.create({
		text: req.body.text,
		done: false
	}, function(error, todo){
		if(error) {
			res.send(error)
		}

		Todo.find(function(error, todos){
			if(error){
				res.send(error);
			} else {
				res.json(todos);
			}
		});
	});
});

app.delete('/api/todos/:todo_id', function(req, res){
	Todo.remove({
		_id: req.params.todo_id
	}, function(error, todo){
		if(error){
			res.send(error);
		}

		Todo.find(function(error, todos){
			if(error){
				res.send(error)
			} else {
				res.json(todos);
			}
		});
	});
});

app.get('*', function(req, res){
	res.sendfile('./public/index.html');
});
app.listen(8080);
console.log('App listening to pawt ' + port);
