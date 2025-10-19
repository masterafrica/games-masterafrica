import { Route, Routes } from "react-router-dom";

// import IndexPage from "@/pages/index";
import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import DashboardPage from "./pages/dashboard";
import ChallengesPage from "./pages/challenges";
import GamesPage from "./pages/games";

function App() {
  return (
    <Routes>
      {/* <Route element={<IndexPage />} path="/" /> */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route element={<LoginPage />} path="login" />
        <Route element={<SignupPage />} path="signup" />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route element={<DashboardPage />} index/>
        <Route element={<ChallengesPage />} path="challenges" />
        <Route element={<GamesPage />} path="games" />
      </Route>
    </Routes>
  );
}

export default App;
