import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'File Manager' },
];

export default function Layout({ children, title = 'FileShare' }) {
  const router = useRouter();
  const fillRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight) * 100;
      if (fillRef.current) fillRef.current.style.height = scrolled + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    const targets = document.querySelectorAll(
      '.card, .feature-card, .content-block, .contact-item, .contact-form-wrap'
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('revealed'), i * 80);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [router.pathname, children]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="scroll-bar">
        <div className="scroll-bar__fill" ref={fillRef} />
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`sidebar-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />

      <div className={`layout`}>
        <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
          <div className="sidebar__logo">
            <div className="sidebar__logo-text">// FileShare_v1</div>
            <div className="sidebar__logo-sub">SECURE · FAST · DIRECT</div>
          </div>

          <div className="sidebar__section-label">Navigation</div>
          <nav className="sidebar__nav">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`sidebar__link ${router.pathname === href ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="sidebar__footer">
            <div className="sidebar__footer-title">// FileShare System</div>
            <div className="sidebar__footer-version">v1.0.0 · {new Date().getFullYear()}</div>
            <a
              href="https://github.com/kayanshah"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar__footer-author"
            >
              Kayan Shah ↗
            </a>
          </div>
        </aside>

        <main className="main">{children}</main>
      </div>

      <div className="scroll-indicator" onClick={scrollTop} title="Back to top">
        ↑
      </div>
    </>
  );
}
