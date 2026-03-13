import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 50
    },

    lastName : {
        type : String,
        required : true,
        minLength : 3 ,
        maxLength : 50
    },

    emailId : {
        type : String,
        required : true,
        lowerCase : true,
        unique : true,
        trim : true,

        validate(value){
            const isValidEmail = validator.isEmail(value);

            if(!isValidEmail){
                throw new Error('Email is not valid...');
            }
        }
    },

    password : {
        type : String,
        required : true
    },

    age : {
        type : Number,
        min : 12
    },

    gender : {
        type : String,
        validate(value){
            if(!["Male","Female","Other"].includes(value)){
                throw new Error("Gender is not gender...");
            }
        }
    }

})

userSchema.methods.getJWT =  function(){
    const user = this

    const secretKey = process.env.JWT_SECRET

    const token =  jwt.sign({_id : user._id}, secretKey, {expiresIn : "7d"});

    return token;
}

userSchema.methods.isValidPassword = async function (password){
    const user = this

    const isValid = await bcrypt.compare(password,user.password)

    return isValid;
}

export default mongoose.model("User",userSchema);
