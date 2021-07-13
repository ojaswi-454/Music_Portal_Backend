const router = require("express").Router();
const { register, verify } = require("../Authorisation/controllers/register");
const login = require("../Authorisation/controllers/login");
router.post("/register", register);
router.get("/verify/:id", verify);
router.post("/login", login);

module.exports = router;
