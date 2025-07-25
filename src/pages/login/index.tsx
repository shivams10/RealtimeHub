import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '#/api/login';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const data = await login(email, password);
      setToken(data.token);
      localStorage.setItem('authToken', data.token);
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

  const onKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email && password) {
      await handleLogin();
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 px-4'>
      <div className='w-full max-w-md bg-white/90 backdrop-blur-md border border-white/30 shadow-2xl rounded-2xl p-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg mb-4'>
            <svg
              className='w-8 h-8 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              />
            </svg>
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>Sign in to your account</h1>
        </div>

        {/* Form */}
        <div className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
            <input
              type='email'
              className={`w-full text-black bg-white px-4 py-3 border-2 rounded-xl text-sm outline-none transition-all ${
                error && !email
                  ? 'border-red-400 ring-1 ring-red-200'
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input
              type='password'
              className={`w-full text-black bg-white px-4 py-3 border-2 rounded-xl text-sm outline-none transition-all ${
                error && !password
                  ? 'border-red-400 ring-1 ring-red-200'
                  : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
              placeholder='Enter your password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={isLoading}
            />
          </div>

          <button
            className={`w-full py-3 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2
              ${
                isLoading || !email || !password
                  ? 'bg-indigo-400 opacity-50 cursor-not-allowed'
                  : 'bg-gradient-to-br from-indigo-500 to-purple-600 hover:brightness-110'
              }
            `}
            onClick={handleLogin}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <>
                <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {error && (
            <div className='flex items-center gap-2 p-3 bg-red-100 border border-red-300 rounded-lg text-red-600 text-sm mt-2'>
              <svg className='w-4 h-4 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
              {error}
            </div>
          )}

          {token && (
            <div className='flex items-start gap-3 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700 text-sm mt-2'>
              <svg className='w-5 h-5 mt-1 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
              <div>
                <p className='font-semibold mb-1'>Login Successful!</p>
                <p className='opacity-80'>Redirecting to chat...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
