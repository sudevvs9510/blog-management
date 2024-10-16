/* eslint-disable react/prop-types */
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem('token')

  if (loading) {
    return <Loader />;
  }

  // Redirect to login if not authenticated
  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
