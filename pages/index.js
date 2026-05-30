import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="FileShare — Home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__tag">// initialising FileShare_v1</div>
        <div className="hero__byline">
          Created by{' '}
          <a href="https://github.com/kayanshah" target="_blank" rel="noopener noreferrer">
            Kayan Shah
          </a>
        </div>
        <h1 className="hero__headline">
          Share files.<br />
          <em>No friction.</em>
        </h1>
        <p className="hero__tagline">
          Upload once. Share anywhere. Direct download links, no sign-up required for recipients.
          <span className="cursor" />
        </p>
        <div className="hero__ctas">
          <Link href="/admin" className="btn-primary">
            &gt; Access Manager
          </Link>
          <Link href="/about" className="btn-secondary">
            Learn more
          </Link>
        </div>
        <div className="hero__credit">
          Made by{' '}
          <a href="https://github.com/kayanshah" target="_blank" rel="noopener noreferrer">
            Kayan Shah
          </a>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-row">
        {[
          { val: '∞', label: 'Files supported' },
          { val: '1-click', label: 'Download UX' },
          { val: 'Direct', label: 'Link serving' },
          { val: 'Vercel', label: 'Deployment' },
        ].map((s) => (
          <div className="stat-block" key={s.label}>
            <div className="stat-block__val">{s.val}</div>
            <div className="stat-block__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="section-label">Features</div>
      <div className="features-grid">
        {[
          {
            icon: '⚡',
            title: 'Direct downloads',
            desc: 'Files are served as direct download links from /public/uploads — no redirect chains, no paywalls.',
          },
          {
            icon: '🔒',
            title: 'Protected upload panel',
            desc: 'The management interface is login-gated. Only authorised users can upload and view the full file list.',
          },
          {
            icon: '📁',
            title: 'Any file type',
            desc: 'Upload PDFs, ZIPs, images, executables, datasets — no restriction on file format.',
          },
          {
            icon: '🚀',
            title: 'Vercel-ready',
            desc: 'One git push deploys the full stack. Built on Next.js with zero configuration needed.',
          },
          {
            icon: '📋',
            title: 'File metadata',
            desc: 'See filename, size, and upload date at a glance for every file in the system.',
          },
          {
            icon: '🖥️',
            title: 'Terminal aesthetic',
            desc: 'JetBrains Mono throughout. A clean, hacker-inspired UI that stays out of the way.',
          },
        ].map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-card__icon">{f.icon}</div>
            <div className="feature-card__title">{f.title}</div>
            <div className="feature-card__desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
