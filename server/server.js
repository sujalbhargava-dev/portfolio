const express = require('express');
const path = require('path');
const os = require('os');
const bcrypt = require('bcryptjs');
const supabase = require('./database');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Configure multer for memory storage (Vercel has read-only filesystem)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Redirect profile.jpg requests to the Supabase public storage URL
app.get('/profile.jpg', (req, res) => {
  const { data } = supabase.storage.from('portfolio-assets').getPublicUrl('profile.jpg');
  if (data && data.publicUrl) {
    res.redirect(data.publicUrl);
  } else {
    res.status(404).send('Profile picture not found');
  }
});

// API endpoint to receive contact form messages
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const { error } = await supabase.from('contacts').insert([{ name, email, subject, message }]);
  if (error) {
    console.error('Error saving message to Supabase:', error);
    return res.status(500).json({ error: 'Failed to save message.' });
  }
  console.log(`✅ New message from ${name} (${email}) saved to Supabase`);
  res.json({ success: true, message: 'Message saved successfully!' });
});

// API endpoint for uploading profile photo to Supabase Storage
app.post('/api/upload-profile', upload.single('profilePhoto'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please select an image file.' });
  }
  
  const { data, error } = await supabase.storage
    .from('portfolio-assets')
    .upload('profile.jpg', req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: true
    });

  if (error) {
    console.error('Supabase upload error:', error);
    return res.status(500).json({ error: 'Failed to upload photo.' });
  }
  res.json({ success: true, message: 'Profile photo updated successfully!' });
});

// API endpoint for registration
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const { data: existing } = await supabase.from('users').select('id').eq('email', email);
  if (existing && existing.length > 0) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) return res.status(500).json({ error: 'Internal server error.' });
    
    const { error: insertErr } = await supabase.from('users').insert([{ email, password: hash }]);
    if (insertErr) return res.status(500).json({ error: 'Internal server error.' });
    
    res.json({ success: true, message: 'Account created successfully' });
  });
});

// API endpoint for login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const { data: users, error } = await supabase.from('users').select('*').eq('email', email);
  if (error || !users || users.length === 0) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const user = users[0];
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const isAdmin = (email === 'sujalbhargava2341@gmail.com');
      res.json({ success: true, message: 'Login successful', isAdmin });
    } else {
      res.status(401).json({ error: 'Invalid email or password.' });
    }
  });
});

// API endpoint to fetch all messages
app.get('/api/messages', async (req, res) => {
  const { data: messages, error } = await supabase.from('contacts').select('*').order('timestamp', { ascending: false });
  if (error) return res.status(500).json({ error: 'Internal server error.' });
  res.json({ success: true, messages });
});

// API endpoint to get features
app.get('/api/features', async (req, res) => {
  const { data: featuresList, error } = await supabase.from('features').select('*');
  if (error) return res.status(500).json({ error: 'Failed to read features' });
  
  const features = {};
  if (featuresList) {
    featuresList.forEach(f => features[f.id] = f.status);
  }
  res.json(features);
});

// API endpoint to update feature status
app.post('/api/features', async (req, res) => {
  const { featureId, status } = req.body;
  if (!featureId || !['testing', 'admin', 'public'].includes(status)) {
    return res.status(400).json({ error: 'Invalid feature data' });
  }

  const { error } = await supabase.from('features').upsert([{ id: featureId, status }]);
  if (error) return res.status(500).json({ error: 'Failed to update feature' });
  
  const { data: featuresList } = await supabase.from('features').select('*');
  const features = {};
  if (featuresList) {
    featuresList.forEach(f => features[f.id] = f.status);
  }
  res.json({ success: true, features });
});

// --- SKILLS API ---
app.get('/api/skills', async (req, res) => {
  const { data: skills, error } = await supabase.from('skills').select('*').order('sort_order', { ascending: true });
  if (error) return res.status(500).json({ error: error.message || 'Database error' });
  res.json({ success: true, skills });
});

app.post('/api/skills', async (req, res) => {
  const { name, emoji, category, subtitle, sort_order } = req.body;
  if (!name || !category) return res.status(400).json({ error: 'Name and category are required' });
  
  const { data, error } = await supabase.from('skills').insert([{ name, emoji: emoji || '⚡', category, subtitle: subtitle || '', sort_order: sort_order || 0 }]).select('id');
  if (error) return res.status(500).json({ error: 'Database error' });
  res.json({ success: true, id: data[0]?.id });
});

app.put('/api/skills/:id', async (req, res) => {
  const { name, emoji, category, subtitle, sort_order } = req.body;
  const { error } = await supabase.from('skills').update({ name, emoji, category, subtitle, sort_order }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: 'Database error' });
  res.json({ success: true });
});

app.delete('/api/skills/:id', async (req, res) => {
  const { error } = await supabase.from('skills').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: 'Database error' });
  res.json({ success: true });
});

// --- PROJECTS API ---
app.get('/api/projects', async (req, res) => {
  const { data: projectsData, error } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
  if (error) return res.status(500).json({ error: 'Database error' });
  
  const projects = projectsData.map(r => ({
    ...r,
    features: typeof r.features === 'string' ? JSON.parse(r.features || '[]') : (r.features || []),
    tech_stack: typeof r.tech_stack === 'string' ? JSON.parse(r.tech_stack || '[]') : (r.tech_stack || [])
  }));
  res.json({ success: true, projects });
});

app.post('/api/projects', async (req, res) => {
  const { title, description, project_type, features, tech_stack, github_url, sort_order } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Title and description required' });
  
  const { data, error } = await supabase.from('projects').insert([{
    title, description, project_type: project_type || 'Project',
    features: features || [], tech_stack: tech_stack || [],
    github_url: github_url || '', sort_order: sort_order || 0
  }]).select('id');
  if (error) return res.status(500).json({ error: 'Database error' });
  res.json({ success: true, id: data[0]?.id });
});

app.put('/api/projects/:id', async (req, res) => {
  const { title, description, project_type, features, tech_stack, github_url, sort_order } = req.body;
  const { error } = await supabase.from('projects').update({
    title, description, project_type, features, tech_stack, github_url, sort_order
  }).eq('id', req.params.id);
  if (error) return res.status(500).json({ error: 'Database error' });
  res.json({ success: true });
});

app.delete('/api/projects/:id', async (req, res) => {
  const { error } = await supabase.from('projects').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: 'Database error' });
  res.json({ success: true });
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at:`);
    console.log(`  Local:   http://localhost:${PORT}`);
    console.log(`  Network: http://${getLocalIP()}:${PORT}`);
    console.log(`  Supabase Database Mode`);
  });
}

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

module.exports = app;
