import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import User from "../model/userScehma.js";
 dotenv.config();
const getAuth = async(req,res,next) =>{
    try{
        const token = req.headers.token;
        if(token){
            console.log(token);

        }
        const verifyToken = jwt.verify(token,process.env.SECRET);
        console.log(verifyToken);
        const auth = await User.findById(verifyToken.id)
        req.userId = verifyToken.id
        req.auth = auth
        next()
    } catch(err){
        res.status(401).json({error:"unauthorized"})
        }
}

export default getAuth