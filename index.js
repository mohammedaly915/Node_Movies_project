const express = require("express");
const app = express();
require("dotenv").config(); 
const mongoose = require("mongoose");
const authRouter=require("./routes/auth.router")
const userRouter=require("./routes/user.router")
const movieRouter=require("./routes/movie.router")
const listRouter=require("./routes/list.router")
const status=require("./utiles/status")

const url=process.env.MONGO_URL
mongoose.connect(url).then(()=>{
    console.log("connecting to database");
})
app.use(express.json());

app.use("/api/auth",authRouter)
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listRouter);

app.all("*", (req, res, next) => {
    return res
      .status(404)
      .json({
        status: status.FAIL,
        message: "this Router is not available",
      });
  }); 
app.use((error, req, res, next) => {
    return res
      .status(error.statusCode || 500)
      .json({
        status: error.statusText || status.ERROR,
        message: error.message,
      });
  });

 
app.listen(5000,"localhost",()=>{
    console.log("http://localhost:5000/api/auth");
    console.log("http://localhost:5000/api/users");
    console.log("http://localhost:5000/api/movies");
    console.log("http://localhost:5000/api/lists");
})