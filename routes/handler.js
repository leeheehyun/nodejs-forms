exports.routes = function(app) {
	app.get('/', function(req, res){
		res.render('register.html', { });
	});

	app.post('/login', function(req, res){
		res.render('login.html', { });
	});
	app.get('/login', function(req, res){
		res.render('login.html', { });
	});

	app.get('/register', function(req, res){
		res.render('register.html', { });
	});

	app.post('/register', function(req, res){
		res.render('register.html', { });
	});

};
