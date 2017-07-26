module.exports = (app)=>{
    const connectionString = require("../../../config/Environment.js").database;
    const userRepository = require("./UserRepository.js");

    return {
        list,
        listById,
        insert,
        update,
        remove
    }

    function list(req, res){
        userRepository.list(connectionString, (err, rows)=>{
            if(err){
                res.status(500);
                return res.json({
                    message: "Intenal server error!",
                    code: 1,
                    error: err
                });
            }
            else{
                return res.json({
                    message: "Usuários listados com sucesso!",
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
                    message: "Intenal server error!",
                    code: 1,
                    error: err
                });
            }
            else{
                res.status(rows.length ? 200 : 404);
                return res.json({
                    message: "Usuários listados com sucesso!",
                    code: 0,
                    result: rows
                });
            }
        });
    }
    function insert(req, res){
        let params = {
            nome: req.body.nome,
            dataNascimento: req.body.dataNascimento,
            sexo: req.body.sexo
        }

        userRepository.insert(connectionString, params, (err, rows)=>{
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
    function update(req, res){
        let params = {
            id: req.params.idUser,
            nome: req.body.nome,
            dataNascimento: req.body.dataNascimento,
            sexo: req.body.sexo
        }

        userRepository.update(connectionString, params, (err, rows)=>{
            if(err){
                res.status(500);
                return res.json({
                    message: "Deu pau!",
                    code: 1,
                    err: err
                });
            }
            else{
                let result = rows[0].updateuser;

                res.status(result.httpCode);
                return res.json({
                    message: result.result,
                    code: result.code,
                    err: undefined
                });
            }
        });

    }
    function remove(req, res){
        let id = req.params.idUser;

        userRepository.remove(connectionString, id, (err, rows)=>{
            if(err){
                res.status(500);
                return res.json({
                    message: "Deu pau!",
                    code: 1,
                    err: err
                });
            }
            else{
                let result = rows[0].removeuser;

                res.status(result.httpCode);
                return res.json({
                    message: result.result,
                    code: result.code,
                    err: undefined
                });
            }
        });
    }
}