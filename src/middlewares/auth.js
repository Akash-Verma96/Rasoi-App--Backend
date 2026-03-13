import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const userAuth = async (req,res,next)=>{
    try {
        const { token } = req.cookies;

        if(!token){
            return res.status(401).send("Please Login !!");
        }

        const decodedData = jwt.verify(token,process.env.JWT_SECRET);

        const {_id} = decodedData;

        const user = await User.findById({_id:_id});

        if(!user){
            return res.status(401).send("User not found !!");
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(400).send("ERROR : " + error.message)
    }
}

export default userAuth