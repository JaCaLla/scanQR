const express = require('express');
const QRCode = require('qrcode');
const os = require('os');

const app = express();
const port = 3000;
const hostIP = process.env.HOST_IP || 'Desconocida';

app.get('/', (req, res) => {
    const url = `http://${hostIP}:${port}/data`;
    QRCode.toDataURL(url, (err, qrCode) => {
        if (err) res.send('Error generating QR code');
        res.send(`<!DOCTYPE html><html><body>
        <h2>Scan the QR code:</h2>
        <img src="${qrCode}" />
        </body></html>`);
    });
});

app.get('/data', (req, res) => {
    res.json({ message: 'Hello from QR-API-Server!' });
});

app.listen(port, () => {
    console.log(`Server running on http://${hostIP}:${port}`);
});