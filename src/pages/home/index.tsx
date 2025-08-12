import { useNavigate } from 'react-router-dom';

import realTimeImg from '../../assets/real-time.png';

const Home = () => {
  const navigate = useNavigate();

  const buttonClass = `
    bg-gradient-to-r from-red-700 to-red-800 
    text-white font-semibold tracking-wide
    py-3 px-6 rounded-[12px] w-full
    shadow-lg hover:shadow-2xl
    transition-all duration-300 ease-in-out
    hover:from-red-600 hover:to-red-700
    active:scale-95
  `;

  const buttons = [
    { label: 'API Polling', path: '/polling' },
    { label: 'Web Socket', path: '/web-socket' },
    { label: 'Server Sent Events', path: '/server-sent' },
  ];

  return (
    <div className='h-screen w-screen flex bg-gray-100'>
      {/* Image Section */}
      <div className='w-3/4 h-full'>
        <img src={realTimeImg} alt='Real Time' className='h-full w-full object-cover' />
      </div>

      {/* Sidebar Section */}
      <div className='w-1/4 h-full flex flex-col items-center bg-[#FFF8E8]'>
        <h1 className='text-2xl font-bold text-black text-center mt-40 mb-12'>
          Real Time Communication Approaches
        </h1>

        <div className='flex flex-col gap-6 w-56 mt-6'>
          {buttons.map(({ label, path }, index) => (
            <button
              key={path}
              className={`${buttonClass} ${index === 1 ? 'my-8' : ''}`}
              onClick={async () => await navigate(path)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
