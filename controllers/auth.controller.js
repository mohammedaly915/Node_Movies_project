const User = require("../models/User")
const bcrypt=require("bcryptjs")
const appError=require("../utiles/errors")
const status= require("../utiles/status")
const GenJWT=require("../utiles/generateJWT")
const asyncWrapper = require("../middlewares/asyncWrapper")

const register= asyncWrapper(async(req,res,next)=>{
    const { userName,email,password}= req.body;
     
    let errors = [];


    if (!userName) {
        errors.push("Username is required");
    }

    if (!email) {
        errors.push("Email is required");
    }

    if (!password) {
        errors.push("Password is required");
    }

    if (errors.length > 0) {
        const error = appError.create(errors.join(", "), 400, status.FAIL);
        return next(error);
    }
    const oldUser= await User.findOne({email})
    if (oldUser){
        const error = appError.create("user alreay exist",400,status.FAIL);
          return next(error);
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
        
        userName,
        email,
        password: hashedPass
    });

    /*const hashedPass = await bcrypt.hash(password, 10);

    // password: CryptoJS.AES.encrypt(
    //     req.body.password, 
    //     process.env.SECRET_KEY
    //   ).toString(),*/
    
    //genarate token
    const token = await GenJWT({   email: newUser.email,
                                        id: newUser._id,
                                        isAdmin:newUser.isAdmin});
    newUser.token = token;

    // save in database
    await newUser.save();
    res.status(201).json({ status: status.SUCCESS, data: { user: newUser },token });
}) 

// const login =asyncWrapper(async(req,res,next)=>{
//     const {email,userName,password}=req.body;
//     console.log(req.body);
    
    
//     if((!email || !userName) && !password){
//         const error=appError.create("Email and password are required",400,status.ERROR)
//         return next(error)
//     }
//     let user;
//     if (email) {
//         user = await User.findOne({ email: email });
//     } else if (userName) {
//         user = await User.findOne({ userName: userName });
//     }    
//       if (!user) {
//         const error = appError.create("user not found", 400, status.FAIL);
//         return next(error);
//       }
//     const matchedPassWord=await bcrypt.compare(password,user.password)
//     if (user&&matchedPassWord){
//         const token=await GenJWT({  identifier: email ? user.email : user.userName,
//                                     id: user._id,
//                                     isAdmin:user.isAdmin})
//         user.token=token
//         return res.json({status:"Success",data:{user},token})
//     } 
//     if (!matchedPassWord)return res.json("password is wrong")
    
// })


const login = asyncWrapper(async (req, res, next) => {
    const { identifier, password } = req.body; // Accept both email and username as "identifier"
    console.log(req.body);

    if (!identifier || !password) {
        const error = appError.create("Email/Username and password are required", 400, status.ERROR);
        return next(error);
    }

    // Find user by email or username
    const user = await User.findOne({
        $or: [{ email: identifier }, { userName: identifier }]
    });

    if (!user) {
        const error = appError.create("User not found", 400, status.FAIL);
        return next(error);
    }

    // Compare passwords
    const matchedPassWord = await bcrypt.compare(password, user.password);
    if (!matchedPassWord) {
        return res.status(400).json({ status: "FAIL", message: "Incorrect password" });
    }

    // Generate JWT Token
    const token = await GenJWT({
        identifier: user.email || user.userName,
        id: user._id,
        isAdmin: user.isAdmin
    });

    user.token = token;
    return res.json({ status: "Success", data: { user }, token });
});


module.exports={
    register,
    login
} 