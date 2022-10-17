const knex = require('../db');

// insert into profiles (bio, description, user_id)
// SELECT CONCAT('Bio of ', first_name), CONCAT('Desc of ',  first_name), id
// FROM users;

// Step 1
//const result = knex('profiles')
//select * from `profiles`

// Step 2
//const result = knex('profiles').insert({ a: 1, b: 2})
//insert into `profiles` (`a`, `b`) values (1, 2)

// Step 3
const result = knex(knex.raw('?? (?? , ??, ??)', ['profiles', 'bio', 'description', 'user_id'])).insert((qb) => {
  qb.from('users').select(
    knex.raw('concat("Bio of ", ??) , concat("Desc of ", ??), ??', ['first_name', 'first_name', 'id']),
  );
});

// TO SEE SQL query
//console.log(result.toString());
//insert into `profiles` (`bio` , `description`, `user_id`)
//select concat("Bio of ", `first_name`) , concat("Desc of ", `first_name`), `id` from `users`

// TO RUN CODE
//result.then(data => console.log(data))
// .catch(e => console.log(e.message))
// .finally(()=> knex.destroy());
