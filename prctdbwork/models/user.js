const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/pract`);

const userSchema = mongoose.Schema({
     imageurl: String,
     email: String,
     name: String,
})

module.exports = mongoose.model("user",userSchema);