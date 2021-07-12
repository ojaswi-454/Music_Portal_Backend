const User = require("../model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ezymail.mailer@gmail.com",
    pass: "bhandari",
  },
});
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    var user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ Error: "User Already Exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedpassword,
      phone: phone,
    });
    await newuser.save();
    var link = process.env.SERVER_URL + "/verify/" + savedUser._id;
    var mailoptions = {
      from: "ezymail.mailer@gmail.com",
      to: user.email,
      cc: "namujain266@gmail.com",
      subject: "",
      html: "<a href=" + link + ">Click here to verify</a>",
    };
    transporter.sendMail(mailoptions, function (error, info) {
      if (error) {
        return res.status(400).json("Error:Email is not Valid");
      } else {
        console.log("Email sent" + info.response);
      }
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ Error: err.message });
  }
};
module.exports = register;
