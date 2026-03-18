import express from 'express'
import userAuth from '../middlewares/auth.js';
import Meal from '../models/meal.js';
import Cart from '../models/cart.js';


const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth, async (req,res)=>{
    try {
        const user = req.user;

        res.send(user);


    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

profileRouter.get("/", userAuth, async(req,res) => {
    try {
        const meals = await Meal.find();

        res.send(meals);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

profileRouter.get("/mealDetail/:mealId",userAuth,async(req,res)=>{
    try {
        const {mealId} = req.params;

        const meal = await Meal.findById({_id:mealId})
        
        res.send(meal);
    } catch (error) {
        res.send()
    }
})

profileRouter.get("/cart", userAuth, async (req,res)=>{
    const userId = req.user._id
    try {
        const cart = await Cart.findOne({userId}).populate("items.meal");

        res.send(cart)
    } catch (error) {
        res.status(500).send(error.message);
    }
})

export default profileRouter