const knexfile = require('../../knexfile.js');
const knex = require('knex');

module.exports.knex = knex(knexfile['development']);
