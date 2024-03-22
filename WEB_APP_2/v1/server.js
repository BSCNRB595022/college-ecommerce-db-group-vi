const express = require('express');
const { Pool } = require('pg');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');

// Serve static files
const pool = new Pool({
    connectionString: 'postgresql://postgres:38877@localhost/tvet_college?options=-c%20search_path%3Dtvet_college_ecommerce'
});

const app = express();
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Secret key for signing and verifying JWT tokens
const secretKey = 'testPassord';

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

        // Attach the decoded token payload to the request object
        req.user = decoded;
        next();
    });
};

// Users
app.get('/users', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT user_id, name, email, role FROM TVET_COLLEGE_ECOMMERCE.users');
    res.json(result.rows);
});

app.post('/users', authenticateToken, async (req, res) => {
    const { name, email, password_hash, role } = req.body;
    const result = await pool.query('INSERT INTO TVET_COLLEGE_ECOMMERCE.users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, password_hash, role]);
    res.status(201).json(result.rows[0]);
});

app.get('/users/:user_id', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT user_id, name, email, role FROM TVET_COLLEGE_ECOMMERCE.users WHERE user_id = $1', [req.params.user_id]);
    if (result.rows.length === 0) {
        res.status(404).send('User not found');
    } else {
        res.json(result.rows[0]);
    }
});

app.put('/users/:user_id', authenticateToken, async (req, res) => {
    const { name, email, password_hash, role } = req.body;
    const result = await pool.query('UPDATE TVET_COLLEGE_ECOMMERCE.users SET name = $1, email = $2, password_hash = $3, role = $4 WHERE user_id = $5 RETURNING *', [name, email, password_hash, role, req.params.user_id]);
    if (result.rows.length === 0) {
        res.status(404).send('User not found');
    } else {
        res.json(result.rows[0]);
    }
});

app.delete('/users/:user_id', authenticateToken, async (req, res) => {
    const result = await pool.query('DELETE FROM TVET_COLLEGE_ECOMMERCE.users WHERE user_id = $1', [req.params.user_id]);
    if (result.rowCount === 0) {
        res.status(404).send('User not found');
    } else {
        res.status(204).send();
    }
});

// Locations
app.get('/locations', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.locations');
    res.json(result.rows);
});

app.post('/locations', authenticateToken, async (req, res) => {
    const { name, address } = req.body;
    const result = await pool.query('INSERT INTO TVET_COLLEGE_ECOMMERCE.locations (name, address) VALUES ($1, $2) RETURNING *', [name, address]);
    res.status(201).json(result.rows[0]);
});

app.get('/locations/:location_id', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.locations WHERE location_id = $1', [req.params.location_id]);
    if (result.rows.length === 0) {
        res.status(404).send('Location not found');
    } else {
        res.json(result.rows[0]);
    }
});

app.put('/locations/:location_id', authenticateToken, async (req, res) => {
    const { name, address } = req.body;
    const result = await pool.query('UPDATE TVET_COLLEGE_ECOMMERCE.locations SET name = $1, address = $2 WHERE location_id = $3 RETURNING *', [name, address, req.params.location_id]);
    if (result.rows.length === 0) {
        res.status(404).send('Location not found');
    } else {
        res.json(result.rows[0]);
    }
});

app.delete('/locations/:location_id', authenticateToken, async (req, res) => {
    const result = await pool.query('DELETE FROM TVET_COLLEGE_ECOMMERCE.locations WHERE location_id = $1', [req.params.location_id]);
    if (result.rowCount === 0) {
        res.status(404).send('Location not found');
    } else {
        res.status(204).send();
    }
});

// Shops
app.get('/shops', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.shops');
    res.json(result.rows);
});

app.post('/shops', authenticateToken, async (req, res) => {
    const { location_id, name } = req.body;
    const result = await pool.query('INSERT INTO TVET_COLLEGE_ECOMMERCE.shops (location_id, name) VALUES ($1, $2) RETURNING *', [location_id, name]);
    res.status(201).json(result.rows[0]);
});

app.get('/shops/:shop_id', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.shops WHERE shop_id = $1', [req.params.shop_id]);
    if (result.rows.length === 0) {
        res.status(404).send('Shop not found');
    } else {
        res.json(result.rows[0]);
    }
});

app.put('/shops/:shop_id', authenticateToken, async (req, res) => {
    const { location_id, name } = req.body;
    const result = await pool.query('UPDATE TVET_COLLEGE_ECOMMERCE.shops SET location_id = $1, name = $2 WHERE shop_id = $3 RETURNING *', [location_id, name, req.params.shop_id]);
    if (result.rows.length === 0) {
        res.status(404).send('Shop not found');
    } else {
        res.json(result.rows[0]);
    }
});

app.delete('/shops/:shop_id', authenticateToken, async (req, res) => {
    const result = await pool.query('DELETE FROM TVET_COLLEGE_ECOMMERCE.shops WHERE shop_id = $1', [req.params.shop_id]);
    if (result.rowCount === 0) {
        res.status(404).send('Shop not found');
    } else {
        res.status(204).send();
    }
});

// Products
app.get('/products', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.products');
    res.json(result.rows);
});

app.post('/products', authenticateToken, async (req, res) => {
    const { name, description, price, category, shop_type, shop_id, stock } = req.body;
    const result = await pool.query('INSERT INTO TVET_COLLEGE_ECOMMERCE.products (name, description, price, category, shop_type, shop_id, stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, description, price, category, shop_type, shop_id, stock]);
    res.status(201).json(result.rows[0]);
});

app.get('/products/:product_id', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.products WHERE product_id = $1', [req.params.product_id]);
    if (result.rows.length === 0) {
        res.status(404).send('Product not found');
    } else {
        res.json(result.rows[0]);
    }
});

app.put('/products/:product_id', authenticateToken, async (req, res) => {
    const { name, description, price, category, shop_type, shop_id, stock } = req.body;
    const result = await pool.query('UPDATE TVET_COLLEGE_ECOMMERCE.products SET name = $1, description = $2, price = $3, category = $4, shop_type = $5, shop_id = $6, stock = $7 WHERE product_id = $8 RETURNING *', [name, description, price, category, shop_type, shop_id, stock, req.params.product_id]);
    if (result.rows.length === 0) {
        res.status(404).send('Product not found');
    } else {
        res.json(result.rows[0]);
    }
});

app.delete('/products/:product_id', authenticateToken, async (req, res) => {
    const result = await pool.query('DELETE FROM TVET_COLLEGE_ECOMMERCE.products WHERE product_id = $1', [req.params.product_id]);
    if (result.rowCount === 0) {
        res.status(404).send('Product not found');
    } else {
        res.status(204).send();
    }
});

// Transactions
app.get('/transactions', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.transactions');
    res.json(result.rows);
});

app.post('/transactions', authenticateToken, async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    const result = await pool.query('INSERT INTO TVET_COLLEGE_ECOMMERCE.transactions (user_id, product_id, quantity, transaction_time) VALUES ($1, $2, $3, NOW()) RETURNING *', [user_id, product_id, quantity]);
    res.status(201).json(result.rows[0]);
});

app.get('/transactions/:transaction_id', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM TVET_COLLEGE_ECOMMERCE.transactions WHERE transaction_id = $1', [req.params.transaction_id]);
    if (result.rows.length === 0) {
        res.status(404).send('Transaction not found');
    } else {
        res.json(result.rows[0]);
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if the email and password are valid
    const result = await pool.query('SELECT user_id, password_hash, role FROM TVET_COLLEGE_ECOMMERCE.users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    const verifyPassword = async (password, passwordHash) => {
        return await bcrypt.compare(password, passwordHash);
    };

    const isPasswordValid = await verifyPassword(password, user.password_hash);

    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.user_id, role: user.role }, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});