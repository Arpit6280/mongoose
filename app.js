const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6637751291b38407e0d6c651")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://arpitsinghyadav19:arpitsinghyadav19@cluster0.ukwpzd9.mongodb.net/shop2?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    // const user = new User({
    //   name: "Arpit",
    //   email: "arpit@gmail.com",
    //   cart: {
    //     items: [],
    //   },
    // });
    // user.save();
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
