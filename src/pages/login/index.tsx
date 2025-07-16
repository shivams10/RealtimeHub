import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '#/api/login';

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
      localStorage.removeItem('username');
      localStorage.removeItem('authToken');
      localStorage.removeItem('name');
      setError(err.message || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const getInputStyle = (inputName: string, focusedInput: string, error: string, value: string) => {
    return {
      ...styles.input,
      ...(focusedInput === inputName ? styles.inputFocused : {}),
      ...(error && !value ? styles.inputError : {}),
    };
  };

  const getButtonStyle = (isLoading: boolean, email: string, password: string) => {
    return {
      ...styles.button,
      ...(isLoading ? styles.buttonLoading : {}),
      ...(!email || !password ? styles.buttonDisabled : {}),
    };
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

const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    height: '94vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    width: '97.2vw',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  iconContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    marginBottom: '16px',
    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
  },
  icon: {
    width: '32px',
    height: '32px',
    color: 'white',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a202c',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#718096',
    margin: '0',
    fontWeight: '400',
  },
  form: {
    marginBottom: '24px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
    letterSpacing: '0.025em',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: '#ffffff',
    color: '#1a202c',
    boxSizing: 'border-box' as const,
  },
  inputFocused: {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    transform: 'translateY(-1px)',
  },
  inputError: {
    borderColor: '#f56565',
    boxShadow: '0 0 0 3px rgba(245, 101, 101, 0.1)',
  },
  button: {
    width: '100%',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    letterSpacing: '0.025em',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
  },
  buttonLoading: {
    opacity: 0.8,
    cursor: 'not-allowed',
    transform: 'none',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#fed7d7',
    borderRadius: '8px',
    border: '1px solid #feb2b2',
    color: '#c53030',
    fontSize: '14px',
    marginTop: '16px',
  },
  errorIcon: {
    width: '16px',
    height: '16px',
    flexShrink: 0,
  },
  successContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#c6f6d5',
    borderRadius: '8px',
    border: '1px solid #9ae6b4',
    color: '#276749',
    fontSize: '14px',
    marginTop: '16px',
  },
  successIcon: {
    width: '20px',
    height: '20px',
    flexShrink: 0,
    marginTop: '2px',
  },
  successTitle: {
    fontWeight: '600',
    margin: '0 0 4px 0',
  },
  successText: {
    margin: '0',
    opacity: 0.8,
  },
};

// Add CSS animation for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 24px !important;
      margin: 16px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default LoginPage;
