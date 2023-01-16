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

// getUser
app.use("/api/user", require("./routes/user"));

// CRUD

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
