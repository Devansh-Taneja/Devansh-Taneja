const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({path:"./.env"});
const path = require("path");
const { promisify } = require("util");
const app = express()
const port = 5000;


const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async(req,res)=>{
    try{
        const{email,password} = req.body;
        if(!email || !password){
            return res.status(400).render('login',{
                meassage: 'Please provide and email and password'
            })
        }
        db.query("SELECT * FROM users WHERE email = ?",[email],async(error,result) => {
            console.log(result);
            if(!result ||!(await bcrypt.compare(password,result[0].password))){
                res.status(401).render ('login',{
                    message:'Email or Password is incorrect'
                })
            }else{
                const id= result[0].id;
                const token =jwt.sign({id},process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("The token is:"+token);
                const cookieOptions={
                    expires: new Date(
                        Date.now()+process.env.JWT_COOKIE_EXPIRES *24*60*60*1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt',token,cookieOptions);
                res.status(200).redirect("/profile");

                }
            })
    }catch(error){
        console.log(error);
    }
}


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
exports.logout=async(req,res)=>{
    res.cookie('jwt','logout',{ 
        expires: new Date(Date.now()+2*1000),
        httpOnly: true
    });
    res.status(200).redirect('/');
}
exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).redirect('/');
};

exports.isLoggedIn = async (req, res, next) => {
    console.log("this is the cookies: " , req.cookies);

    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            console.log(decoded);

            // Promisify the database query
            const queryAsync = promisify(db.query).bind(db);
            const result = await queryAsync('SELECT * FROM users WHERE id = ?', [decoded.id]);

            if (!result || result.length === 0) {
                return next();
            }

            req.user = result[0];
            console.log("User is:");
            console.log(req.user);
            return next();
        } catch (error) {
            console.error(error);
            return next(error); // Pass error to error-handling middleware
        }
    } else {
        next();
    }
};