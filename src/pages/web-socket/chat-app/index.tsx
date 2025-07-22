import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Socket } from 'socket.io-client';

import { getChatHistoryData } from '#/api/web-socket';

import { connectSocket, disconnectSocket } from '../../../utils/socket';

interface IUser {
  name: string;
  email: string;
  online: boolean;
}

function ChatApp() {
  const [loggedInUserDisplayName, setLoggedInUserDisplayName] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>({ name: '', email: '', online: false });
  const [messages, setMessages] = useState<Array<{ from: string; message: string; timestamp: string }>>(
    [],
  );
  const [text, setText] = useState('');
  const [socket, setSocket] = useState<Socket>();
  const navigate = useNavigate();
  const username = localStorage.getItem('username') ?? '';

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const socket = connectSocket(token);
      setSocket(socket);
    }
    return () => disconnectSocket();
  }, []);

  useEffect(() => {
    if (!username) {
      console.error('Username not found in localStorage');
      void navigate('/login');
      return;
    }
    const loggedIn = users.find(user => user.email === username);
    setLoggedInUserDisplayName(loggedIn?.name ?? '');

    return () => localStorage.removeItem('name');
  }, [users]);

  const getChatHistory = async (user1: string, user2: string) => {
    try {
      const chatInfo = await getChatHistoryData(user1, user2);
      setMessages(chatInfo);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setMessages([]);
    }
  };

  useEffect(() => {
    socket?.on('users', userList => setUsers(userList));
    socket?.on('message', msg => setMessages(prev => [...prev, msg]));

    if (selectedUser?.email) {
      void getChatHistory(username, selectedUser.email);
    }

    return () => {
      socket?.off('users');
      socket?.off('message');
    };
  }, [socket, selectedUser]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socket?.emit('message', {
      from: username,
      to: selectedUser.email,
      message: text,
    });
    setText('');
  };

  const handleLogout = () => {
    localStorage.clear();
    disconnectSocket();
    void navigate('/login');
  };

  const filteredUsers = users.filter(user => user.email !== username);

  return (
    <div className='flex h-screen font-sans'>
      <div className='w-1/5 border-r border-gray-300 bg-black text-white p-4 overflow-y-auto'>
        <h3 className='text-white text-lg font-semibold mb-4'>Contacts</h3>
        <div className='flex flex-col h-[85vh]'>
          {filteredUsers.length ? (
            <ul className='list-none p-0 flex-grow'>
              {filteredUsers
                .filter(user => user.email !== username)
                .map(user => (
                  <li
                    key={user.email}
                    onClick={() => setSelectedUser(user)}
                    className={`p-2 mb-2 rounded cursor-pointer flex items-center gap-2 border-2 ${
                      selectedUser.email === user.email
                        ? 'border-green-500 bg-gray-900'
                        : 'border-transparent bg-gray-900'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        user.online ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    />
                    {user.name}
                  </li>
                ))}
            </ul>
          ) : (
            <div className='flex-grow flex items-center justify-center text-center text-white'>
              No active users.
            </div>
          )}

          <div className='flex items-center pt-4'>
            <div className='bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold'>
              {loggedInUserDisplayName
                ?.split(' ')
                .map(part => part[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()}
            </div>
            <div className='ml-4'>{loggedInUserDisplayName}</div>
            <div
              className='ml-auto text-white cursor-pointer p-2 hover:bg-gray-700 rounded'
              onClick={handleLogout}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                <polyline points='16,17 21,12 16,7'></polyline>
                <line x1='21' y1='12' x2='9' y2='12'></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className='w-4/5 p-4 flex flex-col'>
        {selectedUser.email ? (
          <>
            <h3 className='text-xl font-semibold mb-4'>Chat with {selectedUser.name}</h3>
            <div className='flex-1 overflow-y-auto mb-4 flex flex-col gap-2'>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[60%] p-3 rounded shadow ${
                    m.from === username
                      ? 'self-end bg-green-100 text-black'
                      : 'self-start bg-gray-200 text-black'
                  }`}
                >
                  <div className='text-sm'>{m.message}</div>
                  <div className='text-xs text-right mt-1'>
                    {new Date(m.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className='flex gap-2'>
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && text.trim()) {
                    sendMessage();
                  }
                }}
                placeholder='Type a message'
                className='flex-1 p-2 rounded-full border border-gray-300'
              />
              <button
                onClick={sendMessage}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className='m-auto text-lg text-white'>Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
}

export default ChatApp;
