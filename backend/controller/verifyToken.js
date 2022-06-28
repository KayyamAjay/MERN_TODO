const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(400).send("Access Denied!");
    }
    const verified = jwt.verify(token,process.env.SECRET);
    if(verified){
        req.user = verified;
        next();
    }else{
        res.status(400).send('Invalid Token!');
    }
}

module.exports = verifyToken;