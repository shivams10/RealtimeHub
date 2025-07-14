import { Suspense, lazy } from 'react';

const ChatApp = lazy(async () => await import('./chat-app'));

const WebSocket = () => {
  return (
    <div style={styles.container}>
      <Suspense fallback={<div>Loading chat...</div>}>
        <ChatApp />
      </Suspense>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
  },
};

export default WebSocket;
