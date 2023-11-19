const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config({path:"./.env"});
const path = require("path");
const app = express()
const port = 5000;

const session = require('express-session');

app.use(
    session({
        secret: 'your-secret-key',
        resave: true,
        saveUninitialized: true
    })
);

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect(error => {
    if (error){
        console.log(error)
    } else{
        console.log("Connected")
    }
});


const publicDirectory = path.join(__dirname,"./public")
app.use(express.static(publicDirectory))
app.set("view engine","hbs")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",require("./routes/pages"))

app.listen(port,() =>{
    console.log(`server started on port ${port}.`)
});
app.use("/auth",require("./routes/auth"))

app.get("/",(req,res) => {
    res.render("index")
});

app.get("/register",(req,res) => {
    res.render("register")
});



