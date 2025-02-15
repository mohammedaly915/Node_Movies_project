const List=require("../models/List")
const status=require("../utiles/status")
const appError=require("../utiles/errors")
const asyncWrapper = require("../middlewares/asyncWrapper")

// get All Movies
 
const getLists=asyncWrapper(async(req,res)=>{
  const typeQueryList=req.query.type
  const genreQueryList=req.query.genre
  let list =[]
  if (typeQueryList) {
      if (genreQueryList) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQueryList, genre: genreQueryList } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQueryList } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  // const query = req.query;
  // const limit = query.limit || 10;
  // const page = query.page || 1;
  // const skip = (page - 1) * limit;
  // const movies = await List.find({}, { __v: false,password:false }).limit(limit).skip(skip);
  // res.json({ status: httpstatusText.SUCCESS, data: { movies } });
})


const addList=asyncWrapper(async(req,res)=>{
  const newMovie=new List(req.body)
  await newMovie.save();
  res.status(201).json({ status: status.SUCCESS, data: { movie: newMovie } });
})


const updateList = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedMovie = await List.findByIdAndUpdate(id, updatedData);

  if (!updatedMovie) {
    return res.status(404).json({ status: status.FAILURE, msg: "Movie not found" });
  }

  res.status(200).json({ status: status.SUCCESS, data: { movie: updatedMovie } });
});




const deleteList=asyncWrapper(async(req,res)=>{
    await List.deleteOne({_id:req.params.id})
    res.status(200).json({ status: status.SUCCESS, msg:"Movie deleted" });
}
)

module.exports={
    getLists,
    addList,
    updateList,
    deleteList
}