const knexfile = require('../../knexfile');
export const knex = require('knex')(knexfile[process.env.NODE_ENV]);
