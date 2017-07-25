module.exports = function(app){
  return {
    ping
  }
}

function ping(req, res){
  return res.json({
    status: "ok",
    data: new Date()
  });
}
