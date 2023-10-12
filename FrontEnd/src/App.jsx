import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Audience from './components/Audience/Audience';
import Market from './components/Market/Market';
import Online from './components/Online/Online';
import Team from './components/Team/Team';
import HomePage from './pages/HomePage';
function App() {

  return (
      <div>
          <Router>
            <Routes>
                <Route path='/' exact element={<HomePage/>}/>
                <Route
                    path='/audience'
                    element={<Audience />}
                />
                <Route
                    path='/market'
                    element={<Market/>}
                />
                <Route
                    path='/online'
                    element={<Online/>}
                />
                <Route
                    path='/tean'
                    element={<Team/>}
                />
                <Route
                    path='/audience'
                    element={<Audience />}
                />
              </Routes>
          </Router>
      </div>
  );
}

export default App
