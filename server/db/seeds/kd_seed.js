/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('fav_players').del()
  await knex('fav_players').insert([
    {player_id: '201142'},
  ]);
};
