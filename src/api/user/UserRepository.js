module.exports = {
  list,
  listId,
  insert,
  update,
  remove
}

function list(connectionString, callback){
  let db = require("pg-db")(connectionString);

  db.query("SELECT * FROM CONTATO.LISTARUSUARIO($1);", [undefined], (err, rows)=>{
    return callback(err, rows);
  });

}
function listId(connectionString, params, callback){
  let db = require('pg-db')(connectionString);

  db.query("SELECT * FROM CONTATO.LISTARUSUARIO($1)", [params.id], (err, rows)=>{
    return callback(err, rows);
  });
}
function insert(connectionString, params, callback){
  let db = require("pg-db")(connectionString);

  db.query("SELECT * FROM CONTATO.INSERTUSER($1, $2, $3);",
    [params.nome, params.dataNascimento, params.sexo],
    (err, rows)=>{
      return callback(err, rows);
    });
}
function update(connectionString, params, callback){
  let db = require("pg-db")(connectionString);
  db.query("UPDATE CONTATO.AGENDA SET NOME = $1, DATANASCIMENTO = $2, SEXO = $3 WHERE ID = $4;",
  [params.nome, params.dataNascimento, params.sexo, params.id],
  (err, rows)=>{
    return callback(err, rows);
  });
}
function remove(connectionString, id, callback){
  let db = require("pg-db")(connectionString);
  db.query("DELETE FROM CONTATO.AGENDA WHERE ID = $1;",
  [id],
  (err, rows)=>{
    return callback(err, rows);
  });
}
