const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  database: "azure_db",
});


const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");


const port = 8000;

const server = express();
// middlewares
server.use(cors());
server.use(express.json());

server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);

server.get("/", async (req, res) => {
  connection.query("SELECT * FROM azure_user",(err,result)=>{
    if (err){
      res.status(400).json({message:err.message});
      return;
    };
    res.status(200).json({message:"Amjilttai", result});
  });
});

server.get("/:id", async (req, res) => {
  const { id } = req.params;
  connection.query(`SELECT * FROM azure_user WHERE aid=${id}`,(err,result)=>{
    if (err){
      res.status(400).json({message:err.message});
      return;
    };
    res.status(200).json({message:"Amjilttai", result});
  });
});


server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
