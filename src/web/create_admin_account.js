// create_admin_account.js
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { db } = require('./server-config'); // Import database configuration

// Function to hash the password
const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

// Function to insert a new user into the database
const insertUser = async (name, email, hashedPassword, role) => {
    const pool = new Pool(db); // Create a PostgreSQL connection pool
    const client = await pool.connect(); // Connect to the database

    try {
        // Insert the user into the database
        const query = 'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)';
        const values = [name, email, hashedPassword, role];
        await client.query(query, values);
        console.log('User inserted successfully.');
    } catch (error) {
        console.error('Error inserting user:', error);
    } finally {
        client.release(); // Release the client back to the pool
    }
};

// Parse command line arguments
const [, , name, email, password, role] = process.argv;

// Main function to create admin account
const createAdminAccount = async () => {
    try {
        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Insert the new user into the database
        await insertUser(name, email, hashedPassword, role);
    } catch (error) {
        console.error('Error creating admin account:', error);
    }
};

createAdminAccount(); // Call the main function
