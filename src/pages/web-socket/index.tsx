const WebSocket = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🛰️ WebSocket Page</h1>
      <p style={styles.description}>This page simulates web socket.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '3rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#eef2f3',
    borderRadius: '8px',
    marginLeft: '30rem',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#2c3e50',
  },
  description: {
    fontSize: '1.2rem',
    margin: '1rem 0 2rem',
    color: '#34495e',
  },
  statusBox: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: '6px',
    display: 'inline-block',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default WebSocket;
