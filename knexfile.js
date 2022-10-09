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
    tableName: 'migrations'
  },
  pool: {
    min: 2,
    max: 10,
  },
};
