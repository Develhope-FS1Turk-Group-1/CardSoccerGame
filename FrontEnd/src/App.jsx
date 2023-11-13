import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Market from './components/Market/Market';
import Team from './components/Team/Team';
import Landing from './components/Landing/Landing';
import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';
import DashboardPage from './Pages/DashboardPage';
import Single from './components/Single/Formation';
import { UserProvider } from './Contexts/UserContext';
import SinglePage from './Pages/SinglePage';
import OnlinePage from './Pages/OnlinePage';
import PasswordReset from './components/PasswordReset/passwordReset';
import Card from './components/Card/Card';


function App() {
	return (
		<UserProvider>
			<div>
				<Router>
					<Routes>
						<Route
							path='/'
							exact
							element={<Landing />}
						/>
						<Route
							path='/dashboard'
							exact
							element={<DashboardPage />}
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
							path='/single'
							element={<SinglePage />}
						/>
						<Route
							path='/market'
							element={<Market />}
						/>
						<Route
							path='/online'
							element={<OnlinePage />}
						/>
						<Route
							path='/team'
							element={<Team />}
						/>
						<Route
							path='/formation'
							element={<Single />}
						/>
						<Route
							path='/passwordReset'
							element={<PasswordReset />}
						/>
						<Route
							path='/card'
							exact
							element={<Card />}
						/>
					</Routes>
				</Router>
			</div>
		</UserProvider>
	);
}

export default App;
