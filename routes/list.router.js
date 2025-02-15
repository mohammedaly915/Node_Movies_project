const router=require("express").Router()
const listController=require("../controllers/list.controller")
const verifyToken=require("../middlewares/verifyToken")

// create + read

router.route("/").get(verifyToken,listController.getLists)
                 .post(verifyToken,listController.addList) 
                 
router.route("/:id")
                    .patch(listController.updateList)
                    .delete(listController.deleteList)

module.exports = router;