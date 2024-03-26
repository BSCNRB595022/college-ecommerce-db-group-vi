const express = require('express');
const { Pool } = require('pg');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');

const pool = new Pool({
    connectionString: 'postgresql://postgres:38877@localhost/tvet_college?options=-c%20search_path%3Dtvet_college_ecommerce'
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Secret key for signing and verifying JWT tokens
const secretKey = 'your-secret-key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

// Serve the registration page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register', 'register.html'));
});

// Register route
app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert the new user into the database
        const result = await pool.query(
            'INSERT INTO TVET_COLLEGE_ECOMMERCE.users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, hashedPassword, role]
        );

        // Send back the newly created user
        res.status(201).json(result.rows[0]);
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
});

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'login.html'));
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const result = await pool.query(
            'SELECT * FROM TVET_COLLEGE_ECOMMERCE.users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'User not found. Please register.' });
        }

        const user = result.rows[0];

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password.' });
        }

        // Send back the user's role
        res.status(200).json({ role: user.role });
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
});

// Serve the admin dashboard page
app.get('/dashboard/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard', 'admin', 'dashboard.html'));
});

// Route to fetch shop data
app.get('/dashboard/admin/shops', async (req, res) => {
    try {
        // Fetch shop data from the database
        const result = await pool.query('SELECT * FROM shops');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching shop data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to fetch shops data
app.get('/fetchShops', async (req, res) => {
    try {
        const shops = await pool.query('SELECT * FROM shops');
        res.json(shops.rows);
    } catch (error) {
        console.error('Error fetching shops:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch products data
app.get('/fetchProducts', async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products');
        res.json(products.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch locations data
app.get('/fetchLocations', async (req, res) => {
    try {
        const locations = await pool.query('SELECT * FROM locations');
        res.json(locations.rows);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch transactions data
app.get('/fetchTransactions', async (req, res) => {
    try {
        const transactions = await pool.query('SELECT * FROM transactions');
        res.json(transactions.rows);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User route
app.get('/user', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT user_id, name, email, role FROM TVET_COLLEGE_ECOMMERCE.users WHERE user_id = $1', [req.user.userId]);

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
});

// Users route
app.get('/users', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT user_id, name, email, role FROM TVET_COLLEGE_ECOMMERCE.users');
    res.json(result.rows);
});

// Locations route
app.get('/locations', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.locations');
    res.json(result.rows);
});

// Shops route
app.get('/shops', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.shops');
    res.json(result.rows);
});

// Products route
app.get('/products', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.products');
    res.json(result.rows);
});

// Transactions route
app.get('/transactions', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.transactions');
    res.json(result.rows);
});

// Serve the login.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'login.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});