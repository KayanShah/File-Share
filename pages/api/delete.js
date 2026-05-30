import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filename } = req.body;
  if (!filename || filename.includes('..') || filename.includes('/')) {
    return res.status(400).json({ error: 'Invalid filename' });
  }

  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
  try {
    fs.unlinkSync(filePath);
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Delete failed: ' + err.message });
  }
}
