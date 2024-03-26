
-- Here a sample way you can operate on the data
-- For example, to add a new user:

INSERT INTO users (name, email, password_hash, role)
VALUES ('Jane Smith', 'jane.smith@example.com', 'hashed_password', 'user');

-- To update an existing user's email:

UPDATE users SET email = 'new.email@example.com' WHERE user_id = 1;

-- To delete a user:

DELETE FROM users WHERE user_id = 1;