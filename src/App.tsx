import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import LoginPage from './pages/login';
import Polling from './pages/polling';
import ServerSent from './pages/server-sent';
import WebSocket from './pages/web-socket';
import PrivateRoute from './routes/private';
import PublicRoute from './routes/public';

function App() {
  return (
    <Router basename='/RealtimeHub'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/polling' element={<Polling />} />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path='/server-sent' element={<ServerSent />} />

        <Route
          path='/web-socket'
          element={
            <PrivateRoute>
              <WebSocket />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
