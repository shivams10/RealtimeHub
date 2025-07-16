import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '#/api/login';

import { styles, getInputStyle, getButtonStyle } from './styles';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const data = await login(email, password);
      setToken(data.token);

      // Store all necessary user data in localStorage
      localStorage.setItem('authToken', data.token);

      // Navigate to web-socket page
      setTimeout(() => {
        void navigate('/web-socket');
        setIsLoading(false);
      }, 1000);
    } catch (err: any) {
      localStorage.clear();
      setError(err.message || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const onKeyDown = async (e: any) => {
    if (e.key === 'Enter' && email && password) {
      await handleLogin();
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <svg style={styles.icon} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              />
            </svg>
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        {/* Form */}
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={getInputStyle('email', focusedInput, error, email)}
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput('')}
              disabled={isLoading}
              onKeyDown={onKeyDown}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={getInputStyle('password', focusedInput, error, password)}
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput('')}
              disabled={isLoading}
              onKeyDown={onKeyDown}
            />
          </div>

          <button
            style={getButtonStyle(isLoading, email, password)}
            onClick={handleLogin}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <div style={styles.buttonContent}>
                <div style={styles.spinner}></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          {error && (
            <div style={styles.errorContainer}>
              <svg style={styles.errorIcon} fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {token && (
            <div style={styles.successContainer}>
              <svg style={styles.successIcon} fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
              <div>
                <p style={styles.successTitle}>Login Successful!</p>
                <p style={styles.successText}>Redirecting to chat...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
