module.exports = (app)=>{

    const connectionString = require('../../../config/Environment.js').database;
	let userRepository = require('./UserRepository.js');

    return {
		list,
		listById,
		insert,
		update,
		remove
	};


	function list(req, res){
		userRepository.list(connectionString, (err, rows)=>{
			if(err){
				res.status(500);
				return res.json({
					message: "Internal Server Error",
					code: 1,
					error: err
				});
			}

			else{
				return res.json({
					message: "Usúarios retornados com sucesso!",
					code: 0,
					result: rows
				});
			}
		});
	}

	function listById(req, res){
		let params = {
			id: req.params.idUser
		};

		userRepository.listById(connectionString, params, (err, rows)=>{
			if(err){
				res.status(500);
				return res.json({
					message: "Internal Server Error",
					code: 1,
					error: err
				});
			}

			else{
				res.status(rows.length ? 200 : 404);
				return res.json({
					message: "Usúarios retornados com sucesso!",
					code: 0,
					result: rows
				});
			}
		});
	}

	function insert(req, res) {
        let params = {
            nome: req.body.nome,
            dataNascimento: req.body.dataNascimento,
            sexo: req.body.sexo
        };

        userRepository.insert(connectionString, params, (err, rows) => {
            res.status(err ? 500 : 200);

            return res.json({
                message: err ? "DEU PAU!" : "Usuario adicionado com sucesso!",
                code: err ? 1 : 0
            });
        });
    }

	function update(req, res){
		let params = {
			idUser: req.params.idUser,
			nome: req.body.nome,
			sobrenome: req.body.sobrenome
		};

		let achou = 0;

		for(let i = 0; i < app.locals.usuario.length; i++){
			if(app.locals.usuario[i].id == params.id){
				app.locals.usuario[i].id = params;
				achou = 1;
			}
		}

		if(achou){
			res.status(200);
			return res.json({
				message: "usuario editado com sucesso",
				code: 0,
				result: user
			});
		}

		else{
			res.status(404);
			return res.json({
				message: "usuario nao encontrado",
				code: 1,
			});
		}
	}

	function remove(req, res){
		let id = req.params.idUser;

		for(let i = 0; i < app.locals.usuario.length; i++){
			if(app.locals.usuario[i].id == id){
				app.locals.usuario.splice(i , 1);
				achou = 1;
			}
		}

		let achou = 0;

		if(achou){
			res.status(200);
			return res.json({
				message: "usuario removido com sucesso",
				code: 0,
				result: user
			});
		}

		else{
			res.status(404);
			return res.json({
				message: "usuario nao encontrado",
				code: 1,
			});
		}
	}
};
