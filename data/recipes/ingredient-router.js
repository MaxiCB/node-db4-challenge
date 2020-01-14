const express = require('express');

const router = express.Router();

const Ingredient = require("./ingredient-model");

router.post("/", (req, res) => {
    const { ingredient, quantity } = req.body
  
    if(!ingredient){
      res.status(400).json({message: "Recipe needs ingredient field"})
    }
    if(!quantity){
        res.status(400).json({message: "Recipe needs quantity field"})
      }
  
    const ingredients = {
      ingredient: ingredient,
      quantity: quantity
    }
    Ingredient.insert(ingredients)
    .then(ingredient => res.status(201).json(ingredient))
    .catch(err => res.status(500).json({error: "Error creating ingredient"}))
  })

router.get('/', (req, res) => {
  Ingredient.get()
    .then(ingredient => res.status(200).json(ingredient))
    .catch(err => res.status(500).json({errorMessage: "Error fetching ingredients"}))
});

router.get('/:id', validatePostId, (req, res) => {
  Ingredient.getById(req.params.id)
    .then(ingredient => res.status(200).json(ingredient))
    .catch(err => res.status(500).json({errorMessage: "Error fetching ingredient with id"}))
});

router.get('/:id/ingredients', validatePostId, (req, res) => {
  Ingredient.getRecipes(req.params.id)
    .then(ingredient => res.status(200).json(ingredient))
    .catch(err => res.status(500).json({errorMessage: "Error fetching ingredient with id"}))
});

router.delete('/:id', validatePostId, (req, res) => {
  Ingredient.remove(req.params.id)
    .then(ingredient => {
      if(ingredient > 0){
        res.status(200).json({message: "ingredient deleted"})
      } else {
        res.status(400).json({errorMessage: "ingredient could not be deleted"})
      }
    })
    .catch(err => res.status(500).json({errorMessage: "Error deleting ingredient"}))
});

router.put('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  const { ingredient, quantity } = req.body;
  if(!ingredient){
    res.status(400).json({errorMessage: "Requires ingredient"})
  }
  if(!quantity){
    res.status(400).json({errorMessage: "Requires quantity"})
  }

  const ingredients = {
    ingredient: ingredient,
    quantity: quantity
  }

  Ingredient.update(id, ingredients)
    .then(ingredient => {
      if(ingredient){
        res.status(200).json({message: "ingredient Updated"})
      } else {
        res.status(404).json({errorMessage: "Could not update ingredient"})
      }
    })
    .catch(err => res.status(500).json({errorMessage: "Error updating ingredient"}))
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;

  Ingredient.getById(id)
    .then(ingredient => {
      if(ingredient){
        ingredientId = id;
        next();
      } else {
        res.status(400).json({ errorMessage: "Invalid ingredient id."})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "Error validating ingredient id."})
    })
}

module.exports = router;