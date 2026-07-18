const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the parent directory (portfolio root)
app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at:`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Network: http://${getLocalIP()}:${PORT}`);
});

function getLocalIP() {
  const os = require('os');
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
