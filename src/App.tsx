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
import DonatePage from "./pages/donate";
import FaqPage from "./pages/faq";
import ChallengeHub from "./pages/challenge-dashboard";
import AdminSubmissionsPage from "./pages/AdminSubmissionsPage";

/* ── MAG challenges: user side ── */
import MagChallengesPage from "./pages/mag-challenge"; // list of challenges
import ChallengePage from "./pages/challenge-page"; // one challenge (generic, public link)
import MagVotePage from "./pages/vote";
import MagLeaderboardPage from "./pages/magchallengeleaderboardpage";
import MagMySubmissionsPage from "./pages/mychallengesubmmisions";
import MagSubmissionPage from "./pages/singlesubmittedchallengepage";

/* ── clubs + profile ── */
import ClubPage from "./pages/club-page"; // public club link
import MyClubPage from "./pages/my-club"; // owner dashboard / member view
import ProfileViewPage from "./pages/userprofile"; // /profile/:userId
import ClubChallengeDashboardPage from "./pages/club-challenge-dashboard"; // owner: one challenge of my club
import ClubMemberPage from "./pages/club-member"; // owner: one member
import ClubLeaderboardPage from "./pages/club-leaderboard"; // public club leaderboard

/* ── MAG challenges: admin side ── */
import AdminDashboardPage from "./pages/adminUserAnalyticPage";
import AdminChallengesPage from "./pages/adminchallenges";
import AdminChallengeFormPage from "./pages/adminchallengeform";
import AdminChallengeDetailPage from "./pages/adminchallengedetail";
import AdminChallengeLeaderboardPage from "./pages/adminleaderboard";
import AdminUserSubmissionsPage from "./pages/adminusersubmissionpage";
import AdminClubsPage from "./pages/adminclubs";
import AdminClubFormPage from "./pages/adminclubform";
import AdminClubDetailPage from "./pages/adminclubdetail";

function App() {
  return (
    <>
      <Routes>
        {/* ───────── ADMIN (not protected yet) ───────── */}
        <Route element={<AdminDashboardPage />} path="admin" />
        <Route element={<AdminDashboardPage />} path="admin/dashboard" />

        <Route element={<AdminChallengesPage />} path="admin/mag-challenges" />
        {/* "new" must come before ":id" */}
        <Route element={<AdminChallengeFormPage />} path="admin/mag-challenges/new" />
        <Route element={<AdminChallengeDetailPage />} path="admin/mag-challenges/:id" />
        <Route element={<AdminChallengeFormPage />} path="admin/mag-challenges/:id/edit" />
        <Route element={<AdminChallengeLeaderboardPage />} path="admin/mag-challenges/:id/leaderboard" />

        <Route element={<AdminSubmissionsPage />} path="admin/mag-challenge/submissions" />
        <Route element={<AdminUserSubmissionsPage />} path="admin/mag-challenge/submissions/:userId" />
        <Route element={<AdminSubmissionsPage />} path="social-post-submissions" />

        {/* clubs (admin) — "new" must come before ":id" */}
        <Route element={<AdminClubsPage />} path="admin/clubs" />
        <Route element={<AdminClubFormPage />} path="admin/clubs/new" />
        <Route element={<AdminClubDetailPage />} path="admin/clubs/:id" />
        <Route element={<AdminClubFormPage />} path="admin/clubs/:id/edit" />

        {/* ───────── PUBLIC ───────── */}
        <Route element={<DonatePage />} path="donate" />
        <Route element={<FaqPage />} path="faq" />

        {/* the shareable links: viewing needs no login, voting / submitting does */}
        <Route element={<MagSubmissionPage />} path="mag-challenge/submission/:id" />
        <Route element={<ChallengePage />} path="mag-challenge/:slug" />

        {/* the shareable club link: anyone can open it, joining needs a login */}
        <Route element={<ClubPage />} path="club/:slug" />
        {/* the shareable club leaderboard of a challenge (public) */}
        <Route element={<ClubLeaderboardPage />} path="club/:slug/:challengeSlug/leaderboard" />

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

        {/* ───────── LOGGED-IN USER ───────── */}
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
          <Route element={<ChallengeHub />} path="mag-daily-challenge-hub" />
          <Route element={<ChallengeModelManager />} path="challenge" />
          <Route element={<GamesPage />} path="games" />
          <Route element={<PlayGame />} path="games/:id" />
          <Route element={<LeaderboardPage />} path="leaderboard" />
          <Route element={<ProfilePage />} path="profile" />
          <Route element={<ProfileViewPage />} path="profile/:userId" />
          <Route element={<MyClubPage />} path="my-club" />
          <Route element={<ClubChallengeDashboardPage />} path="my-club/challenges/:challengeId" />
          <Route element={<ClubMemberPage />} path="my-club/members/:userId" />

          {/* MAG challenges */}
          <Route element={<MagChallengesPage />} path="mag-challenge" />
          <Route element={<MagVotePage />} path="mag-challenge/:slug/vote" />
          <Route element={<MagLeaderboardPage />} path="mag-challenge/:slug/leaderboard" />
          <Route element={<MagMySubmissionsPage />} path="user/mag-challenge/my-submissions" />
        </Route>
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;