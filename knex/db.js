const knexfile = require('../knexfile');
const knex = require('knex')(knexfile);

module.exports = knex;

//example
//knex('users').then(data => console.log(data));