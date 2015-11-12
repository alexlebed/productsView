
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

	var goods = [  
	   {  
		  "id":1,
		  "imag":"1.jpg",
		  "text":"Canon анонсировала новую 12,1-мегапиксельную камеру PowerShot A1100 IS. Для максимального упрощения процесса съёмки в новой модели применяется новая технология распознавания сцены, разработанная Canon. Эта функция доступна в улучшенном режиме Easy и в новом режиме Smart Auto.",
		  "title":"Photo"
	   },
	   {  
		  "id":2,
		  "imag":"2.jpg",
		  "text":"Видеокамера Panasonic HC-V760 Black (HC-V760EE-K) Официальная гарантия!",
		  "title":"Camera"
	   },
	   {  
		  "id":3,
		  "imag":"3.jpg",
		  "text":"Телевизор Full HD серии 6500 на базе ОС Android — это именно тот случай, когда достоинства модели не ограничиваются лишь приятным дизайном. Процессор Perfect Pixel HD, который обеспечивает превосходное качество изображения, фоновая подсветка Ambilight, современный стиль и качественные материалы поднимают качество просмотра на новый уровень.",
		  "title":"TV"
	}];

	 var comments = [
	     {id: 0, rate: 5, text: 'bla-bla-bla', id_user: 0, id_entry: 2},
	     {id: 1, rate: 5, text: 'bla-bla-blabla-bla-bla', id_user: 1, id_entry: 1},
	     {id: 2, rate: 2, text: 'bla-bla-bla-bla-blabla-bla-blabla', id_user: 0, id_entry: 2},
	     {id: 3, rate: 1, text: 'bla-bla-blbla-bla-blabla-bla-blabla-bla-blaa', id_user: 1, id_entry: 3},
	     {id: 4, rate: 4, text: 'bla-bla-blabla-bla-blabla-bla-blabla-bla-blabla-bla-blabla-bla-bla', id_user: 0, id_entry: 3}
	 ];  

	 var people = [
	     {id: 0, login: "Dim", password: 123, token: null},
	     {id: 1, login: "Alex", password: 123, token: null}
	];

app.get('/allData', function(req, res) {
	res.json(goods);
});

app.get('/reviews/:id', function(req, res) {
	var comentsArr = [];
    comments.forEach(function(item) {
    	if(item.id_entry == req.params.id) {
    		comentsArr.push(item);
    	}
    });
	res.json(comentsArr);
});

app.post('/reviews/:id', function(req, res) {
	var coment = req.body || {};
	var id = 0;

    coment.id_entry = req.params.id;
    delete coment.token;
    
    comments.forEach(function(item) {
    	if(item.id >= id){
    		id = item.id+ 1;
    	}
    })

    people.forEach(function(item) {
    	if(item.token == req.body.token){
    		coment.id_user = item.id;
    	}
    })

    coment.id = id;
    comments.push(coment);

	res.json({review_id: id});
});

app.post('/singIn', function(req, res) {
	var token = jwt.sign(req.body.login, 'secret');
	var id = 0;
	
    people.forEach(function(item) {

		if(item.id >= id){
			id = item.id + 1;
		}
	});
	
	people.push({
		id: id,
		login: req.body.login,
	    password: req.body.password,
		token: token
	});
	
	res.json({
			success: true,
			token: token
	});
});

app.post('/logIn', function(req, res) {
	var team = false;
	var token = false;

	people.forEach(function(item) {
		if(item.login == req.body.login && item.password == req.body.password) {
			team = true;
			token = jwt.sign(item, 'secret');
			item.token = token;
		}	
	});
   
	res.json({
			success: team,
			token: token
	});
});

app.post('/check', function(req, res) {
	var apruve = false;
	
	people.forEach(function(item) {
		if(req.body.token === item.token) {
			apruve = true;
		}
	});
	
	res.json(apruve);
});

app.listen(8888);

console.log("Server has started");


module.exports = app;










