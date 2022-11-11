/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('fav_players', (table) => {
        table.renameColumn('playerId', 'player_id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable('fav_players', (table) => {
        table.renameColumn('player_id', "playerId")
    })
};
