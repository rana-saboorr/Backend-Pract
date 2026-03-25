require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const userModel = require("./modules/user");
const todoModel = require("./modules/todo");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const sendMail =require("./utils/sendMail.js");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const cors = require("cors");
app.use(cors({origin: process.env.FRONTEND_URL,credentials: true}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/" , function(req, res){
    res.send("Wokring");
})


app.post("/signup", async function(req, res){
  let {name, username, email, password, age} = req.body;

  let user = await userModel.findOne({email});
  if(user){
     return res.status(400).send("USer already registered.");
  }

  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(password, salt, async function(err, hash){
        let newuser = await userModel.create({
            name,
            username,
            email,
            password: hash,
            age,
        });
        
        let token = jwt.sign({email: email, userid: newuser._id}, process.env.JWT_SECRET);
        res.cookie("token", token); /* { httpOnly: true, sameSite: "lax" } nhi prha abhi*/
        await sendMail(email, "Welcome to Todo App", `Hi ${name}, your account was created successfully!`);

        res.send(newuser);
    });
  });
});

app.post("/login", async function(req, res){
  let{email,password} = req.body;
  let user = await userModel.findOne({email});

  if(!user) return res.status(400).send("User Not Found.");

  bcrypt.compare(password, user.password, function(err, result){
    if(result){

        let token = jwt.sign({email:email, userid:user._id},process.env.JWT_SECRET);
        res.cookie("token", token);
        res.send(user);

    }else res.status(400).send("Password Incorrect");
  })

})



app.get("/logout", function(req,res){
    res.cookie("token","");
    res.send("Logged out");

});

function isLoggedIn(req, res, next){

    if(!req.cookies.token){
        return res.status(400).send("Please login first.");
    }

    try{
        let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
         req.user = data; 
        next();
    }
    catch(err){
        res.status(401).send("Invalid token");
    }
}


app.get("/todos", isLoggedIn, async function (req, res) {

  let user = await userModel.findOne({ email: req.user.email });
  let todos = await todoModel.find({ user: user._id });
  res.send(todos);
});



app.post("/todos", isLoggedIn, async function (req, res) {

  let user = await userModel.findOne({ email: req.user.email });

  let { content } = req.body;

  let todo = await todoModel.create({
    user: user._id,
    content,
  });

  user.todos.push(todo._id);
  await user.save();
  res.send(todo); 
});



app.delete("/todos/:id", isLoggedIn, async function (req, res) {
  const todoId = req.params.id;

  const todo = await todoModel.findById(todoId);
  if (!todo) return res.status(404).send({ message: "Todo not found" });
  
  await todoModel.findByIdAndDelete(todoId);
  await userModel.updateOne(
    { email: req.user.email },
    { $pull: { todos: todoId } }
  );
  const user = await userModel.findOne({ email: req.user.email });
  sendMail(
    user.email,
    "Todo Deleted",
    `Your todo "${todo.content}" was deleted`
  ).catch(err => console.error("Email failed:", err));

  res.send({ message: "Todo deleted" });
});


app.listen(process.env.PORT, function(req, res){
    console.log("It's Working for 3000 port.");
})