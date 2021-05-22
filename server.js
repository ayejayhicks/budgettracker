const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//we should set the value of MONGODB_URI on heroku (see "setting config variables in heroku")
//to this: (or something like it):
//"mongodb+srv://ajhicks0816:CannonGrae0816@cluster0.vlxo4.mongodb.net/budgettracker"
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budgettracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

console.log('this is the most updated version')
// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});