const jwt = require('jsonwebtoken');
var secret = 'TOPSECRETTTTT';
module.exports= function(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('assess ditolak');

    try{
        const verified = jwt.verify(token,secret);
        req.user = verified;
        next();
    }catch(err){
        res.status(402).send('token salah');
    }
}