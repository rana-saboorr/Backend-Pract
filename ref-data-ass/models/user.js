const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: [   
        {
            type: mongoose.Schema.Types.ObjectId, // posts aik array hai and os array ki type => id hai, mtlab id data type hai posts array ki, array of ids
            ref: 'post'   // aur wo id kis models say belong kry gi wo bhi mention krna hai is trha say,
        }  // id jo any wali hain wo is models say belong kry gain
    ],
})

module.exports = mongoose.model("user",userSchema);
