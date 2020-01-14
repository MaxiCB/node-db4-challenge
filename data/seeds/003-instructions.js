
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructions').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructions').insert([
        {id: 1, step: "Test Step 1", recipe_id: 1},
        {id: 2, step: "Test Step 1", recipe_id: 1},
        {id: 3, step: "Test Step 1", recipe_id: 1}
      ]);
    });
};
