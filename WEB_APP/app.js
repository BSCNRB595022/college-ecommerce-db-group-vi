const express = require('express');
const db = require('./db');
const { query } = require('./db');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to TVET College Web App API');
});

// Test database connection
(async () => {
    try {
        const result = await query('SELECT NOW()');
        console.log('Database connected! Current time:', result.rows[0].now);
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
})();

// Users

// GET /users: Retrieve a list of users
app.get('/users', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tvet_college_ecommerce.users');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// POST /users: Create a new user
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const result = await db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// GET /users/:user_id: Retrieve a specific user
app.get('/users/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const result = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// PUT /users/:user_id: Update a specific user
app.put('/users/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const { name, email } = req.body;
        const result = await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, user_id]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// DELETE /users/:user_id: Delete a specific user
app.delete('/users/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        await db.query('DELETE FROM users WHERE id = $1', [user_id]);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Locations, Shops, Products, and Transactions

// Implement other endpoints following the pattern above

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
