const express = require("express");
const app = express();

const path = require("path");

// setting parsers for form
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// static files yahn  mily gin (full path)
app.use(express.static(path.join(__dirname,'public')));
// setup ejs as a view engine
app.set("view engine", "ejs"); // we render ejs pages

app.get("/",function(req,res){
    res.render("index"); //-> ejs ki madad say ya index file jo view mn hai page-> / k lia kam kry gi 
})


//dynamic routing =>

app.get("/profile/username",function(req,res){
    res.send("Chal rha hai.")
})

// opr waly ko dynamic bnany k lia jis part ko dynamic bnana hai os k agy colon lga do -> wo variable consider ho ga

app.get("/profile/:username",function(req,res){
    res.send(`Welcome, ${req.params.username}`)
})

app.get("/author/:username/:age", function(req,res)
{
    res.send(`Author: ${req.params.username}, Age: ${req.params.age}`)
})

app.listen(3000,function(){
    console.log("it's working");
})

