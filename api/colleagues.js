// api/colleagues.js
import axios from 'axios';

export default async function handler(req, res) {
  const { JSONBIN_ID, JSONBIN_KEY } = process.env;
  if (!JSONBIN_ID || !JSONBIN_KEY) {
    return res.status(500).json({ error: 'Missing JSONBIN_ID or JSONBIN_KEY' });
  }

  const BIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_ID}`;
  const headers = { 'X-Master-Key': JSONBIN_KEY };

  try {
    if (req.method === 'GET') {
      const { data } = await axios.get(BIN_URL, { headers });
      return res.status(200).json(data.record || []);
    }
    if (req.method === 'POST') {
      const { colleagues } = req.body;
      await axios.put(BIN_URL, colleagues, {
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });
      return res.status(204).end();
    }
    res.setHeader('Allow', ['GET','POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
