import { Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import ResetPasswordPage from "./pages/auth/reset-password";
import DashboardPage from "./pages/dashboard";
import ChallengesPage from "./pages/challenges";
import GamesPage from "./pages/games";
import LeaderboardPage from "./pages/leaderboard";
import PlayGame from "./pages/play";
import ProfilePage from "./pages/profile";
import { ProtectedRoute, AuthRoute } from "./components/shared/protected-route";
import ChallengeModelManager from "./components/dailychalanges/challangemodalmanager";
import { Toaster } from "react-hot-toast";
import ProfileSetup from "./pages/auth/ProfileSetup";
import VerifyEmail from "./pages/auth/otp";
// import Otp from "./pages/auth/otp";
function App() {
  return (
    <>
    <Routes>
      <Route
        element={
          <AuthRoute>
            <AuthLayout />
          </AuthRoute>
        }
        path="/auth"
      >
        <Route element={<LoginPage />} path="login" />
        <Route element={<SignupPage />} path="signup" />
     
        <Route element={<ForgotPasswordPage />} path="forgot-password" />
        <Route element={<ResetPasswordPage />} path="reset-password" />
      <Route element={<VerifyEmail />} path="verify-email" />
      <Route element={<ProfileSetup />} path="profile-setup" />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
        path="/"
      >
           {/* <Route element={<VerifyEmail />} path="verify-email" /> */}
        <Route index element={<DashboardPage />} />
        <Route element={<ChallengesPage />} path="challenges" />
        <Route element={<ChallengeModelManager />} path="challenge" />
        <Route element={<GamesPage />} path="games" />
        <Route element={<PlayGame />} path="games/:id" />
        <Route element={<LeaderboardPage />} path="leaderboard" />
        <Route element={<ProfilePage />} path="profile" />
      </Route>
    </Routes>
       <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
