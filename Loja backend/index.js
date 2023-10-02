const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { default: mongoose } = require("mongoose");
const router = require("./Router/routes");


// Plugins Start
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
// Plugins End

//app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.static('dist'));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/index.html'));
})

app.use("/api", router);

const PORT = process.env.PORT || "3001";


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Running");
    app.listen(process.env.PORT, console.log("Server Running"));
  })
  .catch((error) => console.log(error));
