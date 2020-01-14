
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, recipe_name: "Test Recipe 1"},
        {id: 2, recipe_name: "Test Recipe 2"},
        {id: 3, recipe_name: "Test Recipe 3"},
      ]);
    });
};
