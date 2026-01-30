import { Navigate } from "react-router-dom";
import Lottie from "lottie-react";

import { useAuth } from "@/lib/auth-context";
import loadingAnimation from "@/assets/lotties/loading.json";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <Lottie
          loop
          animationData={loadingAnimation}
          style={{ width: 200, height: 200 }}
        />
        <p className="text-white/60 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading,user } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/auth/login" />;
  }

  return <>{children}</>;
};

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading,isAuthenticatedAndVerified } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticatedAndVerified ) {
    return <Navigate replace to="/" />;
  }

  return <>{children}</>;
};
