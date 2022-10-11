const knex = require('../db');


const usersRoles = knex.into(
  knex.raw('users_roles (user_id, role_id)')
).insert(
  knex.select('id').select(qb => {
    qb.select('id').from('roles').orderByRaw('rand()').limit(1)
  }).from('users')
)
//console.log('User Roles insert Query \n', usersRoles.toString());

const insertIgnoreQuery = usersRoles.toString().replace('insert', 'insert ignore');
//console.log('User Roles insert ignore query TEXT\n', insertIgnoreQuery);

const convertedInsertIgnoreQuery = knex.raw(insertIgnoreQuery);
//console.log('Knex Object with insert ignore query\n', convertedInsertIgnoreQuery.toString());

convertedInsertIgnoreQuery
  .then(data => console.log(data))
  .catch(e => console.log(e.message))
  .finally(()=> knex.destroy());