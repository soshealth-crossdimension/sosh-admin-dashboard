import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardView from './components/dashboard/Dashboard';
import LoginView from './components/login/Login';
import SosAppBar from './components/appBar/appBar';
import BookingDashboardView from './components/bookings/BookingDashboard';

function App() {
  return (
    <>
      <Router>
      <SosAppBar />
        <Routes>
          <Route exact path="/"
            element={<LoginView />} />

          <Route exact path="/dashboard"
            element={< DashboardView />} />
          <Route exact path="/bookings"
            element={< BookingDashboardView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
