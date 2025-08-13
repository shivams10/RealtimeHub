import { useNavigate } from 'react-router-dom';

import realTimeImg from '../../assets/real-time.png';

const Home = () => {
  const navigate = useNavigate();

  const buttonClass = `
    bg-gradient-to-r from-white to-white 
    text-black font-semibold tracking-wide
    py-3 px-6 rounded-lg
    transition-all duration-300 ease-in-out
    hover:from-white-600 hover:to-white-700
    active:scale-95
    my-[20%]
  `;

  const buttons = [
    { label: 'API Polling', path: '/polling' },
    { label: 'Web Socket', path: '/web-socket' },
    { label: 'Server Sent Events', path: '/server-sent' },
  ];

  return (
    <div className='h-screen w-screen flex bg-[#FFF8E8]'>
      {/* Sidebar Section */}
      <div className='w-1/4 h-full flex flex-col items-center p-6 border-gray-200 bg-[#613824de]'>
        <div className='p-6 w-full flex flex-col items-center transition-shadow duration-300'>
          <h1 className='text-xl font-bold text-white-800 text-center mb-6'>
            Real Time Communication Approaches
          </h1>
          <div className='flex flex-col gap-6 w-full'>
            {buttons.map(({ label, path }) => (
              <button key={path} className={buttonClass} onClick={async () => await navigate(path)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Image Section */}
      <div className='w-3/4 h-full flex justify-center items-center'>
        <img src={realTimeImg} alt='Real Time' className='h-full w-full object-contain' />
      </div>
    </div>
  );
};

export default Home;
