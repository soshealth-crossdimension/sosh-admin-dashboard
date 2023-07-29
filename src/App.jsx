import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardView from './components/dashboard/Dashboard';
import LoginView from './components/login/Login';
import SosAppBar from './components/appBar/appBar';
import BookingDashboardView from './components/bookings/BookingDashboard';
import CustomerDashboardView from './components/Customer';
import PrivateRoute from './routes/privateRoutes';
import { getItemFromStorage } from './utils/useLocalStorage';

function App() {
 
  const isUserLogin = getItemFromStorage('isUserLogin')
  console.log(isUserLogin, 'isUserLogin----app')

  return (
    <>
      <Router>
        <SosAppBar />
        <Routes>
          <Route exact path="/"
            element={<LoginView />} />

          <Route exact path="/dashboard"
            element={<PrivateRoute isLoggedIn={isUserLogin}>
              < DashboardView />
            </PrivateRoute>} />
          <Route exact path="/bookings"
            element={<PrivateRoute isLoggedIn={isUserLogin}>
              < BookingDashboardView />
            </PrivateRoute>} />
          <Route exact path="/customer"
            element={<PrivateRoute isLoggedIn={isUserLogin}>
              < CustomerDashboardView />
            </PrivateRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
