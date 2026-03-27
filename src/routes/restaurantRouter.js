import express from 'express'
import userAuth from '../middlewares/auth.js';
import Restaurant from '../models/restaurant.js';

const restaurantRouter = express.Router();

restaurantRouter.post("/restaurant/Profile",userAuth, async(req,res)=>{
   try {
        const owner = req.user._id;

        const {restaurantName,description,address,state,city,pincode} = req.body;
        
        const restaurant = new Restaurant({
            owner,
            restaurantName,
            description,
            address,
            state,
            city,
            pincode
        })

        const data = await restaurant.save();

        res.status(201).json({
            message:"Restaurant data save successfully !",
            data: data
        })
   } catch (error) {
        res.status(500).send(error.message);
   }
})

restaurantRouter.get("/restaurant/Dashboard", userAuth, async(req,res)=>{
    try {
        const userId = req.user._id;

        const user = await Restaurant.findOne({owner:userId});

        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

export default restaurantRouter;