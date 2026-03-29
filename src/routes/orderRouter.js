import express from "express";
import userAuth from "../middlewares/auth.js";
import Restaurant from "../models/restaurant.js";
import Meal from "../models/meal.js";
import Order from "../models/order.js";

const orderRouter = express.Router();

orderRouter.post("/payment", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      meals,
      restaurant,
      address,
      paymentMethod,
      paymentStatus,
      itemsPrice,
      deliveryCharge,
      totalPrice,
    } = req.body;

    const formattedMeals = meals.map((item) => ({
      mealId: item.meal._id,
      name: item.meal.name,
      price: item.meal.price,
      image: item.meal.image,
      quantity: item.quantity,
    }));
    

       const order = new Order({
            userId,
            restaurantId:restaurant,
            items:formattedMeals,
            address: {address:address},
            paymentMethod,
            paymentStatus,
            itemsPrice,
            deliveryCharge,
            totalPrice
       })

       const savedOrder = await order.save();

       res.json({
            message:"Order Detail saved successfully !",
            data: savedOrder
       })
  } catch (error) {
    res.status(500).send(error.message);
  }
});

orderRouter.get("/orders", userAuth, async(req,res)=>{
  try {
    const userId = req.user._id;

    const order = await Order.findOne({userId});

    res.send(order);

  } catch (error) {
    res.status(500).send(error.message);
  }
})

export default orderRouter;
