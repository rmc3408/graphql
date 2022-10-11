const knex = require('../db');

const selectSQL = knex
  .from(knex.raw('?? as ??, ?? as ??', ['users', 'u', 'profiles', 'p']))
  //.select(knex.raw('?? as ??, ?? as ??', ['u.first_name', 'name', 'p.bio', 'biography']))
  .select(knex.ref('first_name').as('name'), knex.ref('bio').as('biography'))
  .where('u.id', knex.raw('p.user_id'))

console.log(selectSQL.toString());

selectSQL
  .then((data) => console.log(data))
  .catch((e) => console.log(e.message))
  .finally(() => knex.destroy());
