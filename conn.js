var mysql = require ('mysql');
var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "album_kenangan"
});

conn.connect(function(err){
    if(err)throw err;

});
module.exports = conn;