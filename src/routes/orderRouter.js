import express from 'express'
import userAuth from '../middlewares/auth.js';
import Restaurant from '../models/restaurant.js';
import Meal from '../models/meal.js';

const orderRouter = express.Router();

orderRouter.post("payment", userAuth, async (req,res)=>{
    try {
       
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

export default orderRouter;