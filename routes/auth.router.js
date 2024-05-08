const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authController=require("../controllers/auth.controller")
const verfiyToken = require("../middlewares/verifyToken")
//REGISTER
router.route("/register").post(authController.register);

//LOGIN 
router.route("/login").post(authController.login);

module.exports = router;