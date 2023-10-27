import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Audience from './components/Audience/Audience';
import Market from './components/Market/Market';
import Online from './components/Online/Online';
import Team from './components/Team/Team';
import HomePage from './components/Home/Home';
import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Single from './components/Single/Single';


function App() {
    return (
		<div>
			<Router>
				<Routes>
					<Route
						path='/'
						exact
						element={<HomePage />}
					/>
					<Route
						path='/dashboard'
						exact
						element={<Dashboard />}
					/>
					<Route
						path='/login'
						exact
						element={<LoginPage />}
					/>
					<Route
						path='/register'
						exact
						element={<RegisterPage />}
					/>
					<Route
						path='/audience'
						element={<Audience />}
					/>
					<Route
						path='/market'
						element={<Market />}
					/>
					<Route
						path='/online'
						element={<Online />}
					/>
					<Route
						path='/team'
						element={<Team />}
					/>
					<Route
						path='/single/:userID'
						element={<Single />}
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

export default App;
