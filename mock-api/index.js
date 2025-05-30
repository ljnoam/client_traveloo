const express = require('express');
const cors = require('cors');
const path = require('path');

// charge les JSON factices
const flights = require(path.join(__dirname, 'data/flights.json'));
const hotels  = require(path.join(__dirname, 'data/hotels.json'));

const app = express();
app.use(cors());
app.use(express.json());

// GET /search → renvoie sans filtre ni tri
app.get('/search', (req, res) => {
  return res.json({ success: true, flights, hotels });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Mock API running on http://localhost:${PORT}`)
);
