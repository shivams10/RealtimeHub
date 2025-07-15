import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  return localStorage.getItem('authToken') ? <Navigate to='/' replace /> : <>{children}</>;
};

export default PublicRoute;
