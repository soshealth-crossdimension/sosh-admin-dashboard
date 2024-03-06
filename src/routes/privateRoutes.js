import { Navigate } from "react-router-dom";
import { getItemFromStorage } from '../utils/useLocalStorage';

const PrivateRoute = ({ children }) => {
  const isUserLogin = getItemFromStorage('isUserLogin')

  if (!isUserLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default PrivateRoute;