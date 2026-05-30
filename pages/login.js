import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const router = useRouter();
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds),
    });

    if (res.ok) {
      sessionStorage.setItem('fs_auth', '1');
      router.push('/admin');
    } else {
      setError('// ERROR: Invalid credentials. Access denied.');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>FileShare — Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="login-wrap">
        <div className="login-box">
          <div className="login-box__logo">// FileShare_v1</div>
          <div className="login-box__title">Access Required</div>
          <div className="login-box__sub">
            Enter your credentials to access the file manager.
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                type="text"
                autoComplete="username"
                required
                value={creds.username}
                onChange={(e) => setCreds({ ...creds, username: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                autoComplete="current-password"
                required
                value={creds.password}
                onChange={(e) => setCreds({ ...creds, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? '// Authenticating...' : '> Authenticate'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
