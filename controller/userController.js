const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../model/userModel");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/users/");
  },
  filename: (req, file, cb) => {
    var imagename = Date.now() + file.originalname;
    var filetype = "";
    if (
      file.mimetype === "image/gif" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, imagename);
      // filetype = "gif";
    } else {
      cb();
    }
    // if () {
    //   filetype = "png";
    // }
    // if () {
    //   filetype = "jpg";
    // }
  }
});

var upload = multer({ storage: storage });
exports.uploadProfile = upload.single("profile_image");

// const auth = require('../auth')

exports.getRegister = async (req, res, next) => {
  const user = await User.find();
  try {
    res.status(200).json({
      status: "Success",
      //   requestTime: req.requestTime,
      result: user.length,
      data: user
    });
  } catch (error) {
    res.status(200).json({
      status: "Failure",
      responseTime: req.requestTime,
      message: error
    });
  }
};

exports.registerUser = (req, res, next) => {
  let password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      let err = new Error("Could not hash!");
      err.status = 500;
      return next(err);
    }
    console.log(req.file.filename);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      username: req.body.username,
      password: hash,
      profile_picture: req.file.filename,
      cover_picture: req.body.cover_image
    });
    user
      .save()
      .then(user => {
        let token = jwt.sign({ _id: user._id }, process.env.TOKEN);
        res.status(201).json({
          status: "Registration success!",
          user,
          token: token,
          request: {
            type: "GET",
            url: `http://localhost/user/${user.username}`
          }
        });
      })
      .catch(err => console.log(err));
  });
};

exports.showUser = (req, res, next) => {
  const user = User.findOne({ username: req.params.username });
  user
    .select("-_id name username email phone profile_picture cover_picture")
    .then(user => {
      res.status(200).json({
        user
      });
    });
};

exports.updateUser = (req, res, next) => {
  res.status(201).json({
    message: "Update Done"
  });
};
exports.deleteUser = (req, res, next) => {
  res.status(201).json({
    message: "Update Done"
  });
};

exports.loginUser = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user == null) {
        let err = new Error("User not found!");
        err.status = 401;
        return next(err);
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              let err = new Error("Incorrect Password!");
              err.status = 401;
              return next(err);
            }
            let token = jwt.sign(
              { username: user.username, _id: user._id },
              process.env.TOKEN,
              {expiresIn: "1h"}
            );
            res.json({
              status: "Login success!",
              token: token,
              request: {
                type: "GET",
                url: `localhost:3000/user/${user.username}`
              }
            });
          })
          .catch(next);
      }
    })
    .catch(next);
};
