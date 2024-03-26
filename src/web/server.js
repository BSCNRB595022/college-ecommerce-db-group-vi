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

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });

        // Send back the token and user's role
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
});

// Serve the admin dashboard page
app.get('/dashboard/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard', 'admin', 'dashboard.html'));
});

// API route to fetch shop data
app.get('/shops', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM shops');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching shop data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API route to update a shop
app.put('/shops/:id', authenticateToken, async (req, res) => {
    const shopId = req.params.id;
    const { name } = req.body;

    try {
        const result = await pool.query(
            'UPDATE shops SET name = $1 WHERE id = $2 RETURNING *',
            [name, shopId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating shop:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API route to delete a shop
app.delete('/shops/:id', authenticateToken, async (req, res) => {
    const shopId = req.params.id;

    try {
        const result = await pool.query('DELETE FROM shops WHERE id = $1 RETURNING *', [shopId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting shop:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API route to fetch products data
app.get('/products', authenticateToken, async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products');
        res.json(products.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API route to update a product
app.put('/products/:id', authenticateToken, async (req, res) => {
    const productId = req.params.id;
    const { name, price } = req.body;

    try {
        const result = await pool.query(
            'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
            [name, price, productId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API route to delete a product
app.delete('/products/:id', authenticateToken, async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [productId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API route to fetch locations data
app.get('/locations', authenticateToken, async (req, res) => {
    try {
        const locations = await pool.query('SELECT * FROM locations');
        res.json(locations.rows);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API route to update a location
app.put('/locations/:id', authenticateToken, async (req, res) => {
    const locationId = req.params.id;
    const { name, address } = req.body;

    try {
        const result = await pool.query(
            'UPDATE locations SET name = $1, address = $2 WHERE id = $3 RETURNING *',
            [name, address, locationId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API route to delete a location
app.delete('/locations/:id', authenticateToken, async (req, res) => {
    const locationId = req.params.id;

    try {
        const result = await pool.query('DELETE FROM locations WHERE id = $1 RETURNING *', [locationId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API route to fetch transactions data
app.get('/transactions', authenticateToken, async (req, res) => {
    try {
        const transactions = await pool.query('SELECT * FROM transactions');
        res.json(transactions.rows);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the login.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'login.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});