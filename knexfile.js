// Update with your config settings.

module.exports = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: 'password',
    database: 'dados',
  },
  migrations: {
    tableName: 'migration_users',
    tableName: 'migration_profiles',
  },
  pool: {
    min: 2,
    max: 10,
  },
};
