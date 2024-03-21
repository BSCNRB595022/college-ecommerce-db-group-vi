CREATE OR REPLACE FUNCTION update_product_stock() RETURNS TRIGGER AS $$
BEGIN
  UPDATE products SET stock = stock - NEW.quantity WHERE product_id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE transactions (
  transaction_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  product_id INTEGER REFERENCES products(product_id),
  quantity INTEGER,
  transaction_time TIMESTAMP DEFAULT NOW()
);

CREATE TRIGGER update_stock_after_transaction
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_product_stock();
