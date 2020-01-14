const db = require('../dbConfig');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
  };
  
  function get() {
    return db('instructions');
  }
  
  function getById(recipe_id) {
    return db('instructions')
      .where({ recipe_id })
  }
  
  function insert(recipe) {
    return db('instructions')
      .insert(recipe)
  }
  
  function update(id, changes) {
    return db('instructions')
      .where({ id })
      .update(changes);
  }
  
  function remove(id) {
    return db('instructions')
      .where('id', id)
      .del();
  }