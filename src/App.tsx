import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Polling from './pages/polling';
import ServerSent from './pages/server-sent';
import WebSocket from './pages/web-socket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/polling' element={<Polling />} />
        <Route path='/web-socket' element={<WebSocket />} />
        <Route path='/server-sent' element={<ServerSent />} />
      </Routes>
    </Router>
  );
}

export default App;
