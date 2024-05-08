const appError = require("../utiles/errors")
const status=require("../utiles/status")

module.exports=()=>{
    return (req,res,next)=>{
        if (!role){
            return next(appError.create("Role not Authrized",401,status.FAIL))
        }
        next() 
    }
}