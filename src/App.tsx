
// import { Route, Routes } from "react-router-dom";

// import AuthLayout from "./layouts/auth-layout";
// import MainLayout from "./layouts/main-layout";
// import LoginPage from "./pages/auth/login";
// import SignupPage from "./pages/auth/signup";
// import ForgotPasswordPage from "./pages/auth/forgot-password";
// import ResetPasswordPage from "./pages/auth/reset-password";
// import DashboardPage from "./pages/dashboard";
// import ChallengesPage from "./pages/challenges";
// import GamesPage from "./pages/games";
// import LeaderboardPage from "./pages/leaderboard";
// import PlayGame from "./pages/play";
// import ProfilePage from "./pages/profile";
// import { ProtectedRoute, AuthRoute } from "./components/shared/protected-route";
// import ChallengeModelManager from "./components/dailychalanges/challangemodalmanager";
// import { Toaster } from "react-hot-toast";
// import ProfileSetup from "./pages/auth/ProfileSetup";
// import VerifyEmail from "./pages/auth/otp";
// // import AdminUserAnalyticPage from "./pages/adminUserAnalyticPage";
// import DonatePage from "./pages/donate";
// import MagChallengePage from "./pages/mag-challenge";
// import AdminSubmissionsPage from "./pages/AdminSubmissionsPage";
// import FaqPage from "./pages/faq";
// import PhotoChallengePage from "./pages/photo-challenge";

// // import AdminLeaderboardPage from "./pages/adminleaderboard";
// import AdminChallengeLeaderboardPage from "./pages/adminleaderboard";
// import AdminUserSubmissionsPage from "./pages/adminusersubmissionpage";
// import MagVotePage from "./pages/vote";
// import MagLeaderboardPage from "./pages/magchallengeleaderboardpage";
// import MagMySubmissionsPage from "./pages/mychallengesubmmisions";
// import ChallengeHub from "./pages/challenge-dashboard";
// import AdminDashboardPage from "./pages/adminUserAnalyticPage";
// import MagSubmissionPage from "./pages/singlesubmittedchallengepage";

// // import Otp from "./pages/auth/otp";

// function App() {
//   return (
//     <>
//       <Routes>
//         {/* <Route element={<AdminUserAnalyticPage />} path="admin-user-analytic-page" />
//         <Route element={<AdminLeaderboardPage />} path="admin-daily-challenge-leaderboard" />
//         <Route element={<AdminLeaderboardPage />} path="admin-daily-challenge-leaderboard" /> */}

//         <Route element={<AdminDashboardPage />} path="admin/dashboard" />

//         {/* <Route element={<AdminLeaderboardPage />} path="admin/mag-challenge/leaderboard" /> */}

//         <Route
//           element={<AdminChallengeLeaderboardPage />}
//           path="admin/mag-daily-challenge/leaderboard"
//         />

//         <Route
//           element={<AdminSubmissionsPage />}
//           path="admin/mag-challenge/submissions"
//         />

//         <Route
//           element={<AdminUserSubmissionsPage />}
//           path="admin/mag-challenge/submissions/:userId"
//         />

//         <Route
//           element={<AdminSubmissionsPage />}
//           path="social-post-submissions"
//         />

//         <Route element={<DonatePage />} path="donate" />

//         <Route element={<FaqPage />} path="faq" />

//         <Route element={<MagVotePage />} path="user/mag-challenge/vote" />
//         <Route
//           element={<MagLeaderboardPage />}
//           path="user/mag-challenge/leaderboard"
//         />
//         <Route
//           element={<MagMySubmissionsPage />}
//           path="user/mag-challenge/my-submissions"
//         />
//         <Route
//           element={<MagSubmissionPage />}
//           path="mag-challenge/submission/:id"
//         />

//         <Route
//           element={
//             <AuthRoute>
//               <AuthLayout />
//             </AuthRoute>
//           }
//           path="/auth"
//         >
//           <Route element={<LoginPage />} path="login" />
//           <Route element={<SignupPage />} path="signup" />
//           <Route element={<ForgotPasswordPage />} path="forgot-password" />
//           <Route element={<ResetPasswordPage />} path="reset-password" />
//           <Route element={<VerifyEmail />} path="verify-email" />
//           <Route element={<ProfileSetup />} path="profile-setup" />
//         </Route>

//         <Route
//           element={
//             <ProtectedRoute>
//               <MainLayout />
//             </ProtectedRoute>
//           }
//           path="/"
//         >
//           {/* <Route element={<VerifyEmail />} path="verify-email" /> */}

//           <Route index element={<DashboardPage />} />
//           <Route element={<ChallengesPage />} path="challenges" />
//           <Route element={<MagChallengePage />} path="mag-challenge" />

//           <Route
//             element={<PhotoChallengePage />}
//             path="photo-challenge"
//           />

//           <Route
//             element={<ChallengeHub />}
//             path="mag-daily-challenge-hub"
//           />

//           <Route element={<ChallengeModelManager />} path="challenge" />
//           <Route element={<GamesPage />} path="games" />
//           <Route element={<PlayGame />} path="games/:id" />
//           <Route element={<LeaderboardPage />} path="leaderboard" />
//           <Route element={<ProfilePage />} path="profile" />

//           {/* <Route element={<MagVotePage />} path="user/mag-challenge/vote" />
//           <Route element={<MagLeaderboardPage />} path="user/mag-challenge/leaderboard" /> */}

//           <Route
//             element={<MagMySubmissionsPage />}
//             path="user/mag-challenge/my-submissions"
//           />
//         </Route>
//       </Routes>

//       <Toaster position="top-right" reverseOrder={false} />
//     </>
//   );
// }

// export default App;







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

/* ── MAG challenges: admin side ── */
import AdminDashboardPage from "./pages/adminUserAnalyticPage";
import AdminChallengesPage from "./pages/adminchallenges";
import AdminChallengeFormPage from "./pages/adminchallengeform";
import AdminChallengeDetailPage from "./pages/adminchallengedetail";
import AdminChallengeLeaderboardPage from "./pages/adminleaderboard";
import AdminUserSubmissionsPage from "./pages/adminusersubmissionpage";

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

        {/* ───────── PUBLIC ───────── */}
        <Route element={<DonatePage />} path="donate" />
        <Route element={<FaqPage />} path="faq" />

        {/* the shareable links: viewing needs no login, voting / submitting does */}
        <Route element={<MagSubmissionPage />} path="mag-challenge/submission/:id" />
        <Route element={<ChallengePage />} path="mag-challenge/:slug" />

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