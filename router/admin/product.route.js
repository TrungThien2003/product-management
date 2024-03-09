const express = require("express")
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter.js")
const upload = multer({storage: storageMulter()});

const router = express.Router();
const controller = require("../../controllers/admin/product.controller.js")
const validate = require("../../validate/admin/product.validate.js");

router.get("/", controller.indexProduct);

router.patch("/change-status/:status/:id",
    controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);

router.delete("/delete-item/:id", controller.deleteItem);
router.get("/create",controller.createProduct);
router.post("/create",upload.single('thumnail'),validate.createPost,controller.createPost);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",upload.single('thumbnail'),validate.createPost,controller.editPatch);
router.get("/detail/:id",controller.detail)
module.exports = router;