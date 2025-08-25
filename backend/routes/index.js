const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");
const productRoutes = require("./product.route");

// Mount all feature routes here
router.use("/user", userRoutes);
router.use("/product", productRoutes);

module.exports = router;
