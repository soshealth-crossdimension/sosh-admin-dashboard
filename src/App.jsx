import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardView from './components/dashboard/Dashboard';
import LoginView from './components/login/Login';
import SosAppBar from './components/appBar/appBar';
import BookingDashboardView from './components/bookings/BookingDashboard';
import CustomerDashboardView from './components/customer';
import PrivateRoute from './routes/privateRoutes';
import ResetPassword from './components/resetPassword/resetScreen';
import OtpValidation from './components/resetPassword/otpScreen';

function App() {

  return (
    <>
      <Router>
        <SosAppBar />
        <Routes>
          <Route exact path="/"
            element={<LoginView />} />
          <Route exact path="/reset-password"
            element={< ResetPassword />}
          />
          <Route exact path="/otp-validation"
            element={< OtpValidation />}
          />
            <Route exact path="/dashboard"
            element={<PrivateRoute>
              < DashboardView />
            </PrivateRoute>} />
          <Route exact path="/bookings"
            element={<PrivateRoute>
              < BookingDashboardView />
            </PrivateRoute>} />
          <Route exact path="/customer"
            element={<PrivateRoute >
              < CustomerDashboardView />
            </PrivateRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
