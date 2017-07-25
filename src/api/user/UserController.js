module.exports = (app) =>{
	const connectionString = require('../../../config/Environment.js').database;
	const UserRepository = require('./UserRepository.js');
	return{
		list,
		listById,
		insert,
		update,
		remove
	}
	function list(req, res) {
		UserRepository.list(connectionString, (err, rows) =>{
			if(err){
				res.status(500);
				return res.json({
					message: "Internal server error!",
					code: 1,
					error: err
				});
			}
			else{
				return res.json({
					message: "usuario listados com sucesso",
					code: 0,
					result: rows
				});
			}
		});

	}
	function listById(req, res) {
		let params = {
			id: req.params.idUser
		};
		UserRepository.listId(connectionString, params, (err, rows) =>{
			if(err){
				res.status(500);
				return res.json({
					message: "Internal server error!",
					code: 1,
					error: err
				});
			}
			else{
				res.status(rows.length ? 200 : 404);
				return res.json({
					message: "usuario listados com sucesso",
					code: 0,
					result: rows
				});
			}
		});
	}
	function update(req, res){
			let params = {
				id: req.params.idUser,
				nome: req.body.nome,
				dataNascimento: req.body.dataNascimento,
				sexo: req.body.sexo
			}
			UserRepository.update(connectionString, params, (err, rows)=>{
				res.status (err ? 500 : 200);
				return res.json({
					message: err ? "Deu pau!" : "O ususario fio adicionado com sucesso!",
					code: err ? 1 : 0,
					err: err ? err : undefined
				});
			});

		}
	function insert(req, res) {
		let params = {
			nome: req.body.nome,
			dataNascimento: req.body.dataNascimento,
			sexo: req.body.sexo
		}

		UserRepository.insert(connectionString, params, (err, rows)=>{
			if(err){
				res.status(500);
				return res.json({
					message: "Deu pau!",
					code: 1,
					err: err
				});
			}
				else{
					let result = rows[0].insertuser;
					res.status(result.httpCode);
					return res.json({
						message: result.result,
						code: result.code,
						err: undefined
					});
				}
			
		});
	}
	function remove(req, res) {
		let id = req.params.idUser;
		UserRepository.remove(connectionString, id, (err, rows)=>{
			res.status (err? 500 : 200);
			return res.json({
				message: err ? "Deu pau!" : "O ususario fio removido com sucesso!",
				code: err ? 1 : 0,
				err: err ? err : undefined
			});
		});
	}
}
