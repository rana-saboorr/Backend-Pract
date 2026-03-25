const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());


app.get("/",function(req,res){
    let token = jwt.sign({email: "abcd@gmail.com"},"secret") // is secret ko hum sikhny ki waja say aisa yahn pr likh rhy hai other wise hum is ko aisa nhi likhty. is ki basis pr encrypt ho ga.
    console.log(token);
    res.cookie(token);
    res.send("done");
})


app.get("/read",function(req,res){
   let data = jwt.verify(req.cookies.token,"secret");
   console.log(data);
})






app.listen(3000);