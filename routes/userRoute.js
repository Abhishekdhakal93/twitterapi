const express = require("express");
const user = require("../controller/userController");
const auth = require("../middleware/auth")

var router = express.Router();

router
  .route("/signup")
  .get(user.getRegister)
  // .get((req,res)=>res.status(200).json({message:"User Page"}))
  .post(user.uploadProfile, user.registerUser);

router
  .route("/login")
  .get((req,res,next)=>{
    res.status(200).json({message:"LOGIN PAGE"})
  })
  .post(user.loginUser);

router
  .route("/:username")
  .get(auth.verifyUser,user.showUser)
  .patch(auth.verifySingleUser,user.updateUser)
  .delete(auth.verifySingleUser,user.deleteUser);

module.exports = router;
