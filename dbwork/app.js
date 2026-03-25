const express = require("express");
const app = express();
const userModel = require("./userModel"); //db mn users k name say ho ga os mn data ho ga


app.get("/", function(req,res){
    res.send("hola, this is / page");
})

app.get("/create",async function(req,res){
    let createduser = await userModel.create({ 
        name:"test",
        email:"test@gmail.com",
        username:"test12",
    })// create-> function,os mn obj pass kia jis mn data hai,this is async code hai mongoose walo ny kha hai//crud mongoose ka async code hi ho ga hamisha,is lia async await lg do ab ya line by line chaly ga
    res.send(createduser);
})

app.get("/read", async function(req,res){
    let users = await userModel.find(/*eidhr username dainy say aik hi mily ga*/);  // find return all users data, findOne ap ko object dy ga and just first one in db hi dy ga.
    res.send(users); //return an array of all users data in db
})

app.get("/update",async function(req,res){
   let updateduser = await userModel.findOneAndUpdate({username: "test12"},{name:"test updated"},{ new: false }) //(findone,update,new)->updated user mily ga, new false then osi mn change, true same new and update where need, 
    res.send(updateduser)
})

app.get("/delete",async function(req,res){
   let deleteUser = await userModel.findOneAndDelete({name: "test updated"});
   res.send(`Delete User Data: ${deleteUser}`);
})


app.listen(3000);



// createduser dy ga

// {
//   "name": "test",
//   "username": "test12",
//   "email": "test@gmail.com",
//   "_id": "699dc437f68d61e32301d55d", //699dc4=time stamp, baki machine info, user info,process related info
//   "__v": 0
// }