# Database Setup Instructions

To set up the database, please follow the instructions below:

1. **Open PostgreSQL**: Click the 'Windows/Start' button on your keyboard and search for `psql`. This command will only work if you have Postgres installed. If you haven't installed it yet, you can download it from [here](https://www.postgresql.org/download/).

2. **Skip Initial Settings**: When it asks for 'Server', 'Database', 'Port', 'Username', you can simply hit enter to skip these.

3. **Input Password**: When it asks for a password, input the password you used when installing Postgres.

4. **Initialize the Database**: Paste the following commands one by one in the psql console:

   ```sql
   CREATE DATABASE TVET_COLLEGE;

   ```

   ```
   \c tvet_college

   ```

   ```sql
   CREATE SCHEMA TVET_COLLEGE_ECOMMERCE;

   ```

   ```sql
   SET search_path TO tvet_college_ecommerce;

   ```

5. **Create the Database Tables**:

   - Users Table

     ```sql
     CREATE TABLE users (
       user_id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(100) UNIQUE NOT NULL,
       password_hash VARCHAR(255),
       role VARCHAR(20)
     );

     ```

   - Locations Table

     ```sql
     CREATE TABLE locations (
       location_id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       address VARCHAR(255)
     );

     ```

   - Shops Table

     ```sql
     CREATE TABLE shops (
       shop_id SERIAL PRIMARY KEY,
       location_id INTEGER REFERENCES locations(location_id),
       name VARCHAR(100)
     );

     ```

   - Cafeterias Table

     ```sql
     CREATE TABLE cafeterias (
       shop_id INTEGER PRIMARY KEY,
       FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
     );

     ```

   - Tuckshops Table

     ```sql
     CREATE TABLE tuckshops (
       shop_id INTEGER PRIMARY KEY,
       FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
     );

     ```

   - Pharmacies Table

     ```sql
     CREATE TABLE pharmacies (
       shop_id INTEGER PRIMARY KEY,
       FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
     );

     ```

   - Bookshops Table

     ```sql
     CREATE TABLE bookshops (
       shop_id INTEGER PRIMARY KEY,
       FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
     );

     ```

   - Digital Centers Table

     ```sql
     CREATE TABLE digitalcenters (
       shop_id INTEGER PRIMARY KEY,
       FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
     );

     ```

   - Products Table

     ```sql
     CREATE TABLE products (
       product_id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       description TEXT,
       price NUMERIC(10, 2),
       category VARCHAR(50),
       shop_type VARCHAR(20),
       shop_id INTEGER REFERENCES shops(shop_id),
       stock INTEGER
     );

     ```

6. **Index the Database**:

   ```sql
   CREATE INDEX users_email_idx ON users (email);
   CREATE INDEX locations_address_idx ON locations (address);
   CREATE INDEX products_name_idx ON products (name);
   CREATE INDEX products_category_idx ON products (category);
   CREATE INDEX products_shop_type_idx ON products (shop_type);

   ```

7. **Create a Function**:

   ```sql
   CREATE OR REPLACE FUNCTION update_product_stock() RETURNS TRIGGER AS $$
   BEGIN
     UPDATE products SET stock = stock - NEW.quantity WHERE product_id = NEW.product_id;
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;

   ```

8. **Create the Transactions Table**:

   ```sql
   CREATE TABLE transactions (
     transaction_id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(user_id),
     product_id INTEGER REFERENCES products(product_id),
     quantity INTEGER,
     transaction_time TIMESTAMP DEFAULT NOW()
   );

   ```

9. **Create a Trigger**:

   ```sql
   CREATE TRIGGER update_stock_after_transaction
   AFTER INSERT ON transactions
   FOR EACH ROW
   EXECUTE FUNCTION update_product_stock();

   ```

10. **Insert Data into the tables**:

    - Insert data into the locations table;

      ```sql
      INSERT INTO locations (name, address)
      VALUES
      ('Nairobi Campus', 'Kenyatta Avenue, Nairobi CBD'),
      ('Mombasa Campus', 'Nkrumah Road, Mombasa Island'),
      ('Kisumu Campus', 'Oginga Odinga Street, Kisumu Town'),
      ('Nakuru Campus', 'Kenyatta Avenue, Nakuru Town'),
      ('Eldoret Campus', 'Uganda Road, Eldoret Town');

      ```

    - Insert data into the shops table

      ```sql
      INSERT INTO shops (location_id, name)
      VALUES
      (1, 'Nairobi Cafeteria'),
      (1, 'Nairobi Tuckshop'),
      (1, 'Nairobi Pharmacy'),
      (1, 'Nairobi Bookshop'),
      (1, 'Nairobi Digital Center'),
      (2, 'Mombasa Cafeteria'),
      (2, 'Mombasa Tuckshop'),
      (3, 'Kisumu Cafeteria'),
      (3, 'Kisumu Tuckshop'),
      (4, 'Nakuru Cafeteria');

      ```

    - Insert data into the cafeterias table

      ```sql
      INSERT INTO cafeterias (shop_id)
      VALUES
      (1),
      (6),
      (8);

      ```

    - Insert data into the tuckshops table

      ```sql
        INSERT INTO tuckshops (shop_id)
        VALUES
        (2),
        (7),
        (9);

      ```

    - Insert data into the pharmacies table

      ```sql
      INSERT INTO pharmacies (shop_id)
      VALUES
      (3);

      ```

    - Insert data into the bookshops table

      ```sql
      INSERT INTO bookshops (shop_id)
      VALUES
      (4);
      ```

    - Insert data into the digitalcenters table

      ```sql
      INSERT INTO digitalcenters (shop_id)
      VALUES
      (5);

      ```

    - Insert data into the products table

      ```sql
      INSERT INTO products (name, description, price, category, shop_type, shop_id, stock)
      VALUES
      ('Chapati', 'Kenyan flatbread', 20.00, 'Food', 'cafeteria', 1, 100),
      ('Kachumbari', 'Kenyan salad', 50.00, 'Food', 'cafeteria', 1, 75),
      ('Madafu', 'Coconut juice', 30.00, 'Beverage', 'cafeteria', 6, 120),
      ('Samosa', 'Fried pastry', 15.00, 'Snack', 'tuckshop', 2, 200),
      ('Panadol', 'Pain relief tablets', 80.00, 'Medicine', 'pharmacy', 3, 50),
      ('Kiswahili Dictionary', 'Swahili language dictionary', 350.00, 'Book', 'bookshop', 4, 30),
      ('Laptop Charger', 'Universal laptop charger', 1500.00, 'Accessory', 'digitalcenter', 5, 20),
      ('Ugali', 'Kenyan cornmeal dish', 40.00, 'Food', 'cafeteria', 8, 150),
      ('Muratina', 'Kenyan bread', 25.00, 'Food', 'tuckshop', 9, 180),
      ('Kikombe', 'Kenyan tea cup', 120.00, 'Kitchenware', 'tuckshop', 9, 60);

      ```

That's it! Your database should now be set up according to the specified requirements.

Once you created the database, [please go back to step 3 in installation guide](https://github.com/BSCNRB595022/college-ecommerce-db-group-iv/blob/main/src/guide/1_installation.md)

You can find more database operational commands here [IN THIS LINK](https://github.com/BSCNRB595022/college-ecommerce-db-group-iv/blob/main/src/guide/3_db_operation.md)
