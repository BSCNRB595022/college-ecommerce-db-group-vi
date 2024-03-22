const express = require('express');
const { Pool } = require('pg');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const pool = new Pool({
    connectionString: 'postgresql://postgres:38877@localhost/tvet_college?options=-c%20search_path%3Dtvet_college_ecommerce'
});

const app = express();
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Users
app.get('/users', async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.users');
    res.json(result.rows);
});

app.post('/users', async (req, res) => {
    // Create a new user using req.body
});

app.get('/users/:user_id', async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.users WHERE user_id = $1', [req.params.user_id]);
    res.json(result.rows);
});

app.put('/users/:user_id', async (req, res) => {
    // Update a user using req.params.user_id and req.body
});

app.delete('/users/:user_id', async (req, res) => {
    // Delete a user using req.params.user_id
});

// Locations
app.get('/locations', async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.locations');
    res.json(result.rows);
});

app.post('/locations', async (req, res) => {
    // Create a new location using req.body
});

app.get('/locations/:location_id', async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.locations WHERE location_id = $1', [req.params.location_id]);
    res.json(result.rows);
});

app.put('/locations/:location_id', async (req, res) => {
    // Update a location using req.params.location_id and req.body
});

app.delete('/locations/:location_id', async (req, res) => {
    // Delete a location using req.params.location_id
});

// Shops
app.get('/shops', async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.shops');
    res.json(result.rows);
});

app.post('/shops', async (req, res) => {
    // Create a new shop using req.body
});

app.get('/shops/:shop_id', async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.shops WHERE shop_id = $1', [req.params.shop_id]);
    res.json(result.rows);
});

app.put('/shops/:shop_id', async (req, res) => {
    // Update a shop using req.params.shop_id and req.body
});

app.delete('/shops/:shop_id', async (req, res) => {
    // Delete a shop using req.params.shop_id
});

// Products
app.get('/products', async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.products');
    res.json(result.rows);
});

app.post('/products', async (req, res) => {
    // Create a new product using req.body
});

app.get('/products/:product_id', async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.products WHERE product_id = $1', [req.params.product_id]);
    res.json(result.rows);
});

app.put('/products/:product_id', async (req, res) => {
    // Update a product using req.params.product_id and req.body
});

app.delete('/products/:product_id', async (req, res) => {
    // Delete a product using req.params.product_id
});

// Transactions
app.get('/transactions', async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.transactions');
    res.json(result.rows);
});

app.post('/transactions', async (req, res) => {
    // Create a new transaction using req.body
});

app.get('/transactions/:transaction_id', async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.transactions WHERE transaction_id = $1', [req.params.transaction_id]);
    res.json(result.rows);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
