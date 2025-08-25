const ProductModel = require("../models/product.model");

const getProduct = async (req, res) => {
  try {
    console.log("---logged in user---", req.user);
    const products = await ProductModel.find();
    if (!products.length) {
      return res
        .status(404)
        .send({ message: "No Products found", success: false });
    }
    return res.status(200).send({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).send({
      message: "Server error while fetching products",
      success: false,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = new ProductModel({ name, price });
    const savedProduct = await newProduct.save();
    return res.status(201).send({
      message: "Product Created!!",
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res
      .status(500)
      .send({ message: "Server error while adding product", success: false });
  }
};

module.exports = { getProduct, addProduct };
