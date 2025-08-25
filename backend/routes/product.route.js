const express = require("express");
const { productValidation } = require("../middlewares/productValidation");
const { addProduct, getProduct } = require("../controllers/product.controller");
const { requireAuth } = require("../middlewares/authenticateProduct");
const router = express.Router();

router.post("/product", productValidation, addProduct);
router.get("/products", requireAuth, getProduct);

module.exports = router;
