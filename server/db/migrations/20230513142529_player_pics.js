/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('player_images', function(table) {
      table.increments('id').primary();
      table.string('player_id').unsigned();
      table.string('url');
      table.binary('data');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('player_images');
  };
  