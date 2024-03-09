"use strict";

var express = require("express");

var multer = require("multer");

var storageMulter = require("../../helpers/storageMulter.js");

var upload = multer({
  storage: storageMulter()
});
var router = express.Router();

var controller = require("../../controllers/admin/product.controller.js");

var validate = require("../../validate/admin/product.validate.js");

router.get("/", controller.indexProduct);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router["delete"]("/delete-item/:id", controller.deleteItem);
router.get("/create", controller.createProduct);
router.post("/create", upload.single('thumnail'), validate.createPost, controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single('thumbnail'), validate.createPost, controller.editPatch);
router.get("/detail/:id", controller.detail);
module.exports = router;