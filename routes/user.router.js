const router = require("express").Router()
const User=require("../models/User")
const UserController=require("../controllers/user.controller")


router.route("/").get(UserController.getUsers)
                
router.route("/:id").get(UserController.getUser)
                    .patch(UserController.updateUser)
                    .delete(UserController.deleteUser) 

module.exports=router