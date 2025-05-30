// flights-api/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');

// charge le JSON factice depuis le client
const { flights } = require(path.join(__dirname, '../client/src/data/mockTrip.json'));

const app = express();
app.use(cors());

// GET /flights/search → renvoie tous les vols
app.get('/flights/search', (req, res) => {
  res.json({ success: true, flights });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Flights mock API listening on http://localhost:${PORT}`);
});
