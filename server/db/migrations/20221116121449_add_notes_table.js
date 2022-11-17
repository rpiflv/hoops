/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('notes', (table) => {
            table.increments('id');
            table.string('note_content');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.integer("fav_player_id").references('id').inTable('fav_players')
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('notes')
};
