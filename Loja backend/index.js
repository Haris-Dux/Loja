const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { default: mongoose } = require("mongoose");
const router = require("./Router/routes");


// Plugins Start
app.use(cors({
  methods:['POST','GET'],
  credentials:true
}));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.resolve(__dirname,'dist')));
app.get('*',(req,res)=>res.sendFile(path.resolve('dist','index.html')));
// Plugins End

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api", router);

const PORT = process.env.PORT || "3001";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Running");
    app.listen(process.env.PORT, console.log("Server Running"));
  })
  .catch((error) => console.log(error));
