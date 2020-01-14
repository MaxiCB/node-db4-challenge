const db = require('../dbConfig');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('recipes');
}

function getById(id) {
  return db('recipes')
    .where({ id })
    .first();
}

function insert(recipe) {
  return db('recipes')
    .insert(recipe)
}

function update(id, changes) {
  return db('recipe')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('recipes')
    .where('id', id)
    .del();
}