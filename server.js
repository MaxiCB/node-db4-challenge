const express = require('express');

const RecipeRouter = require('./data/recipes/recipe-router');
const InstructionRouter = require('./data/recipes/instruction-router');
const IngredientsRouter = require('./data/recipes/ingredient-router');

const server = express();

server.use(express.json());

server.use('/api/recipes', RecipeRouter);
server.use('/api/instructions', InstructionRouter);
server.use('/api/ingredients', IngredientsRouter);

module.exports = server;