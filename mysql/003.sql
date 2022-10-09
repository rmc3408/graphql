# RAND AND ROUND
-- SELECT ROUND(RAND()*10000, 2); 
UPDATE users set salary=ROUND(RAND()*10000, 2);
SELECT first_name, salary FROM users WHERE salary BETWEEN 1000 AND 4000 ORDER BY salary ASC;


# MULTIPLE JOINS
SELECT u.id as uid, u.first_name, p.bio, r.name as roleName
FROM users as u LEFT JOIN profiles as p ON u.id = p.user_id
INNER JOIN users_roles as ur ON u.id = ur.user_id
INNER JOIN roles as r ON ur.role_id = r.id
ORDER BY uid ASC LIMIT 12;

# UPDATE WITH JOINS
SELECT u.first_name, p.bio FROM users as u
INNER JOIN profiles as p ON u.id = p.user_id
WHERE u.first_name = 'Raphael';

UPDATE users as u
INNER JOIN profiles as p ON u.id = p.user_id
set p.bio = CONCAT(p.bio, ' updated')
WHERE u.first_name = 'Raphael';


# DELETE WITH JOINS
SELECT u.first_name, p.bio FROM users as u
INNER JOIN profiles as p ON u.id = p.user_id
WHERE u.first_name = 'Ferris';

DELETE p FROM users as u
INNER JOIN profiles as p ON u.id = p.user_id
WHERE u.first_name = 'Ferris';

# GROUP BY
SELECT first_name, COUNT(id) as total FROM users
GROUP BY first_name ORDER BY total DESC;


# OPERATION FUNCTIONS
SELECT MAX(salary), MIN(salary), SUM(salary), AVG(salary), COUNT(salary) FROM users as u;


SELECT u.first_name, MAX(u.salary) as high, MIN(u.salary), SUM(u.salary), COUNT(u.id) as total FROM users as u
LEFT JOIN profiles as p ON u.id = p.user_id
GROUP BY u.first_name ORDER BY total DESC;


