const jwt = require("jsonwebtoken");

// payload ==>> email ,id , user , 
module.exports = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
  });
  return token; 
};  