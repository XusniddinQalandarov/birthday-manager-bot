// api/colleagues.js
const axios = require('axios');

module.exports = async (req, res) => {
  const { JSONBIN_ID, JSONBIN_KEY } = process.env;
  if (!JSONBIN_ID || !JSONBIN_KEY) {
    return res.status(500).json({ error: 'Missing JSONBIN_ID or JSONBIN_KEY' });
  }

  const BIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_ID}`;
  const headers = {
    'X-Master-Key': JSONBIN_KEY,
    'Content-Type': 'application/json'
  };

  try {
    if (req.method === 'GET') {
      const { data } = await axios.get(BIN_URL, { headers });
      return res.status(200).json(data.record || []);
    }

    if (req.method === 'POST') {
      const { colleagues } = req.body;
      await axios.put(BIN_URL, colleagues, { headers });
      return res.status(204).end();
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message });
  }
};
