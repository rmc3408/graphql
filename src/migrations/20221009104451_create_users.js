/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema
    .createTable('users', function (table) {
        table.increments('id').primary();
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255);
        table.string('email', 255).notNullable().unique();
        table.string('password_hash', 255).notNullable().unique();
        table.decimal('salary', 8, 2);
        table.timestamps(true, true);
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
      .dropTable("users");
  
};
