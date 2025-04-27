const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwt_secret = process.env.JWT_SECRET;
const authMiddleware = async (req, res, next)=>{
    const userAuth = req.headers.authorization;
    if(!userAuth || !userAuth.startsWith('Bearer')){
        return res.status(400).json({
            message: "error"
        })
    }else{
        try{
            const token = userAuth.split(' ')[1];
            const decode = jwt.verify(token, jwt_secret);
            req.userId = decode.userId;
            next();
        }catch(error){
            res.status(400).json({
                message: error
            })
        }
    }
}
module.exports = {
    authMiddleware
}