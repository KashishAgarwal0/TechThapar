import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./components/Profile/UpdateProfilePage";
import ChatPage from "./pages/ChatPage";
import { SettingsPage } from "./pages/SettingsPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/chat" />} />

      {/* Protected Routes - Wrapped in PageLayout */}
      {user && (
        <Route element={<PageLayout />}>
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/update" element={<UpdateProfilePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      )}

      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
