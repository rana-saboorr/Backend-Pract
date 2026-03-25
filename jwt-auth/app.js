const cookieParser = require("cookie-parser");      // cookie read krny k lia
const bcrypt = require("bcrypt");                   // encrypt and decrypt k lia
const express = require("express");                 // routes, req,res, etc
const mongoose = require("mongoose");               // db
const app = express();                              // transfer all express functionalities to var app
const path = require("path");                       // path of directory
const usermodel = require("./models/user");         // modules require, schema 
mongoose.connect(`mongodb://localhost:27017/authapp`); // db connection
const jwt = require("jsonwebtoken");

app.use(express.json());                           // middleware, json readable 
app.use(express.urlencoded({extended: true}));     // middleware, url encoded data readable
app.set("view engine","ejs");                      // ejs file view k lia engine ko btana,
app.use(express.static(path.join(__dirname,'public'))); //project directory file path, and join it with public
app.use(cookieParser());                         //cookie parser help to read cookies

app.get("/", function(req,res){                     // on [/] show index.ejs from views
    res.render("index");   
})

app.post("/create",async function(req,res){              // [/create] 
    let {username, email, password, age} = req.body;      // read data from body, from /create page, assign value

    const exists = await usermodel.findOne({ email });   // check email for already existing
    if(exists) return res.send("Email already exists");  // if yes then 
    //encryption of password
    bcrypt.genSalt(10,function(err,salt){               // 10 = itni dfa password ko baar baar mix + encrypt kiya jata hai, salt = rendom string which add in our password
        bcrypt.hash(password,salt,async function(err,hash){   //Hash = password ka locked/encrypted version, hash function = megically mix our password and salt
             let createdUser = await usermodel.create ({
                username,
                email,
                password: hash,         // user same data say create ho ga just password yahn plain user input jo krta hai os ki jga hash[rendom] ay ga
                age,
            });  // salt aik bar generate ho ha but 10 times wo internally password say mix ho ga
            let token = jwt.sign({email},"rendom key")      //now server side say token generate hoa jis mn email hai , secret key kuch bhi hoti hai
            res.cookie("token", token)                      // and wo token cookie mn set kr dia hai
            res.send(createdUser);
        })
    })
})


app.get("/login",function(req,res){             // login render 
    res.render("login")
})

app.post("/login",async function(req,res){              // 
    let {email,password} = req.body;                    // read user input from frontend
    let user = await usermodel.findOne({email});        // check mail if find
    if(!user) return res.send("Something went Wrong.!"); // not user[email nhi mili], return wrong 

    bcrypt.compare(password, user.password, function(err,result){  // compare store rendom password with plain user password 
        if(result){                                                // true,
              let token = jwt.sign({email},"rendom key")            // token generate
            res.cookie("token", token)                               // token set in cookie
            res.send("yes you can login");                         //response
        }
        else res.send("Somthing is Wrong.")
    })

})

app.get("/logout",function(req,res){
    res.cookie("token","");  // set blank token in cookie
    res.redirect("/")
})


app.listen(3000);  //local host port


/*
mongoose
schema
model
usercreate -> passowrd -> hash
jwt token -> cookie

login -> token -> decrypt -> email
*/