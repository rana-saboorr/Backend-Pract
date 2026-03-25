const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    
    content: String,
    
});

module.exports = mongoose.model("todo",todoSchema);