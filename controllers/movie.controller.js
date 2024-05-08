const Movie=require("../models/Movie")
const status=require("../utiles/status")
const appError=require("../utiles/errors")
const asyncWrapper = require("../middlewares/asyncWrapper")

// get All (GET) Movies
  
const getMovies=asyncWrapper(async(req,res)=>{
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const movies = await Movie.find({}, { __v: false }).limit(limit).skip(skip);
    res.json({ status: status.SUCCESS, data: { movies } });
})

// Get one (GET) movie 
const getMovie=asyncWrapper(async(req,res,next)=>{
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        const error = appError.create("مش موجود", 404, status.FAIL);
        return next(error);
    }
    res.status(200).json(movie);
})

// get Random (GET) Movie
const randomMovie=asyncWrapper(async(req,res)=>{
    const type = req.query.type;
    let movie;
    if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
})

// Add (POST) Movie
const addMovie=asyncWrapper(async(req,res)=>{

    const newMovie=new Movie(req.body)
    await newMovie.save();
    res.status(201).json({ status: status.SUCCESS, data: { movie: newMovie } });
})

// Updata (PATCH) Movie
const updateMovie=asyncWrapper(async(req,res)=>{
    const updatedMovie=await Movie.updateOne(
        {_id:req.params.id},
        {$set:{...req.body}})
    return res.status(201).json({ status: status.SUCCESS, data: { movie: updateMovie } });

})

// Delete (DELETE) Movie
const deleteMovie=asyncWrapper(async(req,res)=>{
    await Movie.deleteOne({_id:req.params.id})
    res.status(200).json({ status: status.SUCCESS, msg:"Movie deleted" });
})


module.exports={
    getMovies,
    getMovie,
    randomMovie,
    addMovie,
    updateMovie,
    deleteMovie
}