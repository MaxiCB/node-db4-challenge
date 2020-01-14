const express = require('express');

const router = express.Router();

const Instructions = require("./instructions-model");

router.post("/", (req, res) => {
    const { step } = req.body
  
    if(!step){
      res.status(400).json({message: "instruction needs step field"})
    }
  
    const instruction = {
        step: step
    }
    Instructions.insert(instruction)
    .then(recipe => res.status(201).json(recipe))
    .catch(err => res.status(500).json({error: "Error creating instruction"}))
  })

router.get('/', (req, res) => {
  Instructions.get()
    .then(instruction => res.status(200).json(instruction))
    .catch(err => res.status(500).json({errorMessage: "Error fetching instruction"}))
});

router.get('/:id', validatePostId, (req, res) => {
  Instructions.getById(req.params.id)
    .then(instruction => res.status(400).json(instruction))
    .catch(err => res.status(500).json({errorMessage: "Error fetching instruction with id"}))
});

router.delete('/:id', validatePostId, (req, res) => {
  Instructions.remove(req.params.id)
    .then(instruction => {
      if(instruction > 0){
        res.status(200).json({message: "instruction deleted"})
      } else {
        res.status(400).json({errorMessage: "instruction could not be deleted"})
      }
    })
    .catch(err => res.status(500).json({errorMessage: "Error deleting instruction"}))
});

router.put('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  const { step } = req.body;
  if(!step){
    res.status(400).json({errorMessage: "instruction requires step"})
  }

  const instruction = {
    step: step
  }

  Instructions.update(id, instruction)
    .then(instruction => {
      if(instruction){
        res.status(200).json({message: "instruction Updated"})
      } else {
        res.status(404).json({errorMessage: "Could not update instruction"})
      }
    })
    .catch(err => res.status(500).json({errorMessage: "Error updating instruction"}))
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;

  Instructions.getById(id)
    .then(instruction => {
      if(instruction){
        instructionId = id;
        next();
      } else {
        res.status(400).json({ errorMessage: "Invalid instruction id."})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "Error validating instruction id."})
    })
}

module.exports = router;