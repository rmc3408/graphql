const knex = require('../db');

const data = [{
  first_name: 'Shelly',
  last_name: 'Silva',
  salary: 9768.99
}];

const selectSQL = knex.from('users').select('*').whereBetween('id', [102, 105]);
const updateSQL = knex.into('users').update(data[0]).where({ id: 102 })

//console.log(updateSQL.toString())

updateSQL
  .then((data) => {
    console.log('From out Promise', data);
    selectSQL.then((data) => console.log('From inside promise', data)).catch((e) => console.log(e.message));
  })
  .catch((e) => console.log(e.message))
  .finally(() => knex.destroy());