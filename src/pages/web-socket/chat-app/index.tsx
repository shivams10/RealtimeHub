import { useEffect, useState } from 'react';

import { socket } from '../socket';

function ChatApp() {
  const [loggedInUserDisplayName, setLoggedInUserDisplayName] = useState('');
  const [users, setUsers] = useState<Array<{ name: string; email: string; online: boolean }>>([]);
  const [selectedUser, setSelectedUser] = useState<{
    name: string;
    email: string;
    online: boolean;
  }>({ name: '', email: '', online: false });

  const [messages, setMessages] = useState<
    Array<{ from: string; message: string; timestamp: string }>
  >([]);
  const [text, setText] = useState('');
  const username = localStorage.getItem('username') ?? '';

  useEffect(() => {
    if (!username) {
      console.error('Username not found in localStorage');
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
      const token = localStorage.getItem('authToken') ?? '';

      const response = await fetch(
        `http://localhost:3000/chat/history?user1=${encodeURIComponent(
          user1,
        )}&user2=${encodeURIComponent(user2)}`,
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
      setMessages(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setMessages([]);
    }
  };

  useEffect(() => {
    socket.on('users', userList => {
      setUsers(userList);
    });

    socket.on('message', msg => {
      setMessages(prev => [...prev, msg]);
    });

    if (selectedUser?.email) {
      void getChatHistory(username, selectedUser.email);
    }

    return () => {
      socket.off('users');
      socket.off('message');
    };
  }, [selectedUser]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socket.emit('message', {
      from: username,
      to: selectedUser.email,
      message: text,
    });
    setText('');
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

const styles: any = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial',
  },
  sidebar: {
    width: '15vw',
    borderRight: '1px solid #ccc',
    backgroundColor: '#000',
    color: '#fff',
    padding: '1rem',
    overflowY: 'auto',
  },
  sidebarHeader: {
    color: '#fff',
  },
  sidebarContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '85vh',
  },
  contactsList: {
    listStyle: 'none',
    padding: 0,
    flexGrow: 1,
  },
  contactItemSelected: {
    padding: '10px',
    marginBottom: '8px',
    backgroundColor: '#111',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '2px solid #4caf50',
  },
  contactItemUnselected: {
    padding: '10px',
    marginBottom: '8px',
    backgroundColor: '#111',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '2px solid transparent',
  },
  statusDot: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  userProfile: {
    display: 'flex',
    paddingTop: '1rem',
  },
  userAvatar: {
    backgroundColor: '#4caf50',
    color: 'white',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  userName: {
    marginTop: '8px',
    marginLeft: '16px',
  },
  chatArea: {
    width: '70vw',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    margin: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  messageOwn: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    padding: '10px 15px',
    borderRadius: '10px',
    maxWidth: '60%',
    color: 'black',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  messageOther: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f0f0',
    padding: '10px 15px',
    borderRadius: '10px',
    maxWidth: '60%',
    color: 'black',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  messageText: {
    fontSize: '0.9rem',
  },
  messageTimestamp: {
    fontSize: '0.7rem',
    textAlign: 'right',
    marginTop: '5px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
  },
  messageInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
  },
  sendButton: {
    padding: '10px 20px',
  },
  placeholder: {
    margin: 'auto',
    fontSize: '1.2rem',
  },
};
