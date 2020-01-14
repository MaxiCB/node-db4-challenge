const express = require('express');

const router = express.Router();

const Recipe = require("./recipe-model");
const Ingredient = require("./ingredient-model");
const Instructions = require("./instructions-model");

router.post("/", (req, res) => {
  const { recipe_name } = req.body

  if(!recipe_name){
    res.status(400).json({message: "Recipe needs recipe_name field"})
  }

  const recipe = {
    recipe_name: recipe_name
  }
  Recipe.insert(recipe)
  .then(recipe => res.status(201).json(recipe))
  .catch(err => res.status(500).json({error: "Error creating recipe"}))
})

router.get('/', (req, res) => {
  Recipe.get()
    .then(recipes => res.status(200).json(recipes))
    .catch(err => res.status(500).json({errorMessage: "Error fetching recipe"}))
});

router.get('/:id', validatePostId, (req, res) => {
  Recipe.getById(req.params.id)
    .then(recipes => res.status(400).json(recipes))
    .catch(err => res.status(500).json({errorMessage: "Error fetching recipe with id"}))
});

router.get('/:id/shoppingList', validatePostId, (req, res) => {
  const { id } = req.params
  Recipe.getById(id)
    .then(recipe => {
      if(recipe){
        Ingredient.getById(id)
        .then(ingredients => res.status(200).json(ingredients))
      } else {
        res.status(404).json({ message: "Failed to find recipe"})
      }
    })
    .catch(err => res.status(500).json({errorMessage: "Error fetching recipe with id"}))
});

router.get('/:id/instructions', validatePostId, (req, res) => {
  const { id } = req.params
  Recipe.getById(id)
    .then(recipe => {
      if(recipe){
        Instructions.getById(id)
        .then(ingredients => res.status(200).json(ingredients))
      } else {
        res.status(404).json({ message: "Failed to find recipe"})
      }
    })
    .catch(err => res.status(500).json({errorMessage: "Error fetching recipe with id"}))
});

router.delete('/:id', validatePostId, (req, res) => {
  Recipe.remove(req.params.id)
    .then(recipes => {
      if(recipes > 0){
        res.status(200).json({message: "Recipe deleted"})
      } else {
        res.status(400).json({errorMessage: "Recipe could not be deleted"})
      }
    })
    .catch(err => res.status(500).json({errorMessage: "Error deleting recipe"}))
});

router.put('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  const { recipe_name } = req.body;
  if(!recipe_name){
    res.status(400).json({errorMessage: "Recipe requires text"})
  }

  const recipe = {
    recipe_name: recipe_name
  }

  Recipe.update(id, recipe)
    .then(recipe => {
      if(recipe){
        res.status(200).json({message: "Recipe Updated"})
      } else {
        res.status(404).json({errorMessage: "Could not update recipe"})
      }
    })
    .catch(err => res.status(500).json({errorMessage: "Error updating recipe"}))
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;

  Recipe.getById(id)
    .then(recipe => {
      if(recipe){
        recipeId = id;
        next();
      } else {
        res.status(400).json({ errorMessage: "Invalid recipe id."})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "Error validation recipe id."})
    })
}

module.exports = router;