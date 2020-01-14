const db = require('../dbConfig');

module.exports = {
    get,
    getById,
    getRecipes,
    insert,
    update,
    remove,
  };
  
  function get() {
    return db('ingredients');
  }

  function getRecipes(id) {
    return db('ingredients')
      .where({id: id})
  }
  
  function getById(recipe_id) {
    return db('ingredients')
      .where({ recipe_id })
  }
  
  function insert(recipe) {
    return db('ingredients')
      .insert(recipe)
  }
  
  function update(id, changes) {
    return db('ingredients')
      .where({ id })
      .update(changes);
  }
  
  function remove(id) {
    return db('ingredients')
      .where('id', id)
      .del();
  }