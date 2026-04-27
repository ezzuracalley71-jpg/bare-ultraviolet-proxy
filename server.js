const express = require('express');
const cors = require('cors');
const path = require('path');
const bareServer = require('@tomphttp/bare-server-node');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Bare Server
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Proxy server is running on http://localhost:${PORT}`);
  console.log(`📡 Bare API available at http://localhost:${PORT}/bare/`);
  console.log(`🌐 Web interface available at http://localhost:${PORT}\n`);
});

// Mount Bare Server
if (!bareServer.routeRequest(app, server)) {
  // If Bare didn't handle it, 404
  app.use((req, res) => {
    res.status(404).send('Not found');
  });
}

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
