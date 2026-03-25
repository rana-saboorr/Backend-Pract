const express = require("express");
const fs = require("fs");
const path = require("path"); // by require -> CJS

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended:true})); // use as a middleware to make readable data to server side [ hello%20world ]

app.use(express.static(path.join(__dirname,'public'))); // path & join to dir public and static things images, sheets etc
app.set("view engine", "ejs");  // ejs ko render krny k lia

app.get("/",function(req,res){ //when render [/] page
    fs.readdir("./files",function(err,files){ //read dir -> files
        if(err) return console.error(err.message); // error 
        else res.render("index",{files: files}); //render index also send files from folder files by files name
    })
})

app.get("/file/:filename",function(req,res){  //dynamic routing -> kuch data render kro na k pora route kro
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){ //filesystem readfile, ap ki routing mn filename hai to params,utf-8 to display in english otherwise it display in buffer, 
        res.render('show',{filename: req.params.filename, filedata: filedata}); //render show page,send filename, with filename from routing, file data
    })
})

app.get("/edit/:filename",function(req,res){  //dynamic routing,
   res.render("edit",{filename: req.params.filename}) // render edit, send filename through params ->routing mn hai
})

app.post("/edit",function(req,res){ //post method in edit.ejs,
    fs.rename(`./files/${req.body.previous.trim()}`,`./files/${req.body.new}`, function(err){ //filesystem,rename,path-> front-end pr hai agr ap editpage mn jao prv file name, osi mn new file name bhi , set file names kia hai
        if(err) console.error(err);
        else res.redirect("/"); //show [/] page
    })
})

app.post("/create",function(req,res){  // route create,
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt` , req.body.details ,function(err){ //filesystem,writefile,path,front end say data ly rha hai, agr space hai to split like in array convert kr do and join again. make txt and osi trha put details in file -> input [name] use kia hai 
        if(err) console.error(err.message);
        else res.redirect("/");
    });  
})



app.listen(3000,function(req,res){ //is port pr page load ho
    console.log("it's working")
})
