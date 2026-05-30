import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function getFileType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  if (['pdf'].includes(ext)) return 'pdf';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif'].includes(ext)) return 'image';
  if (['mp4', 'mov', 'webm', 'ogg'].includes(ext)) return 'video';
  if (['mp3', 'wav', 'aac', 'flac', 'm4a'].includes(ext)) return 'audio';
  if (['docx', 'pptx', 'doc', 'ppt'].includes(ext)) return 'office';
  if (['xlsx', 'xls'].includes(ext)) return 'excel';
  if (['py', 'txt', 'js', 'ts', 'jsx', 'tsx', 'json', 'csv', 'md', 'html', 'css', 'xml', 'yaml', 'yml', 'sh', 'c', 'cpp', 'java', 'rs', 'go'].includes(ext)) return 'text';
  return 'other';
}

function TextPreview({ fileUrl }) {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(fileUrl)
      .then((r) => r.text())
      .then(setContent)
      .catch(() => setError(true));
  }, [fileUrl]);

  if (error) return null;
  if (content === null) return <div className="file-preview file-preview--text">Loading…</div>;

  return (
    <pre className="file-preview file-preview--text">{content}</pre>
  );
}

function Preview({ filename, fileUrl, origin }) {
  const type = getFileType(filename);

  if (type === 'pdf') {
    return (
      <iframe
        className="file-preview file-preview--pdf"
        src={fileUrl}
        title={filename}
      />
    );
  }

  if (type === 'image') {
    return (
      <div className="file-preview file-preview--image">
        <img src={fileUrl} alt={filename} />
      </div>
    );
  }

  if (type === 'video') {
    return (
      <video className="file-preview file-preview--video" controls>
        <source src={fileUrl} />
        Your browser does not support video playback.
      </video>
    );
  }

  if (type === 'audio') {
    return (
      <audio className="file-preview file-preview--audio" controls>
        <source src={fileUrl} />
        Your browser does not support audio playback.
      </audio>
    );
  }

  if (type === 'office') {
    const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(origin + fileUrl)}`;
    return (
      <iframe
        className="file-preview file-preview--office"
        src={viewerUrl}
        title={filename}
      />
    );
  }

  if (type === 'excel') {
    return (
      <div className="file-preview file-preview--unavailable">
        Preview not available for Excel files — download to view.
      </div>
    );
  }

  if (type === 'text') {
    return <TextPreview fileUrl={fileUrl} />;
  }

  return null;
}

export default function FilePage({ filename, size, found, fileUrl, origin }) {
  return (
    <>
      <Head>
        <title>{filename ? `${filename} — FileShare` : 'FileShare'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="file-page">
        <div className="file-page__card">
          <div className="file-page__tag">// FileShare_v1</div>
          <div className="file-page__byline">
            Made by{' '}
            <a href="https://github.com/kayanshah" target="_blank" rel="noopener noreferrer">
              Kayan Shah
            </a>
          </div>

          {found ? (
            <>
              <div className="file-page__name">{filename}</div>
              <div className="file-page__size">{formatSize(size)}</div>

              <Preview filename={filename} fileUrl={fileUrl} origin={origin} />

              <a
                className="btn-primary file-page__download"
                href={`/api/download/${encodeURIComponent(filename)}`}
              >
                &gt;&gt; Download ↓
              </a>
            </>
          ) : (
            <>
              <div className="file-page__icon">⚠</div>
              <div className="file-page__name">Error — Content has been deleted.</div>
              <div className="file-page__size">
                Please{' '}
                <Link href="/contact">contact us</Link>
                {' '}if you believe this is a mistake.
              </div>
            </>
          )}

          <Link href="/" className="file-page__home">
            ← Back to home
          </Link>

          <div className="file-page__credit">
            Built by{' '}
            <a href="https://github.com/kayanshah" target="_blank" rel="noopener noreferrer">
              Kayan Shah
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  const filename = params.filename;
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
  const fileUrl = `/uploads/${encodeURIComponent(filename)}`;
  const origin = `${req.headers['x-forwarded-proto'] ?? 'https'}://${req.headers.host}`;

  let size = 0;
  let found = false;
  try {
    const stat = fs.statSync(filePath);
    size = stat.size;
    found = true;
  } catch {
    found = false;
  }

  return { props: { filename, size, found, fileUrl, origin } };
}
