let express = require("express");
let bodyParser = require("body-parser");
let load = require("express-load");

app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

load("src/api/ping/PingController.js")
	.then("src/api/user/UserController")
	.then("src/core/route")
	.into(app);

app.listen(3000, ()=>{
	app.locals.usuario = [];
	console.log("SERVIDOR INICIADO COM SUCESSO!");
});