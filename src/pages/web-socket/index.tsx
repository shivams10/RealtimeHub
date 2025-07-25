import { Suspense, lazy } from 'react';

const ChatApp = lazy(async () => await import('./chat-app'));

const WebSocket = () => {
  return (
    <div className='font-sans h-screen w-screen rounded-lg'>
      <Suspense
        fallback={
          <div className='flex items-center justify-center h-full'>
            <div className='text-white text-2xl'>Loading chat...</div>
          </div>
        }
      >
        <ChatApp />
      </Suspense>
    </div>
  );
};

export default WebSocket;
