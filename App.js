const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
mongoose.connect(
  "mongodb+srv://admin-naman:" +
    process.env.CLUSTER_PASSWORD +
    "@cluster0.3djy5.mongodb.net/MusicPortalDB?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("Database connected.");
  }
);

app.get("/", function (req, res) {
  res.send("Hello");
});
app.listen(3000, function (req, res) {
  console.log("Running");
});
