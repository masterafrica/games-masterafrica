import { Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import DashboardPage from "./pages/dashboard";
import ChallengesPage from "./pages/challenges";
import GamesPage from "./pages/games";
import LeaderboardPage from "./pages/leaderboard";
import PlayGame from "./pages/play";
import { ProtectedRoute, AuthRoute } from "./components/shared/protected-route";

function App() {
  return (
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
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
        path="/"
      >
        <Route index element={<DashboardPage />} />
        <Route element={<ChallengesPage />} path="challenges" />
        <Route element={<GamesPage />} path="games" />
        <Route element={<PlayGame />} path="games/:id" />
        <Route element={<LeaderboardPage />} path="leaderboard" />
      </Route>
    </Routes>
  );
}

export default App;
