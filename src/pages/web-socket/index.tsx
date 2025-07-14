import { Suspense, lazy } from 'react';

const ChatApp = lazy(async () => await import('./chat-app'));

const WebSocket = () => {
  return (
    <div style={styles.container}>
      <Suspense
        fallback={
          <div style={styles.loaderWrapper}>
            <div style={styles.loaderText}>Loading chat...</div>
          </div>
        }
      >
        <ChatApp />
      </Suspense>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
    height: '100vh', // Full screen height
    width: '100vw', // Full screen width
  },
  loaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loaderText: {
    fontSize: '1.5rem',
    color: 'white',
  },
};

export default WebSocket;
