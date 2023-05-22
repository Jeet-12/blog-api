import mongoose from "mongoose";
const blogScehma = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    createtime:{
        type:Date,
        default:Date.now,
    }
});

const Blog = mongoose.model("blog",blogScehma);
export default Blog;