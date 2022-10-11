const knex = require('../db');

//update users set salary = round(rand() * 10000, 2)

const THOUSAND_SALARY_SCALE_RANGE = 10000

const setSalary = knex
  .into('users')
  .update({
    salary: knex.raw('ROUND(RAND() * ??, 2)', [THOUSAND_SALARY_SCALE_RANGE])
  });

console.log(setSalary.toString());

setSalary
  .then((data) => console.log(data))
  .catch((e) => console.log(e.message))
  .finally(() => knex.destroy());