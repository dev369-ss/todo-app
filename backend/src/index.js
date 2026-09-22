const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js")
const app = express();
//load environment variables
dotenv.config();
const port = process.env.PORT||8000;
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Hello from server")
})

app.use("/api",require("./routes/user.route.js"))

const startServer = async()=>{
await connectDB();

app.listen(port , ()=>{
  console.log("server is running on port",port)
});
}

startServer();
