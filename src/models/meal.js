import mongoose from "mongoose";

const mealSchema = new  mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 50
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true
    }
})

const Meal = mongoose.model("Meal",mealSchema)

export default Meal