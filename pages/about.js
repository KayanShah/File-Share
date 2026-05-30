import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  return (
    <Layout title="FileShare — About">
      <div className="page-header">
        <div className="page-header__eyebrow">// about</div>
        <h1 className="page-header__title">
          About <span>FileShare</span>
        </h1>
        <p className="page-header__desc">
          A lightweight, self-hosted file distribution system built on Next.js and deployed on Vercel.
        </p>
      </div>

      <div className="section-label">Overview</div>
      <div className="content-section">
        <div className="content-block">
          <div className="content-block__title">// what_is_fileshare</div>
          <div className="content-block__body">
            <p>
              FileShare is a minimal, self-hosted file sharing platform designed for speed and
              simplicity. Upload a file through the secure admin panel and instantly receive a
              direct download URL you can share with anyone — no account required on the recipient&apos;s end.
            </p>
            <p>
              The entire system runs on Next.js, deployed to Vercel&apos;s edge network. Files are stored
              in <code>public/uploads/</code> and served as static assets, meaning download speeds
              are as fast as Vercel&apos;s CDN can deliver.
            </p>
          </div>
        </div>

        <div className="content-block">
          <div className="content-block__title">// how_it_works</div>
          <div className="content-block__body">
            <ul>
              <li>Log in to the File Manager with your credentials</li>
              <li>Upload any file using the drag-and-drop interface</li>
              <li>Copy the generated direct download link</li>
              <li>Share the link — recipients click and download, no login needed</li>
              <li>Manage your library from the admin panel at any time</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="content-block__title">// tech_stack</div>
          <div className="content-block__body">
            <ul>
              <li>Next.js 14 — pages router, API routes, server-side props</li>
              <li>Formidable — multipart form / file upload handling</li>
              <li>Vercel — zero-config deployment and CDN</li>
              <li>JetBrains Mono — typography</li>
              <li>Pure CSS — no Tailwind, no component libraries</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="content-block__title">// design_principles</div>
          <div className="content-block__body">
            <p>
              The UI is intentionally minimal and terminal-inspired. Every pixel is purposeful —
              no decorative frameworks, no bloated dependencies. The goal is a tool that gets out
              of your way and lets you share files as fast as possible.
            </p>
            <p>
              Colour, typography, and layout are all controlled via CSS custom properties,
              making the entire theme trivially adjustable from a single file.
            </p>
          </div>
        </div>

        <div className="content-block">
          <div className="content-block__title">// access</div>
          <div className="content-block__body">
            <p>
              Only admins can upload files to FileShare. If you would like upload access,
              please <Link href="/contact">contact us</Link>.
            </p>
          </div>
        </div>

        <div className="content-block">
          <div className="content-block__title">// limitations</div>
          <div className="content-block__body">
            <p>
              Because files are stored in <code>public/uploads/</code>, they persist across
              deployments only if committed to the repository. For ephemeral uploads on Vercel&apos;s
              serverless infrastructure, consider integrating a blob storage provider
              (e.g. Vercel Blob, Cloudflare R2, or AWS S3) for production-scale use.
            </p>
            <p>
              This project is intended as a personal or small-team tool. There is no rate
              limiting or virus scanning on uploads by default.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
