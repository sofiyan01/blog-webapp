import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorhandler } from "../utils/error.js"

export const signup=async(req,res,next)=>{

    const {username,email,password}=req.body

    if (!username || !email || !password || username===""||email===""||password==="") {
      next( errorhandler(400,"All Fields are Required"))
    }
  
    const exist=await User.findOne({email})
    if (exist) {
        next(errorhandler(400,"Email Already Exist"))
    }

    const existName=await User.findOne({username})
    if (existName) {
        next(errorhandler(400,"Username Already Exist"))
    }


    if (password.length<8) {
        next(errorhandler( 400,"password should be min 8 characters"))
    }

    var salt = bcryptjs.genSaltSync(10);
    var hashedPassword = bcryptjs.hashSync(password, salt);

    try {

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })
    
        await newUser.save()
        next(errorhandler(201,"Signup Successfully"))     
    } catch (error) {
        next(error);
        
    }
    
    // const exist=await User.findOne({email})

    // if (exist) {
    //     res.send("User Already Exist")
    // }

   
}

export const Login=async(req,res)=>{

}

export const Logout=async(req,res)=>{

}