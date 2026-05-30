// Login details can be found in Vercel under Environment Variables

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import Layout from '../components/Layout';

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function formatDate(ms) {
  const d = new Date(ms);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function Admin({ files }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [fileList] = useState(files);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const shareUrl = (name) => `${window.location.origin}/file/${encodeURIComponent(name)}`;

  const copyLink = (name) => {
    navigator.clipboard.writeText(shareUrl(name)).then(() => {
      setCopiedUrl(name);
      setTimeout(() => setCopiedUrl(null), 2000);
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem('fs_auth') !== '1') {
      router.replace('/login');
    } else {
      setAuthed(true);
    }
  }, [router]);

  const logout = () => {
    sessionStorage.removeItem('fs_auth');
    router.push('/login');
  };

  if (!authed) return null;

  return (
    <Layout title="FileShare — File Manager">
      <div className="admin-header">
        <div>
          <div className="admin-header__title">// File Manager</div>
          <div className="admin-header__meta">
            {fileList.length} file{fileList.length !== 1 ? 's' : ''} in system
          </div>
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout ↗
        </button>
      </div>

      <div className="section-label">Files</div>
      {fileList.length === 0 ? (
        <div className="no-files">
          // No files found — add files to public/uploads in GitHub.
        </div>
      ) : (
        <div className="cards-grid">
          {fileList.map((f) => (
            <div className="card revealed" key={f.name}>
              <div className="card__filename">{f.name}</div>
              <div className="card__meta">
                <div className="card__meta-item">
                  SIZE <span>{formatSize(f.size)}</span>
                </div>
                <div className="card__meta-item">
                  DATE <span>{formatDate(f.mtime)}</span>
                </div>
              </div>
              <div className="card__share-url">
                {typeof window !== 'undefined' ? shareUrl(f.name) : `/file/${f.name}`}
              </div>
              <div className="card__actions">
                <button
                  className="card__copy-btn"
                  onClick={() => copyLink(f.name)}
                >
                  {copiedUrl === f.name ? '✓ Copied!' : '>> Copy Link'}
                </button>
                <a
                  className="card__download"
                  href={`/api/download/${encodeURIComponent(f.name)}`}
                >
                  Download ↓
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
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
  return { props: { files } };
}
