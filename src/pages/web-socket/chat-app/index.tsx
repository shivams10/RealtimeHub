import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Socket } from 'socket.io-client';

import { getChatHistoryData } from '#/api/web-socket';

import styles from './styles';
import { connectSocket, disconnectSocket } from '../../../utils/socket';
interface IUser {
  name: string;
  email: string;
  online: boolean;
}

function ChatApp() {
  const [loggedInUserDisplayName, setLoggedInUserDisplayName] = useState('');
  const [users, setUsers] = useState<Array<{ name: string; email: string; online: boolean }>>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>({ name: '', email: '', online: false });

  const [messages, setMessages] = useState<
    Array<{ from: string; message: string; timestamp: string }>
  >([]);

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
    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (!username) {
      console.error('Username not found in localStorage');
      void navigate('/login');
      return;
    } else {
      const loggedIn = users.find(user => user.email === username);
      setLoggedInUserDisplayName(loggedIn?.name ?? '');
    }

    return () => {
      localStorage.removeItem('name');
    };
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
    socket?.on('users', userList => {
      setUsers(userList);
    });

    socket?.on('message', msg => {
      setMessages(prev => [...prev, msg]);
    });

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

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarHeader}>Contacts</h3>
        <div style={styles.sidebarContent}>
          {users.length ? (
            <ul style={styles.contactsList}>
              {users
                .filter(user => user.email !== username)
                .map(user => (
                  <li
                    key={user.email}
                    onClick={() => setSelectedUser(user)}
                    style={
                      selectedUser.email === user.email
                        ? styles.contactItemSelected
                        : styles.contactItemUnselected
                    }
                  >
                    <span
                      style={{
                        ...styles.statusDot,
                        backgroundColor: user.online ? 'green' : 'gray',
                      }}
                    />
                    {user.name}
                  </li>
                ))}
            </ul>
          ) : (
            <div style={styles.placeholder}>No active users.</div>
          )}

          <div style={styles.userProfile}>
            <div style={styles.userAvatar}>
              {loggedInUserDisplayName
                ?.split(' ')
                .map(part => part[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()}
            </div>
            <div style={styles.userName}>{loggedInUserDisplayName}</div>
            <div style={styles.logoutOption} onClick={handleLogout}>
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

      <div style={styles.chatArea}>
        {selectedUser.email ? (
          <>
            <h3>Chat with {selectedUser.name}</h3>
            <div style={styles.messagesContainer}>
              {messages.map((m, i) => (
                <div key={i} style={m.from === username ? styles.messageOwn : styles.messageOther}>
                  <div style={styles.messageText}>{m.message}</div>
                  <div style={styles.messageTimestamp}>
                    {new Date(m.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.inputContainer}>
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && text.trim()) {
                    sendMessage();
                  }
                }}
                placeholder='Type a message'
                style={styles.messageInput}
              />
              <button onClick={sendMessage} style={styles.sendButton}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div style={styles.placeholder}>Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
}

export default ChatApp;
