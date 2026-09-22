const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        required: true,
        type: String,
        unique: true,
        trim: true
    },
    phone:{
        required:true,
        type:String,
        trim:true
    },
    {
        
    }
}, {
    timestamps: true
})




