const API_URL: string = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error('API_URL is not defined in environment variables');
}

export const getChatHistoryData = async (user1: string, user2: string) => {
  const token = localStorage.getItem('authToken') ?? '';
  const response = await fetch(
    `${API_URL}/chat/history?user1=${encodeURIComponent(user1)}&user2=${encodeURIComponent(user2)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error('Failed to fetch chat history');

  const data = await response.json();
  return data;
};
