import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#2563EB" size={40} />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
