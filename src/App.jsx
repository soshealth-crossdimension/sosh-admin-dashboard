import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardView from './components/dashboard/Dashboard';
import LoginView from './components/login/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/"
            element={<LoginView />} />

          <Route exact path="/dashboard"
            element={< DashboardView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
