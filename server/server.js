const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');
const bcrypt = require('bcrypt');
const db = require('./database');

const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, '..', 'messages.txt');

// Configure multer to save uploads as profile.jpg in the main portfolio folder
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..'));
    },
    filename: (req, file, cb) => {
      cb(null, 'profile.jpg'); // Always overwrite the same file
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  }
});

// Parse JSON body
app.use(express.json());

// Serve static files from the parent directory (portfolio root)
app.use(express.static(path.join(__dirname, '..')));

// API endpoint to receive contact form messages
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, email, subject, message], function(err) {
    if (err) {
      console.error('Error saving message to DB:', err);
      return res.status(500).json({ error: 'Failed to save message.' });
    }
    console.log(`✅ New message from ${name} (${email}) saved to DB`);
    res.json({ success: true, message: 'Message saved successfully!' });
  });
});

// API endpoint for uploading profile photo
app.post('/api/upload-profile', upload.single('profilePhoto'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please select an image file.' });
  }
  res.json({ success: true, message: 'Profile photo updated successfully!' });
});

// API endpoint for registration
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error.' });
    }
    if (row) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Hash error:', err);
        return res.status(500).json({ error: 'Internal server error.' });
      }

      db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], function(err) {
        if (err) {
          console.error('Insert error:', err);
          return res.status(500).json({ error: 'Internal server error.' });
        }
        res.json({ success: true, message: 'Account created successfully' });
      });
    });
  });
});

// API endpoint for login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      console.error('Database error during login:', err);
      return res.status(500).json({ error: 'Internal server error.' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error.' });
      }

      if (result) {
        const isAdmin = (email === 'sujalbhargava2341@gmail.com');
        res.json({ success: true, message: 'Login successful', isAdmin });
      } else {
        res.status(401).json({ error: 'Invalid email or password.' });
      }
    });
  });
});

// API endpoint to fetch all messages (for admin dashboard)
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      console.error('Database error fetching messages:', err);
      return res.status(500).json({ error: 'Internal server error.' });
    }
    res.json({ success: true, messages: rows });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at:`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Network: http://${getLocalIP()}:${PORT}`);
  console.log(`  Messages saved to: ${MESSAGES_FILE}`);
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}
