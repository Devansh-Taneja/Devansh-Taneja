const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({path:"./.env"});
const path = require("path");
const app = express()
const port = 5000;








const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});



exports.register = (req,res)=>{
    console.log(req.body);
    const {name,email,password,passwordConfirm} =req.body;

    db.query("SELECT email FROM users WHERE email = ?",[email],async(error,result) => {
        if (error) {
            console.log(error)
        }
        if (result.length >0){
            return res.render("register"),{
                message: 'This email is already taken'
        }}
            else if (password != passwordConfirm){
                return res.render("register"),{
                    message: "Passwords do not match"
                }};

         let hasedPassword = await bcrypt.hash(password,8);
         console.log(hasedPassword)

         db.query("INSERT INTO users SET ?", {name:name, email:email , password:hasedPassword},(error,results) => {
         if (error) {
            console.log(error);
         }
         else{
            console.log(results);
            return res.render("register",{
                message: "User registered"
            });
         }
        })
        })
}
