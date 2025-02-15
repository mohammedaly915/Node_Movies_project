const router=require("express").Router()
const MyListController=require("../controllers/MyList.controller")
const verifyToken=require("../middlewares/verifyToken")


// Get List for user 
router.route("/")
                .get(verifyToken,MyListController.getMyList)
                .post(verifyToken,MyListController.addMyList)

// add List for user 

// delete List For user
router.delete("/:id",verifyToken,MyListController.deleteMyList)

module.exports = router; 