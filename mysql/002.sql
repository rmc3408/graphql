# INSERT FROM OTHER TABLE
INSERT INTO profiles (bio, description, user_id) SELECT CONCAT(first_name,' ', last_name), CONCAT('Desc from ', email), id FROM users;

# DELETE WHOLE TABLE
DELETE FROM profiles;
DELETE FROM profiles WHERE id=228;

# UPDATE DATA
UPDATE profiles set bio="Bio de Raphael Molinaro" WHERE id=356;
UPDATE users SET first_name='Raph' WHERE id=1;


# SELECT MULTI TABLES
SELECT u.first_name as nameUser, p.bio as biography FROM users as u, profiles as p WHERE u.id=p.user_id;


# INNER JOIN - MATCH IN BOTH SIDE - intersection
SELECT u.id, u.first_name as nameUser, p.bio as biography, p.id FROM users as u
INNER JOIN profiles as p ON u.id=p.user_id LIMIT 10;

DELETE FROM profiles WHERE id=357;

# LEFT JOIN - Match All data from USERS, IF not get Null
SELECT u.id, u.first_name as nameUser, p.bio as biography, p.id FROM users as u
LEFT JOIN profiles as p ON u.id=p.user_id LIMIT 10;


# RIGHT JOIN
SELECT u.id, u.first_name as nameUser, p.bio as "profile bio", p.id FROM users as u
RIGHT JOIN profiles as p ON u.id=p.user_id LIMIT 10;






