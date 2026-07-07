import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("access");

  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;