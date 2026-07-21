const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const DB_PATH = path.join(__dirname, 'portfolio.db');

// Connect to SQLite database
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database at', DB_PATH);
        initDatabase();
    }
});

function initDatabase() {
    // Create contacts table
    db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (!err) {
            seedDefaultUser();
        }
    });
}

function seedDefaultUser() {
    const email = 'sujalbhargava2341@gmail.com';
    const password = 'sujal';
    
    db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
        if (!err && !row) {
            bcrypt.hash(password, 10, (err, hash) => {
                if (!err) {
                    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (err) => {
                        if (!err) {
                            console.log('Seeded default user sujalbhargava2341@gmail.com');
                        }
                    });
                }
            });
        }
    });
}

module.exports = db;
