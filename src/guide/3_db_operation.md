### Start afresh by deleting the schema and remaking it

```sql
DROP SCHEMA IF EXISTS TVET_COLLEGE_ECOMMERCE CASCADE;
CREATE SCHEMA TVET_COLLEGE_ECOMMERCE;
set search_path to TVET_COLLEGE_ECOMMERCE;
```

### You can remove all the data in the tables by truncating them

```sql
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE locations CASCADE;
TRUNCATE TABLE shops CASCADE;
TRUNCATE TABLE cafeterias CASCADE;
TRUNCATE TABLE tuckshops CASCADE;
TRUNCATE TABLE pharmacies CASCADE;
TRUNCATE TABLE bookshops CASCADE;
TRUNCATE TABLE digitalcenters CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE transactions CASCADE;
```

### You can also truncate the tables, cascade and restart them to avoid errors

```sql
TRUNCATE users RESTART IDENTITY CASCADE;
TRUNCATE locations RESTART IDENTITY CASCADE;
TRUNCATE shops RESTART IDENTITY CASCADE;
TRUNCATE cafeterias RESTART IDENTITY CASCADE;
TRUNCATE tuckshops RESTART IDENTITY CASCADE;
TRUNCATE pharmacies RESTART IDENTITY CASCADE;
TRUNCATE bookshops RESTART IDENTITY CASCADE;
TRUNCATE digitalcenters RESTART IDENTITY CASCADE;
TRUNCATE products RESTART IDENTITY CASCADE;
TRUNCATE transactions RESTART IDENTITY CASCADE;
```

### Example to insert values into a table

```sql
INSERT INTO users (name, email, password_hash, role)
VALUES ('Jane Smith', 'jane.smith@example.com', 'hashed_password', 'user');
```

### Example to upadate a value in a table

```sql
UPDATE users SET email = 'new.email@example.com' WHERE user_id = 1;
```

### Example to delete a value in a table

```sql
DELETE FROM users WHERE user_id = 1;
```
