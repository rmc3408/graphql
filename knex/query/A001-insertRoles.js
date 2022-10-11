const knex = require('../db');

const data = [
  { name: 'GET'},
  { name: 'POST'},
  { name: 'PUT'},
  { name: 'DELETE'},
];

knex.from('roles').insert(data)
  .then(data => console.log(data))
  .catch(e => console.log(e.message))
  .finally(()=> knex.destroy());