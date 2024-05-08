const User = require("../models/User")
const bcrypt=require("bcryptjs")
const appError=require("../utiles/errors")
const status= require("../utiles/status")
const GenJWT=require("../utiles/generateJWT")
const asyncWrapper = require("../middlewares/asyncWrapper")

const register= asyncWrapper(async(req,res,next)=>{
    const { userName,email,password}= req.body;
    const oldUser= await User.findOne({email:email})
    if (oldUser){
        const error = appError.create("user alreay exist",400,status.FAIL);
          return next(error);
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
        userName,email,
        password:hashedPass
    })

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

const login =asyncWrapper(async(req,res,next)=>{
    const {email,password}=req.body;

    
    if(!email && !password){
        const error=appError.create("Email and password are required",400,status.ERROR)
        return next(error)
    }
    const user =await User.findOne({email:email})
    if (!user) {
        const error = appError.create("user not ffffound", 400, status.FAIL);
        return next(error);
      }
    const matchedPassWord=await bcrypt.compare(password,user.password)
    if (user&&matchedPassWord){
        const token=await GenJWT({  email: user.email,
                                    id: user._id,
                                    isAdmin:user.isAdmin})
        user.token=token
        return res.json({status:"Success",data:{user},token})
    } 
    if (!matchedPassWord)return res.json("password is wrong")
    
})


module.exports={
    register,
    login
}