const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());

app.use(express.static("public"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for form data

//Routes

// auth, login, create, update user info
app.use("/api/auth", require("./routes/auth"));
// add a picture
app.use("/api/upload", require("./routes/upload"));
// app.use("/api/picz", require("./routes/picz"));
// CRUD

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
