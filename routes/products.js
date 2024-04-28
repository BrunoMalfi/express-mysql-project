const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/ProductController.js");

router.get('/showallproducts',ProductController.showAllProducts);
router.post("/newproduct", ProductController.newProduct);
router.put("/updateproduct",ProductController.updateProduct );
router.get('/showallproductswithcategory',ProductController.showAllProductsWithCategory)
router.get('/showallproductsdesc',ProductController.showAllProductsDesc)
router.get('/showproductbyid/:id',ProductController.showProductById)
router.get('/showproductbyname/:name',ProductController.showProductByName)
router.delete('/deleteproductbyid/:id',ProductController.deleteProductById)

module.exports = router;
