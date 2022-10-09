const knex = require('../db');


// SELECT * FROM USERS;
// knex('users')
//   .then(data => console.log(data))
//   .catch(e => console.log(e.message))
//   .finally(()=> knex.destroy());


// SELECT email FROM USERS;
// knex('users as u')
//   .select('u.email as user_email')
//     .then(data => console.log(data))
//     .catch(e => console.log(e.message))
//     .finally(()=> knex.destroy());


// // SELECT id, first_name from users WHERE first_name='Raphael';
// knex('users as u')
//   .select('id', 'first_name')
//   .where('first_name', 'Raphael')
//     .then(data => console.log(data))
//     .catch(e => console.log(e.message))
//     .finally(()=> knex.destroy());


// SELECT * from users WHERE id BETWEEN 1 AND 4 OR id BETWEEN 80 AND 83;
// knex('users as u')
//   .select('*')
//   .whereBetween('id', [1, 4])
//   .orWhereBetween('id', [80, 83])
//     .then(data => console.log(data))
//     .catch(e => console.log(e.message))
//     .finally(()=> knex.destroy());

// SELECT * from users WHERE id IN (20,30);
// knex('users as u')
//   .select('*')
//   .whereIN('id', [20, 30])
//     .then(data => console.log(data))
//     .catch(e => console.log(e.message))
//     .finally(()=> knex.destroy());

// SELECT first_name from users WHERE first_name LIKE '%na';
knex('users as u')
.select('u.first_name as names')
.whereILike('u.first_name', '%na')
  .then(data => console.log(data))
  .catch(e => console.log(e.message))
  .finally(()=> knex.destroy());