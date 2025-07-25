import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-black-400'>
      <div className='bg-white rounded-xl shadow-md p-10 text-center space-y-6'>
        <h1 className='text-4xl font-bold text-gray-800'>📊 Welcome to the Real Time Session</h1>
        <div className='flex gap-4'>
          <button
            className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
            onClick={async () => await navigate('/polling')}
          >
            Go to Polling Page
          </button>
          <button
            className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
            onClick={async () => await navigate('/web-socket')}
          >
            Go to WebSocket Page
          </button>
          <button
            className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
            onClick={async () => await navigate('/server-sent')}
          >
            Go to Server Sent Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
