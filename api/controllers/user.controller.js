import bcryptjs from "bcryptjs"
import errorhandler from "../utils/error.js"
import User from "../models/user.model.js"


export const updateUser=async(req,res,next)=>{
        
        if (req.user.id!==req.params.userId) {
            return next(errorhandler(401,"You can update only your own profile"))
        }
        if (req.body.password) {
                if (req.body.password.length<6) {
                    return next(errorhandler(400,"password must be atleast 6 characters"))
                }
                req.body.password=bcryptjs.hashSync(req.body.password,10)
            }

            if (req.body.username) {
                if(req.body.username.length<7||req.body.username.length>20){
                    return next(errorhandler(400,"username must be between 7 to 20 characters"))
                }
                if (req.body.username.includes(" ")) {
                    return next(errorhandler(400,"username cannot contain spaces"))
                }
                if (req.body.username!==req.body.username.toLowerCase()) {
                    return next(errorhandler(400,"username must be lowercase"))
                }
                if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
                    return next(errorhandler(400,"username can only contain letters and numbers"))
                }
        
                try {

                    const updatedUser=await User.findByIdAndUpdate(req.params.userId,{
                        $set:{
                            username:req.body.username,
                            email:req.body.email,
                            profilePicture:req.body.profilePicture,
                            password:req.body.password
                        }
                    },{new:true})
                    const {password,...rest}=updateUser._doc
                    res.status(200).json(rest,"username Updated")
    
                } catch (error) {
                    next(error)
                }
        
            }
            
        
}