const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config(); // Load .env first

const {
  fetchFromServer,
  getWindow,
  insertNumbers,
  calculateAvg,
} = require('./services/numberService');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());

// ✅ Serve static files (HTML/CSS/JS) from public/
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve index.html as homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ API endpoint: /numbers/:id (p, f, e, r)
app.get('/numbers/:id', async (req, res) => {
  const id = req.params.id.toLowerCase();

  if (!['p', 'f', 'e', 'r'].includes(id)) {
    return res.status(400).json({ error: 'Invalid number ID. Use p, f, e, or r.' });
  }

  try {
    const windowPrev = await getWindow();
    const fetchedNumbers = await fetchFromServer(id);
    const windowCurr = await insertNumbers(fetchedNumbers);
    const avg = calculateAvg(windowCurr);

    res.json({
      windowPrevState: windowPrev,
      windowCurrState: windowCurr,
      numbers: fetchedNumbers,
      avg,
    });
  } catch (err) {
    console.error('API Error:', err.message);
    res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
