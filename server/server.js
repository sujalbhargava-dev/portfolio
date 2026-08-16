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
// API endpoint to get features
app.get('/api/features', (req, res) => {
  const featurePath = path.join(__dirname, 'features.json');
  try {
    if (fs.existsSync(featurePath)) {
      const data = fs.readFileSync(featurePath, 'utf8');
      res.json(JSON.parse(data));
    } else {
      res.json({});
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to read features' });
  }
});

// API endpoint to update feature status
app.post('/api/features', (req, res) => {
  const { featureId, status } = req.body;
  if (!featureId || !['testing', 'admin', 'public'].includes(status)) {
    return res.status(400).json({ error: 'Invalid feature data' });
  }

  const featurePath = path.join(__dirname, 'features.json');
  try {
    let features = {};
    if (fs.existsSync(featurePath)) {
      features = JSON.parse(fs.readFileSync(featurePath, 'utf8'));
    }
    
    features[featureId] = status;
    fs.writeFileSync(featurePath, JSON.stringify(features, null, 2));
    
    res.json({ success: true, features });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update feature' });
  }
});

// --- SKILLS API ---

// Get all skills
app.get('/api/skills', (req, res) => {
  db.all('SELECT * FROM skills ORDER BY sort_order ASC, id ASC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true, skills: rows });
  });
});

// Add a skill
app.post('/api/skills', (req, res) => {
  const { name, emoji, category, subtitle, sort_order } = req.body;
  if (!name || !category) return res.status(400).json({ error: 'Name and category are required' });
  
  const query = `INSERT INTO skills (name, emoji, category, subtitle, sort_order) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [name, emoji || '⚡', category, subtitle || '', sort_order || 0], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true, id: this.lastID });
  });
});

// Update a skill
app.put('/api/skills/:id', (req, res) => {
  const { name, emoji, category, subtitle, sort_order } = req.body;
  const query = `UPDATE skills SET name=?, emoji=?, category=?, subtitle=?, sort_order=? WHERE id=?`;
  db.run(query, [name, emoji, category, subtitle, sort_order, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});

// Delete a skill
app.delete('/api/skills/:id', (req, res) => {
  db.run('DELETE FROM skills WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});


// --- PROJECTS API ---

// Get all projects
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY sort_order ASC, id ASC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    // parse JSON fields
    const projects = rows.map(r => ({
      ...r,
      features: JSON.parse(r.features || '[]'),
      tech_stack: JSON.parse(r.tech_stack || '[]')
    }));
    res.json({ success: true, projects });
  });
});

// Add a project
app.post('/api/projects', (req, res) => {
  const { title, description, project_type, features, tech_stack, github_url, sort_order } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Title and description required' });
  
  const query = `INSERT INTO projects (title, description, project_type, features, tech_stack, github_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [
    title, description, project_type || 'Project',
    JSON.stringify(features || []), JSON.stringify(tech_stack || []),
    github_url || '', sort_order || 0
  ], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true, id: this.lastID });
  });
});

// Update a project
app.put('/api/projects/:id', (req, res) => {
  const { title, description, project_type, features, tech_stack, github_url, sort_order } = req.body;
  const query = `UPDATE projects SET title=?, description=?, project_type=?, features=?, tech_stack=?, github_url=?, sort_order=? WHERE id=?`;
  db.run(query, [
    title, description, project_type,
    JSON.stringify(features || []), JSON.stringify(tech_stack || []),
    github_url, sort_order, req.params.id
  ], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
  });
});

// Delete a project
app.delete('/api/projects/:id', (req, res) => {
  db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ success: true });
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
