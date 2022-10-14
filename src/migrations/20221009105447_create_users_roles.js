/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('users_roles', function (table) {
    table.integer('user_id').unsigned();
    table.integer('role_id').unsigned();
    table.primary(['user_id', 'role_id']);
    table.foreign('role_id').references('roles.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.foreign('user_id').references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTable("users_roles");
};
