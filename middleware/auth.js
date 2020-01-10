const jwt = require('jsonwebtoken');
const User = require("../model/userModel");

exports.verifyUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      let err = new Error("Bearer token is not set!");
      err.status = 401;
      return next(err);
    }
    let token = authHeader.split(" ")[1];
    // console.log(token)
    let data;
    try {
      data = jwt.verify(token, process.env.TOKEN);
    } catch (err) {
      throw new Error("Token could not be verified!");
    }
    // console.log(data);
    User.findById(data._id)
    .then(next())
    .catch(new Error("ERROR"));
  };

exports.verifySingleUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      let err = new Error("Bearer token is not set!");
      err.status = 401;
      return next(err);
    }
    let token = authHeader.split(" ")[1];
    
    let data;
    try {
      data = jwt.verify(token, process.env.TOKEN);
    //   console.log(req.params.username)
      if(data.username === req.params.username){
          User.findOne({username: data.username}).then(
            next()
          )
        //   });
      }
    //   else{
    //       req.user = ""
    //     next();
    //   }
    } catch (err) {
      throw new Error("Token could not be verified!");
    }
    // console.log(data);
  };
  