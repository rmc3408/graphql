const knex = require('../db');

const data = [{
  first_name: 'Helena',
  last_name: 'Silva',
  email: 'nena@gmsil.com',
  password_hash: 'DJFEFE2242FEF',
  salary: 9768.99
}];

knex('users').insert(data)
  .then(data => console.log(data))
  .catch(e => console.log(e.message))
  .finally(()=> knex.destroy());