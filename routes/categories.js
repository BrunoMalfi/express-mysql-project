const express = require('express');
const router = express.Router();
const CategoryController = require("../controllers/CategoryController.js");

router.get('/showallcategories',CategoryController.showAllCategories)
router.post("/newcategory", CategoryController.newCategory);
router.put("/updatecategory",CategoryController.updateCategory );
router.get('/showcategorybyid/:id',CategoryController.showCategoryById)


module.exports = router;