const User = require("../model");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.EmailAPI);
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "musicportalmnit@gmail.com",
//     pass: "mnitjaipur",
//   },
// });
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

    var link = process.env.SERVER_URL + "/verify/" + newuser._id;
    try {
      const msg = {
        to: email,
        from: "musicportalmnit@gmail.com",
        subject: "Verification",
        html: "<a href=" + link + ">Click here to verify</a>",
      };
      await sgMail.send(msg);
      await newuser.save();
      console.log("Email sent");
    } catch (err) {
      console.log(err);
      return res.status(400).json({ Error: "Email is not Valid" });
    }
    return res.status(200).json("Success: Done");
  } catch (err) {
    console.log(err);
    return res.status(400).json({ Error: err.message });
  }
};
const verify = async (req, res) => {
  await User.findOneAndUpdate({ _id: req.params.id }, { isverified: true });
  console.log("Done");
  return res.redirect(process.env.SITE_URL);
  // return res.redirect(process.env.SITE_URL + "/login");
};
module.exports.register = register;
module.exports.verify = verify;
