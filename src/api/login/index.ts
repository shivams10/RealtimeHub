const API_URL: string = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error('API_URL is not defined in environment variables');
}
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const resData = await response.json();
    throw new Error(resData.message || 'Login failed');
  }
  localStorage.setItem('username', email);

  const data = await response.json();
  return data;
};
