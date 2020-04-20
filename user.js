var jwt = require('jsonwebtoken');

exports.check_user=function(req, res){
    var user_name=req.body.check_user;
    var sql_username = "SELECT FROM siswa WHERE email= '"+user_name+"'";
    var query = db.query(sql_username, function(err, result){
        if(result == ""){
            res.json({
                "results":
                {"status": "tidak ada user"}
            });
            res.end();
        }
        else{
            res.json({
                "results":
                {"status": "ada user",
                 "id":result
                }
            });
            res.end();
        }
    });
};

exports.signin=function(req, res){
    var name=req.body.email;
    var pass= req.body.password;   
    var sql="SELECT * FROM siswa WHERE email='"+name+"' and password='"+pass+"'";
    
    db.query(sql, function(err, results){       
        if(results != ""){                      
            var data = JSON.stringify(results);
            var secret = 'TOPSECRETTTTT';
            var now = Math.floor(Date.now() / 1000),
            iat = (now - 10),
            expiresIn = 3600,
            expr = (now + expiresIn),
            notBefore = (now - 10),
            jwtId = Math.random().toString(36).substring(7);
            var payload = {
                iat: iat,
                data : data
            };            
            
            jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) {                          
                if(err){
                    res.json({
                        "results":
                        {
                            "status": false,
                            "pesan" : 'gagal generate token'
                        }                                                             
                    });
                } else {
                    if(token != false){
                        res.header('auth-token',token).json({
                            token:token
                        }); 
                        res.end();
                    }
                    else{
                        res.json({
                            "results":
                            {"status": false,"pesan" : 'tidak dapat membuat token'},                                                                               
                        });
                        res.end();
                    }
                    
                }
            });
        }
        else if(results == ""){
            res.json({
                "results":
                {"status": false, "pesan" : 'user tidak ditemukan'}                                          
            });
            res.end();
        }
    });
}

