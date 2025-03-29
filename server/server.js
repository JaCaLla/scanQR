// server.js
const express = require('express');
const path = require('path');
const qr = require('qrcode'); // Use 'qrcode' library for generating QR codes
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint for generating QR code and embeddit into HTML
app.get('/generate-qr', (req, res) => {
  const qrData = "http://localhost:3000/api/data"; // endpoint url to scan

  qr.toDataURL(qrData, (err, qrCodeUrl) => {
    if (err) {
      res.status(500).send("Error generando QR");
      return;
    }

    // Sends HTML with QR code
    res.send(`
      <html>
        <head>
          <title>Scan QR code</title>
        </head>
        <body>
          <h1>Scan QR code</h1>
          <img src="${qrCodeUrl}" alt="QR Code"/>
        </body>
      </html>
    `);
  });
});

// Endpoint that SwiftUI app will consume
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Node.js server' });
});

// Start up server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});