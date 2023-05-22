import mongoose from "mongoose";
const userScehma = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

const User = mongoose.model("user",userScehma);
export default User;