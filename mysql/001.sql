# Select new data
select * from users;

# See tables
show tables;

# see descriptions of table
describe users as u;

 #Select user name using WHERE
 SELECT * from users WHERE first_name ='Raphael' OR first_name='Armando';
 
 #Select user name using ALIAS
 SELECT u.email, u.password_hash from users as u;

 #Select user name using WHERE and expression
 SELECT * from users WHERE id>=95;

# SELECT in between
SELECT email, created_at from users WHERE created_at BETWEEN '2020-06-12' AND '2020-09-05';

# SELECT in IN
SELECT id, email, created_at from users WHERE id IN (1,10, 20, 30);

# SELECT in LIKE 
SELECT id, first_name from users WHERE first_name LIKE 'H%a';
SELECT id, first_name from users WHERE first_name LIKE '_ac%';

# ORDER BY
SELECT id, first_name from users WHERE id BETWEEN 10 AND 20 ORDER BY first_name DESC;

#LIMIT OFFSET
SELECT id, first_name from users LIMIT 4 OFFSET 0;
SELECT id, first_name from users LIMIT 4 OFFSET 1;
SELECT id, first_name from users LIMIT 4 OFFSET 4;
SELECT id, first_name from users LIMIT 4 OFFSET 8;



