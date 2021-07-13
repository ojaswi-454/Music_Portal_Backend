const User = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(300).json({ Error: "Email is not Valid" });
    }
    if (!user.isverified) {
      return res.status(300).json({ Error: "You need to verify first" });
    }
    const verify = await bcrypt.compare(password, user.password);
    if (!verify)
      return res.status(400).json({ Error: "Password is not Valid" });
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    return res.status(200).json({ authToken: token, profile: user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ Error: err.message });
  }
};
module.exports = login;
