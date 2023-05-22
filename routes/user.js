import express from 'express'
import User from '../model/userScehma.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import getAuth from '../middleware/auth.js';
dotenv.config();
const UserRouter = express.Router();
UserRouter.use(express.json());

UserRouter.get("/",async(req,res)=>{
    await User.find().then((result)=>{
        res.status(200).json(result);
    })
    .catch((err) =>{
        res.status(400).json(err);
    })
})
UserRouter.post("/register",async(req,res)=>{
    const{name,email,password} = req.body;
    try {
        if(name && email && password){

        
        const hashpass = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashpass})
        res.status(200).json({msg:"user register successfully",user:user});
        }
        else{
            res.status(400).json({msg:"All Fields are required"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:"error"});
    }
})
UserRouter.post("/login",async(req,res)=>{
    try {
        const{email,password} = req.body;
        const existUser = await User.findOne({email});
        if(!existUser){
            res.status(400).json({msg:"nothing is found"});
        }
        const pass = await bcrypt.compare(password,existUser.password)
        if(!pass){
            res.status(400).json({msg:"something went wrong"});
        }
        const token = jwt.sign({id:existUser._id},process.env.SECRET)
        res.status(200).json({msg:"Found",token:token});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:"error"});
    }
})

UserRouter.get("/auth", getAuth, (req, res)=>{
    res.status(200).json(req.auth)
})

export default UserRouter;