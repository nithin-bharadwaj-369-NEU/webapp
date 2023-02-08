const express = require('express')
const router = express.Router()

const productController = require("../controllers/product");

router.get("/:id", productController.getProductInfo);

router.put("/:id", productController.putProductInfo);

router.patch("/:id", productController.patchProductInfo);

router.post("", productController.postProductInfo);

router.delete("/:id", productController.deleteProductInfo);

module.exports = router;
