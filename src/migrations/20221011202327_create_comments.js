exports.up = async function(knex) {
  return knex.schema
  .createTable('comments', function (table) {
      table.increments('id').primary();
      table.text('comment', 600).notNullable();
      table.string('user_id').notNullable();
      table.string('post_id').notNullable();
      //table.string('indexRef').notNullable().unique();
      table.timestamps(true, true);
  }) 
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("comments");
};
