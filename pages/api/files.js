import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  let files = [];
  try {
    const entries = fs.readdirSync(uploadsDir);
    files = entries
      .filter((name) => name !== '.gitkeep')
      .map((name) => {
        const stat = fs.statSync(path.join(uploadsDir, name));
        return { name, size: stat.size, mtime: stat.mtimeMs, url: `/uploads/${encodeURIComponent(name)}` };
      })
      .sort((a, b) => b.mtime - a.mtime);
  } catch {
    files = [];
  }
  res.status(200).json({ files });
}
