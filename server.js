var express  =  require('express'),
	app      =  express(),
	mongoose =  require('mongoose'),
	port     =  process.env.PORT || 3333

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

app.put('/api/todo/:todo_id', function(req, res){
	Todo.findById(req.params.todo_id, function(error, todo){
		todo.done = !todo.done;
		todo.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	    });
		
	});
});

app.delete('/api/todo/:todo_id', function(req, res){
	return Todo.findById(req.params.todo_id, function(error, todo){
		return todo.remove(function(error){
			if(error){
				res.send("ERROR: " + error);
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
});

app.get('*', function(req, res){
	res.sendfile('./public/index.html');
});
app.listen(port);
console.log('App listening to pawt ' + port);
