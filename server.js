    // server.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Azure provides the PORT environment variable

app.use(express.static(path.join(__dirname, 'wwwroot'))); // Serve static files

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'wwwroot', 'index.html')); // Fallback to index.html
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
