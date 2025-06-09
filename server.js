const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const manifest = require('../data/manifest.json');
app.use(cors());

const scrapers = {};
manifest.sources.forEach(source => {
  scrapers[source.id] = require(path.join(__dirname, 'scrapers', source.script));
});

app.use(express.static(path.join(__dirname, '../client')));

app.get('/api/search', async (req, res) => {
  const { q, source } = req.query;
  if (!q || !source || !scrapers[source]) return res.status(400).send('Invalid params');
  const results = await scrapers[source].search(q);
  res.json(results);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
