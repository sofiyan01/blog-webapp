import jwt from "jsonwebtoken"
import errorhandler from "./error.js"


 const verifyUser=(req,res,next)=>{
        const token=req.cookies.access_token;

        if (!token) {
        return next(errorhandler(401,"Unauthorized"))
        }
        
        jwt.verify(token,process.env.JWT_secret,(err,user)=>{
            if (err) {
                return next(errorhandler(401,"Unauthorized"))
            }
            req.user=user
            next();
        })

        
}

export default verifyUser