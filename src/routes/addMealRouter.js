import express from "express";
import upload from "../middlewares/multer.js";
import Meal from "../models/meal.js";
import userAuth from "../middlewares/auth.js";
import Cart from "../models/cart.js";

const addMealRouter = express.Router();

addMealRouter.post(
  "/restaurant/addMeal",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, category, description } = req.body;

      if (!req.file) {
        res.status(400).send("Image file required !");
      }

      const meal = new Meal({
        name,
        price,
        category,
        description,
        image: req.file.path,
      });

      await meal.save();

      res.status(201).json({
        message: "Meal added successfully",
        meal,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err);
    }
  },
);

addMealRouter.post("/mealDetail/:mealId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    // const { quantity } = req.body;
    const { mealId } = req.params;

    // const cart = new Cart({
    //   userId,
    //   items : [{meal:mealId,quantity}]
    // })

    // await cart.save()

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ meal: mealId, quantity: 1}],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.meal.toString() === mealId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ meal: mealId, quantity: 1 });
      }
    }

    await cart.save()

    res.json({
      message: "Meal Added to cart Successfully !",
      data: cart,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default addMealRouter;
