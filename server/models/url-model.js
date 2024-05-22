const mongoose = require("mongoose");
const User = require("./user-model");

const urlSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: User.modelName
    },
    originalUrl : {
        type : String,
        required : true
    },
    shortUrl : {
        type : String,
        require : true,
        uniqued : true
    },
    clicks : {
        type : Number,
        default : 0
    }, 
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const Url = new mongoose.model("url",urlSchema);

module.exports = Url;

