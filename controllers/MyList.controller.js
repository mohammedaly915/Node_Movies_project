const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/User");
const appError=require("../utiles/errors")
const status=require("../utiles/status")
const MyList =require("../models/MyList")
const mongoose = require('mongoose');

const getMyList=asyncWrapper(

async (req, res, next) => {
  console.log( "user" , req.currentUSer.id);
    try {
      console.log("list");
      const list = await MyList.find({ userId: req.currentUSer.id });
      console.log("list",list);
      if (!list) {
        const error=appError.create("not Found List" , 404 , status.FAIL)
        return next(error)
      }
      res.status(200).json(list);
    } catch (error) {
        const msgerror=appError.create(error , 400 , status.ERROR);
        return next(msgerror)
        
    }
  }
)

const addMyList=asyncWrapper(
  async (req, res) => {
    const { movieId} = req.body;
    const userId=req.currentUSer.id;
    console.log("id",userId);
    
    try {
       // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ message: 'Invalid movieId' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
      const user = await User.findById(userId);
      let list = await MyList.findOne({ userId});      
      if (!list) {
        list = new MyList({ userId, movieId: [movieId] });
      } else {
        if (list.movieId.includes(movieId)) {
          return res.status(400).json({ message: 'Movie already in the list' });
        }
          list.movieId.push(movieId);
          console.log("pushed");
          
      }
        console.log("user list");
        
        console.log(list);
        
        console.log("before...........done");
        await list.save();
        console.log("...........done");
      
      res.status(201).json({ message: 'Movie added to your list', list });
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.error('Validation Error:', error.message);
        return res.status(400).json({ message: 'Validation failed', error: error.message });
      }
      console.error("Save error:", error);
      res.status(500).json({ message: 'Error adding to list', error });
    }
  }
)

const deleteMyList=asyncWrapper(
    
//     async (req, res) => {
//     try {
//       const user = await User.findById(req.user.id);
//       user.myList = user.myList.filter(
//         movieId => movieId.toString() !== req.params.movieId
//       );
//       await user.save();
//       res.status(200).json(user.myList);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

async (req, res) => {
    const { movieId } = req.params;
  
    try {
      const list = await MyList.findOne({ userId: req.user.id });
      if (!list) {
        return res.status(404).json({ message: 'No list found for this user' });
      }
  
      // Remove the movie from the list
      list.items = list.items.filter((item) => item.movieId.toString() !== movieId);
      await list.save();
      res.status(200).json({ message: 'Movie removed from your list', list });
    } catch (error) {
      res.status(500).json({ message: 'Error removing from list', error });
    }
  }
)

module.exports={
    addMyList,
    deleteMyList,
    getMyList
}

