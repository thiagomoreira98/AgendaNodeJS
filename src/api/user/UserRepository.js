module.exports = {
    list,
    listById,
    insert,
    update,
    remove
};

function list(connectionString, callback){
    let db = require("pg-db")(connectionString);
    db.query("SELECT * FROM contato.agenda;", [], (err, rows)=>{
        return callback(err, rows);
    });
}


function listById(connectionString, params, callback){
    let db = require("pg-db")(connectionString);
    db.query("SELECT * FROM contato.agenda WHERE id = $1;", [params.id], (err, rows)=>{
        return callback(err, rows);
    });
}

function insert(connectionString, params, callback){
    let db = require("pg-db")(connectionString);
    db.query("INSERT INTO contato.agenda(nome, datanascimento, sexo) VALUES($1, $2, $3);", [params.nome, params.dataNascimento, params.sexo], (err, rows)=>{
        return callback(err, rows);
    });
}


function update(connectionString, callback){
    let db = require("pg-db")(connectionString);
    db.query("SELECT * FROM contato.agenda WHERE id = $1;", [params.id], (err, rows)=>{
        return callback(err, rows);
    });
}


function remove(connectionString, callback){
    let db = require("pg-db")(connectionString);
    db.query("SELECT * FROM contato.agenda WHERE id = $1;", [params.id], (err, rows)=>{
        return callback(err, rows);
    });
}