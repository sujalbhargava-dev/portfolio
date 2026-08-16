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

    // Create skills table
    db.run(`
        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            emoji TEXT DEFAULT '⚡',
            category TEXT NOT NULL,
            subtitle TEXT DEFAULT '',
            sort_order INTEGER DEFAULT 0
        )
    `, (err) => {
        if (!err) {
            seedSkills();
        }
    });

    // Create projects table
    db.run(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            project_type TEXT DEFAULT 'Desktop App',
            features TEXT DEFAULT '[]',
            tech_stack TEXT DEFAULT '[]',
            github_url TEXT DEFAULT '',
            sort_order INTEGER DEFAULT 0
        )
    `, (err) => {
        if (!err) {
            seedProjects();
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

function seedSkills() {
    db.get('SELECT COUNT(*) as count FROM skills', (err, row) => {
        if (!err && row.count === 0) {
            const defaultSkills = [
                { name: 'Python', emoji: '🐍', category: 'lang', subtitle: 'Primary Language', sort_order: 1 },
                { name: 'C++', emoji: '⚙️', category: 'lang', subtitle: 'OOP & Algorithms', sort_order: 2 },
                { name: 'C', emoji: '🔵', category: 'lang', subtitle: 'Systems & Logic', sort_order: 3 },
                { name: 'MySQL', emoji: '🐬', category: 'db', subtitle: 'RDBMS', sort_order: 1 },
                { name: 'SQL', emoji: '🗄️', category: 'db', subtitle: 'Query Language', sort_order: 2 },
                { name: 'HTML', emoji: '🌐', category: 'web', subtitle: 'Structure', sort_order: 1 },
                { name: 'CSS', emoji: '🎨', category: 'web', subtitle: 'Styling', sort_order: 2 },
                { name: 'JavaScript', emoji: '✨', category: 'web', subtitle: 'Interactivity', sort_order: 3 },
                { name: 'VS Code', emoji: '📝', category: 'tools', subtitle: 'Primary Editor', sort_order: 1 },
                { name: 'Git', emoji: '🐙', category: 'tools', subtitle: 'Version Control', sort_order: 2 },
                { name: 'GitHub', emoji: '🐱', category: 'tools', subtitle: 'Code Hosting', sort_order: 3 },
                { name: 'Code::Blocks', emoji: '💻', category: 'tools', subtitle: 'C/C++ IDE', sort_order: 4 },
                { name: 'Object-Oriented Programming (OOP)', emoji: '01', category: 'concepts', subtitle: '', sort_order: 1 },
                { name: 'Data Structures & Algorithms (DSA)', emoji: '02', category: 'concepts', subtitle: '', sort_order: 2 },
                { name: 'Database Management Systems (DBMS)', emoji: '03', category: 'concepts', subtitle: '', sort_order: 3 },
                { name: 'File Handling', emoji: '04', category: 'concepts', subtitle: '', sort_order: 4 },
                { name: 'Problem Solving & Logical Thinking', emoji: '05', category: 'concepts', subtitle: '', sort_order: 5 }
            ];

            const stmt = db.prepare('INSERT INTO skills (name, emoji, category, subtitle, sort_order) VALUES (?, ?, ?, ?, ?)');
            defaultSkills.forEach(skill => {
                stmt.run(skill.name, skill.emoji, skill.category, skill.subtitle, skill.sort_order);
            });
            stmt.finalize();
            console.log('Seeded default skills');
        }
    });
}

function seedProjects() {
    db.get('SELECT COUNT(*) as count FROM projects', (err, row) => {
        if (!err && row.count === 0) {
            const defaultProjects = [
                {
                    title: 'Shopping Cart Management System',
                    description: 'A fully-functional desktop shopping cart application built with Python and Tkinter. Users can manage a product catalog, apply discounts, calculate shipping charges, and generate detailed billing summaries — all through an intuitive GUI interface.',
                    project_type: 'Desktop App',
                    features: JSON.stringify(['Add, update, and delete products with full CRUD operations','Automatic discount calculation based on cart total','Dynamic shipping charge computation','Billing summary generation with itemized receipts','File Handling / MySQL for persistent data storage','OOP-based modular design for scalability']),
                    tech_stack: JSON.stringify(['Python','Tkinter','MySQL','File Handling','OOP']),
                    github_url: '',
                    sort_order: 1
                },
                {
                    title: 'Payroll Management System',
                    description: 'A comprehensive database-driven payroll system designed for organizations to manage employee records, track attendance, automate salary calculations, and handle leave management — all modeled with proper DBMS principles and ER diagrams.',
                    project_type: 'Database System',
                    features: JSON.stringify(['Complete employee record management system','Attendance tracking and leave management module','Automated salary calculation with deductions and allowances','Department-based organizational structure','Properly designed ER Diagram with normalized tables','Complex SQL queries for reporting and analytics']),
                    tech_stack: JSON.stringify(['MySQL','SQL','ER Diagram','DBMS Concepts','Normalization']),
                    github_url: '',
                    sort_order: 2
                }
            ];

            const stmt = db.prepare('INSERT INTO projects (title, description, project_type, features, tech_stack, github_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)');
            defaultProjects.forEach(proj => {
                stmt.run(proj.title, proj.description, proj.project_type, proj.features, proj.tech_stack, proj.github_url, proj.sort_order);
            });
            stmt.finalize();
            console.log('Seeded default projects');
        }
    });
}

module.exports = db;
