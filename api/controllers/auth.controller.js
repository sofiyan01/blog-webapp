import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import  errorhandler  from "../utils/error.js"
import jwt from "jsonwebtoken"


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if all fields are present
  if (!username || !email || !password || username === "" || email === "" || password === "") {
    return next(errorhandler(400, "All Fields are Required"));
  }
  // if (password.length<8||password.length>15) {
    
  // }

  try {
    // Check if email already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return next(errorhandler(400, "Email Already Exists"));
    }

    // Check if username already exists
    const existName = await User.findOne({ username });
    if (existName) {
      return next(errorhandler(400, "Username Already Exists"));
    }

    // Hash the password
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    // Create and save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Respond with success
    return res.status(201).json({ success: true, message: "Signup Successful" });

  } catch (error) {
    return next(error); // Pass any other error to the error handler middleware
  }
};


export const Login=async(req,res,next)=>{

      const {email,password}=req.body

      if (!email||!password) {
        return next(errorhandler(400,"All fields are required"))
      }

      try {
       const validUser=await User.findOne({email})

       if (!validUser) {
        next(errorhandler(404,"User Not Found"))
       }   

      const validPassword=bcryptjs.compareSync(password,validUser.password)

       if (!validPassword) {
       return next(errorhandler(401,"Invalid Password"))
       }

    

        const token=jwt.sign({id:validUser._id},process.env.JWT_secret);
        const {password:pass,...rest}=validUser._doc
       
        res.status(200).cookie("access_token",token,
          {httpOnly:true}).json(rest)


      } catch (error) {
        next(error)
      }
    }

export const Google=async(req,res,next)=>{
    const {name,email,googlePhotoUrl}=req.body

    try {
      
      const user=await User.findOne({email})

      if (user) {
        const token=jwt.sign({id:user._id},process.env.JWT_secret)
        const {password,...rest}=user._doc
          res.status(200).cookie("access_token",token,{httpOnly:true}).json(rest)
      }else{
          const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
          const hashedPassword=bcryptjs.hashSync(generatedPassword,10)

          const newUser=new User({
            username:name.toLowerCase().split(" ").join("")+Math.random().toString(9).slice(-4),
            email,
            password:hashedPassword,
            profilePicture:googlePhotoUrl
          })

          await newUser.save();

          const token=jwt.sign({id:newUser._id},process.env.JWT_secret);
          
          const {password,...rest}=newUser._doc
          res.status(200).cookie("access_token",token,{
            httpOnly:true
          }).json(rest)
      } 
          

    } catch (error) {
      next(error)
    }
}