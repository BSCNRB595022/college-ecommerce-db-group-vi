CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(20)
);

CREATE TABLE locations (
  location_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  address VARCHAR(255)
);

CREATE TABLE shops (
  shop_id SERIAL PRIMARY KEY,
  location_id INTEGER REFERENCES locations(location_id),
  name VARCHAR(100)
);

CREATE TABLE cafeterias (
  shop_id INTEGER PRIMARY KEY,
  FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
);

CREATE TABLE tuckshops (
  shop_id INTEGER PRIMARY KEY,
  FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
);

CREATE TABLE pharmacies (
  shop_id INTEGER PRIMARY KEY,
  FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
);

CREATE TABLE bookshops (
  shop_id INTEGER PRIMARY KEY,
  FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
);

CREATE TABLE digitalcenters (
  shop_id INTEGER PRIMARY KEY,
  FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
);

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
