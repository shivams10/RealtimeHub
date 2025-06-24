import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📊 Welcome to the Real Time Session</h1>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={async () => await navigate('/polling')}>
          Go to Polling Page
        </button>

        <button style={styles.button} onClick={async () => await navigate('/web-socket')}>
          Go to WebSocket Page
        </button>
        <button style={styles.button} onClick={async () => await navigate('/server-sent')}>
          Go to Server Sent Page
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '3rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    marginLeft: '20rem',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  button: {
    marginTop: '2rem',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Home;
