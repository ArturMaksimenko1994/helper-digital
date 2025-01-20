import { useSelector } from "react-redux";
import { Navigate } from "react-router";

interface IProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: IProps) => {
  const token = useSelector((state: any) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
