-- Truncate tables
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

-- Insert data into the users table
INSERT INTO users (name, email, password_hash, role)
VALUES
    ('Juma Wangari', 'juma.wangari@spu.ac.ke', 'hashedpassword1', 'student'),
    ('Atieno Odhiambo', 'atieno.odhiambo@spu.ac.ke', 'hashedpassword2', 'staff'),
    ('Kamau Kinyanjui', 'kamau.kinyanjui@spu.ac.ke', 'hashedpassword3', 'admin'),
    ('Fatuma Ali', 'fatuma.ali@spu.ac.ke', 'hashedpassword4', 'student'),
    ('Omondi Onyango', 'omondi.onyango@spu.ac.ke', 'hashedpassword5', 'staff'),
    ('Njeri Muthoni', 'njeri.muthoni@spu.ac.ke', 'hashedpassword6', 'student'),
    ('Kwame Owino', 'kwame.owino@spu.ac.ke', 'hashedpassword7', 'staff'),
    ('Amina Hassan', 'amina.hassan@spu.ac.ke', 'hashedpassword8', 'student'),
    ('Abdalla Mwangi', 'abdalla.mwangi@spu.ac.ke', 'hashedpassword9', 'admin'),
    ('Aisha Ndungu', 'aisha.ndungu@spu.ac.ke', 'hashedpassword10', 'staff');

-- Insert data into the locations table
INSERT INTO locations (name, address)
VALUES
    ('Nairobi Campus', 'Kenyatta Avenue, Nairobi CBD'),
    ('Mombasa Campus', 'Nkrumah Road, Mombasa Island'),
    ('Kisumu Campus', 'Oginga Odinga Street, Kisumu Town'),
    ('Nakuru Campus', 'Kenyatta Avenue, Nakuru Town'),
    ('Eldoret Campus', 'Uganda Road, Eldoret Town');

-- Insert data into the shops table
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

-- Insert data into the cafeterias table
INSERT INTO cafeterias (shop_id)
VALUES
    (1),
    (6),
    (8);

-- Insert data into the tuckshops table
INSERT INTO tuckshops (shop_id)
VALUES
    (2),
    (7),
    (9);

-- Insert data into the pharmacies table
INSERT INTO pharmacies (shop_id)
VALUES
    (3);

-- Insert data into the bookshops table
INSERT INTO bookshops (shop_id)
VALUES
    (4);

-- Insert data into the digitalcenters table
INSERT INTO digitalcenters (shop_id)
VALUES
    (5);

-- Insert data into the products table
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

-- Insert data into the transactions table
INSERT INTO transactions (user_id, product_id, quantity)
VALUES
    (1, 1, 3), -- Juma Wangari bought 3 chapatis
    (2, 5, 2), -- Atieno Odhiambo bought 2 Panadol
    (3, 7, 1), -- Kamau Kinyanjui bought 1 laptop charger
    (4, 3, 4), -- Fatuma Ali bought 4 madafu coconut juices
    (5, 9, 5), -- Omondi Onyango bought 5 muratina breads
    (6, 6, 1), -- Njeri Muthoni bought 1 Kiswahili dictionary
    (7, 2, 2), -- Kwame Owino bought 2 kachumbari salads
    (8, 4, 10), -- Amina Hassan bought 10 samosas
    (9, 8, 3), -- Abdalla Mwangi bought 3 ugali dishes
    (10, 10, 2); -- Aisha Ndungu bought 2 kikombe tea cups