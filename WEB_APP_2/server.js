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

// Register route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO TVET_COLLEGE_ECOMMERCE.users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, hashedPassword, 'user']);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const result = await pool.query('SELECT user_id, password_hash, role FROM TVET_COLLEGE_ECOMMERCE.users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.user_id, role: user.role }, secretKey, { expiresIn: '1h' });

    res.json({ token });
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

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});