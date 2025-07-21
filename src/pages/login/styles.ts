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

export { getInputStyle, styles, getButtonStyle };
