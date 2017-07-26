module.exports = {
    list,
    listById,
    insert,
    update,
    remove
}

function list(connectionString, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.LISTUSER($1);",
        [
            undefined
        ],
        (err, rows)=>{
            return callback(err, rows);
        }
    );
}

function listById(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.LISTUSER($1);",
        [params.id],
        (err, rows)=>{
            return callback(err, rows);
        }
    );
}

function insert(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.INSERTUSER($1, $2, $3);",
        [
            params.nome,
            params.dataNascimento,
            params.sexo
        ],
        (err, rows)=>{
           return callback(err, rows);
        }
    );
}

function update(connectionString, params, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.UPDATEUSER($1, $2, $3, $4);",
        [
            params.id,
            params.nome,
            params.dataNascimento,
            params.sexo
        ],
        (err, rows)=>{
            return callback(err, rows);
        }
    );
}

function remove(connectionString, id, callback){
    let db = require("pg-db")(connectionString);

    db.query("SELECT * FROM CONTATO.REMOVEUSER($1);",
        [
            id
        ],
        (err, rows)=>{
            return callback(err, rows);
        }
    );
}

