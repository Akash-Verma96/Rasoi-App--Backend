import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    restaurantName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    address:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    }
},
{timestamps: true}
)

const Restaurant = mongoose.model("Restaurant",restaurantSchema);

export default Restaurant;