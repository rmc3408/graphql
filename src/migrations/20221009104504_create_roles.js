exports.up = function (knex) {
  return knex.schema.createTable('roles', function (table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable().unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('roles');
};
