const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // const user = await UserModel.find({ email });// always return array whether it is empty or full
    const user = await UserModel.findOne({ email }); // return obj if find else null

    if (user) {
      return res.status(409).send({
        message: "User is already exist, you can login",
        success: false,
      });
    }

    const userData = new UserModel({ name, email, password });
    userData.password = await bcrypt.hash(password, 10);
    await userData.save();
    return res.status(201).send({ message: "Signup Success", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Internal server error and Error is -${error}`,
      success: false,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).send({ message: errorMsg, success: false });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(403).send({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    return res.status(200).send({
      message: "Login Success",
      success: true,
      token: jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { userLogin, userSignUp };
