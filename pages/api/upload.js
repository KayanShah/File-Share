import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const form = formidable({
    uploadDir: uploadsDir,
    keepExtensions: true,
    maxFileSize: 500 * 1024 * 1024, // 500 MB
    filename: (_name, _ext, part) => {
      const original = part.originalFilename || 'upload';
      const safe = original.replace(/[^a-zA-Z0-9._\-]/g, '_');
      return safe;
    },
  });

  try {
    const [, files] = await form.parse(req);
    const fileArray = files.file;
    if (!fileArray || fileArray.length === 0) {
      return res.status(400).json({ error: 'No file received' });
    }

    const file = fileArray[0];
    const filename = path.basename(file.filepath);

    return res.status(200).json({
      filename,
      size: file.size,
      url: `/uploads/${filename}`,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Upload failed: ' + err.message });
  }
}
