const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    postdata: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,    // is ki datatype id hai jo user say ay gin
        ref: "user"     //  is ka mtlab user mn bhi id hain jo usermodel say ay gin, 
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("post",postSchema);
