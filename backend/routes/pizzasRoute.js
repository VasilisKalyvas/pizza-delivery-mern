const express = require('express');
const router = express.Router();
const Item = require('../models/itemSchema')
var mongoose = require('mongoose');

router.get('/getallpizzas', async (req,res) => {
    try {
        const items = await Item.find({})
        res.send(items)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get("/getpizzabyid", async (req, res) => {
  const pizzaId = req.body.pizzaId;
  try {
    const pizza = await Item.findOne({ _id: pizzaId });
    res.send(pizza);
  } catch (error) {
    res.json({ message: error });
  }
});


router.post("/addpizza", async (req, res) => {
    const pizza = req.body.pizza;
    try {
      const newItem = new Item({
        name: pizza.name,
        image: pizza.image,
        varients: ["small", "medium", "larg"],
        description: pizza.description,
        category: pizza.category,
        prices: [pizza.prices],
      });
      await newItem.save();
      res.status(201).send("New Pizza Added");
    } catch (error) {
      res.json({ message: error });
    }
  });
  
  router.put("/updatepizza", async (req, res) => {
    let pizzaId = mongoose.Types.ObjectId(req.body.pizzaId);
    try {
      const pizza = await Item.findOne({ _id: pizzaId });
      const updatedData = { ...req.body, id: undefined };
      const result = await Item.findByIdAndUpdate(pizzaId, updatedData, {
        new: true,
      });
      res.status(200).send("Pizza Update Success");
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

  router.post("/deletepizza", async (req, res) => {
    const pizzaId = req.body.pizzaId;
    try {
      await Item.findOneAndDelete({ _id: pizzaId });
      res.status(200).send("Pizza Deleted");
    } catch (error) {
      res.status(404).json({ message: error });
    }
  });

  
module.exports = router