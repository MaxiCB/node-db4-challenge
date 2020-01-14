
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {id: 1, ingredient: 'Test Ingredient 1', quantity: 2, recipe_id: 1},
        {id: 2, ingredient: 'Test Ingredient 2', quantity: 2, recipe_id: 1},
        {id: 3, ingredient: 'Test Ingredient 3', quantity: 2, recipe_id: 1}
      ]);
    });
};
