import { Navigate } from "react-router-dom";
const PrivateRoute = ({ isLoggedIn, children }) => {
  console.log(isLoggedIn, 'isLoggedIn----')
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default PrivateRoute;