import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import AuthLayout from "./layouts/auth-layout";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route path="/auth" element={<AuthLayout />}>
        <Route element={<LoginPage />} path="login" />
        <Route element={<SignupPage />} path="signup" />
      </Route>
    </Routes>
  );
}

export default App;
