"use strict";

module.exports.createPost = function (req, res, next) {
  if (!req.body.title) {
    req.flash("error", "Vui l\xF2ng nh\u1EADp lai tr\u01B0\u01A1ng n\xE0y");
    res.redirect('back');
    return;
  } // console.log("ok");


  next();
};