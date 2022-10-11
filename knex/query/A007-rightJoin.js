const knex = require('../db');

const selectSQL = knex
  .from('users as u')
  .select('u.id as UserID', knex.ref('u.first_name').as('Name'), 'p.bio as Biography')
  .rightJoin('profiles as p', 'u.id', 'p.user_id')
  .orderBy('p.id', 'DESC')
  .limit(5);

console.log(selectSQL.toString());

selectSQL
  .then((data) => console.log(data))
  .catch((e) => console.log(e.message))
  .finally(() => knex.destroy());