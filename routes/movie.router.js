const router=require("express").Router()
const movieController=require("../controllers/movie.controller");
const Movie = require("../models/Movie");
const verifyToken=require("../middlewares/verifyToken")
// create + read 

router.route("/").get(verifyToken,movieController.getMovies)
                 .post(verifyToken,movieController.addMovie)
                 
router.route("/find/:id").get(verifyToken,movieController.getMovie)
                    .patch(verifyToken,movieController.updateMovie)
                    .delete(verifyToken,movieController.deleteMovie)

router.route("/random").get(movieController.randomMovie)

module.exports=router  