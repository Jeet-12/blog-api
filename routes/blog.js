import express from 'express'
import Blog from '../model/blogSchema.js';
import getAuth from '../middleware/auth.js';



const BlogRouter = express.Router();
BlogRouter.use(express.json());

const response = (res,status,result) =>{
   return res.status(status).json(result);
}

BlogRouter.get("/", async(req,res) =>{
        await Blog.find()
        .then(result =>{
        response(res,200,result);
    }).catch(err=>{
        response(res,400,{error:err})
    })
});
BlogRouter.post("/create",getAuth, async(req,res)=>{
    try {
    const {title,content,image} = req.body;
    if(title && content){
        console.log(req.userId);
        const blog = new Blog({
            title,content,image,user:req.userId
        })
        await blog.save();
        response(res,200,{msg:"blog created",blog:blog});
    }}catch(error) {
        response(res,400,error)
        }
});

BlogRouter.delete("/delete/:id",getAuth, async(req,res)=>{
    try {
    const blog = await Blog.findOneAndDelete({_id:req.params.id})
    if(!blog){
        response(res,400,{error:"blog not found"})
    }
    else{
    response(res,200,{error:"deleted successfully"})
    }
    }catch(error) {
        response(res,400,error)
        }
});

BlogRouter.put("/update/:id",getAuth, async(req,res)=>{
    const {title,content,image,} =req.body;
    await Blog.findOneAndUpdate({_id:req.params.id},{title,content,image}).then((rlt)=>response(res,200,{msg:"blog updated",blog:rlt}))
    .catch(err=>response(res,400,err))
   
});


export default BlogRouter