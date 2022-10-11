const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    client: process.env.DATABASE_CLIENT,
  connection: {
    port: 3306,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  migrations: {
    tableName: 'migrations',
    directory: './src/migrations',
  },
  pool: {
    min: 2,
    max: 10,
  },
  },
  production:{
    client: process.env.DATABASE_CLIENT,
  connection: {
    port: 3306,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  migrations: {
    tableName: 'migrations'
  },
  pool: {
    min: 2,
    max: 10,
  },
  }
  
};
