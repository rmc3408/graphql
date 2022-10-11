const knex = require('../db');

const selectSQL = knex('users').select('id', 'first_name').whereBetween('id', [100, 105]);
const delSQL = knex('users').delete().where('id', 103);

//console.log(selectSQL.toString())

delSQL
  .then((data) => {
    selectSQL.then((data) => console.log(data)).catch((e) => console.log(e.message));
    console.log(data);
  })
  .catch((e) => console.log(e.message))
  .finally(() => knex.destroy());
