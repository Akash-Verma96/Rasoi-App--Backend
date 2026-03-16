import express from "express";
import upload from "../middlewares/multer.js";
import Meal from "../models/meal.js";

const addMealRouter = express.Router();

addMealRouter.post(
  "/restaurant/addMeal",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, category, description } = req.body;

      if(!req.file){
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
        console.log(err.message)
      res.status(500).send(err);
    }
  },
);

export default addMealRouter;
