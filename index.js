const express = require("express");
const cors=require("cors")
const app = express();
require("dotenv").config(); 
const mongoose = require("mongoose");
const authRouter=require("./routes/auth.router")
const userRouter=require("./routes/user.router")
const movieRouter=require("./routes/movie.router")
const listRouter=require("./routes/list.router")
const MyListRouter=require("./routes/myList.router")
const status=require("./utiles/status")

const url=process.env.MONGO_URL 
// mongoose.connect(url).then(()=>{
//     console.log("connecting to database" , url);
// })
// .catch((err) => {
//   console.error("Failed to connect to database", err);
// });
 //"_comment": "https://node-movies-project.onrender.com/api/",
 mongoose.connect(url)
    .then(async () => {
        const dbName = mongoose.connection.name;
        console.log("Connected to database:", dbName);

        // Log all collections in the database
        const collections = await mongoose.connection.db.collections();
        const collectionNames = collections.map(collection => collection.collectionName);
        console.log("Collections in the database:", collectionNames);
    })
    .catch((err) => {
        console.error("Failed to connect to database", err);
    });

app.use(cors())
app.use(express.json());

app.use("/api/auth",authRouter)
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listRouter); 
app.use("/api/mylist", MyListRouter); 

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