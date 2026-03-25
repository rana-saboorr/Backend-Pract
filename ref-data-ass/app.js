const express = require('express');
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test1");

const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/",function(req,res){
    res.send("hola hola");
})

app.get("/create",async function(req,res){
    let user = await userModel.create({
        username: "test",
        email: "a.@gmail.com",
        age: 13,
    })
    res.send(user);
})


app.get("/create/post",async function(req,res){
   let post = await postModel.create({
        postdata: "Hola hola, hoollank hehehe heh heh this is sample",
        user: "69a81e7cb4a9c02d97f7ac81",
 // post create ho ga and manually user id dy dy 
    })

    let user = await userModel.findOne({_id:"69a81e7cb4a9c02d97f7ac81"});
    user.posts.push(post._id);
     await user.save(); 
// post create ho gai ab user ko btany k lia k ap ki post hai to post ki id is user ko push kr di and manuall kam kia to save lgaya
    res.send({post, user});
})

app.listen(3000,function(req,res){
    console.log("It's Working on 3000");
});