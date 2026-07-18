const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, '..', 'messages.txt');

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

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const separator = '='.repeat(50);

  const entry = `${separator}
📩 NEW MESSAGE
${separator}
Date:    ${timestamp}
Name:    ${name}
Email:   ${email}
Subject: ${subject}

Message:
${message}

`;

  fs.appendFile(MESSAGES_FILE, entry, 'utf8', (err) => {
    if (err) {
      console.error('Error saving message:', err);
      return res.status(500).json({ error: 'Failed to save message.' });
    }
    console.log(`✅ New message from ${name} (${email})`);
    res.json({ success: true, message: 'Message saved successfully!' });
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
