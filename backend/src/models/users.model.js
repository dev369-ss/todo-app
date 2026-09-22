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
    password:{
        required:true,
        type:String
    },
    role:{
        required:true,
        type:String,
        enum:["user", "admin"],
        default: "user"
    }
}, {
    timestamps: true
});

userSchema.pre("save", async (next) =>{
  const salt = await bcrypt.genSalt(10);
  this.password= await bcrypt.hash(this.password,salt)
  next()
});

userSchema.methods.comparePassword= async (dataPassword) =>{
  return await bcrypt.compare(dataPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);




