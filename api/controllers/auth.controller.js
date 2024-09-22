import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import  errorhandler  from "../utils/error.js"


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if all fields are present
  if (!username || !email || !password || username === "" || email === "" || password === "") {
    return next(errorhandler(400, "All Fields are Required"));
  }

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


export const Login=async(req,res)=>{

}

export const Logout=async(req,res)=>{

}