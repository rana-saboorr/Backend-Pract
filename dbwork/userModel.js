const mongoose = require('mongoose'); //node & db server mn communication krwana is ka kam

mongoose.connect(`mongodb://localhost:27017/test`); //mongodb connection server

const userSchema = mongoose.Schema({   //Structure / rules, schema is a method that accept an object, user k pass kia kia details hon gi
    name: String,
    username: String,
    email: String,
})

module.exports = mongoose.model("user",userSchema); // model crud operation perform krwai ga, is ka plural model bny ga e.g. users + schema btana hai

//crud operation routes mn krwany k lia yahn say export kro and where you wanna use 

// model: A bridge between your code and MongoDB collection