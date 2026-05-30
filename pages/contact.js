import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout title="FileShare — Contact">
      <div className="page-header">
        <div className="page-header__eyebrow">// contact</div>
        <h1 className="page-header__title">
          Get in <span>Touch</span>
        </h1>
        <p className="page-header__desc">
          Questions, issues, or feedback? Reach out directly by email.
        </p>
      </div>

      <div className="section-label">Contact</div>

      <div className="contact-info">
        {[
          { label: 'Operator', value: 'Kayan Shah' },
          { label: 'Email', value: 'develop@kayanshah.com', href: 'mailto:develop@kayanshah.com' },
          { label: 'Platform', value: 'FileShare v1.0' },
          { label: 'Deployment', value: 'Vercel · Edge Network' },
          { label: 'Response time', value: 'Usually within 24h' },
        ].map((item) => (
          <div className="contact-item" key={item.label}>
            <div className="contact-item__label">{item.label}</div>
            {item.href ? (
              <a className="contact-item__value contact-item__link" href={item.href}>
                {item.value}
              </a>
            ) : (
              <div className="contact-item__value">{item.value}</div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}
