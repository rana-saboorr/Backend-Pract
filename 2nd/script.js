// const fs = require('node:fs');
// file create krna
// fs.writeFile("hola.txt","hello jii", function(err){
//     if(err) console.error(err);
//     else console.log("done");
// })

//file mn likhy hoy k agy likhna
// fs.appendFile("fileName.txt","ki hal a", function(err){
//     if(err) console.error(err);
//     else console.log("done");
// })

//change name of the file
// fs.rename("fileName.txt","hello.txt",function(err){
//     if(err) console.error(err);
//     else console.log("done");
// })

//copy file
// fs.copyFile("hello.txt","./copy1/copy.txt",function(err){
//     if(err) console.error(err.message);
//     else console.log("done");
// })


// delete file k lia
// fs.unlink("hello.txt",function(err){
//     if(err) console.error(err.message);
//     else console.log("removed");
// })

//to delete empty folder (unempty folder not delete)
// fs.rmdir("./copy",function(err){
//     if(err) console.error(err.message);
//     else console.log("Directory Removed.");
// })
//to delete unempty folder
// fs.rmdir("./copy", {recursive:true} ,function(err){
//     if(err) console.error(err.message);
//     else console.log("Directory Removed.");
// })

//to read file
// fs.readFile("./hola.txt",function(err,data){
//     if(err) console.error(err.message);
//     else console.log("read file:" , data.toString() );
// }) // returns you buffer data bcz node returns raw data by defualt so use toString with it

// For Server
// const http = require('http')

// const server = http.createServer(function(req,res){
//     res.end("hello world");
// })
// server.listen(3000);



// const express = require('express');
// const app = express();

// app.use(function(req,res,next){ // function return kry ga and os mn req,res,next must
//     console.log("middleware chal ja yar");
//     next(); // ->/ yani page load to ga but agy request nhi gai os k lia next() lgana must hai
// });

// app.get('/',function(req,res){
//     res.send('hello ji ki hall aa')
// })
// app.get("/profile", function(req,res){
//    res.send("profile page");
// })
// app.get("/about", function(req,res,next){
//    console.error(err.stack)
//    res.status(500).send('something broke!')
// })
// app.use(function(err,req,res,next) {
// 	console.error(err.stack)
// 	res.status(500).send("Somthing Broke!");
// })

// app.listen(3000);




// const express = require("express");
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true})); 

