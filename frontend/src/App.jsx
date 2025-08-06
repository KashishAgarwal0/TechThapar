import { useRecoilValue } from "recoil";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  ChakraProvider,
  ColorModeScript,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./components/Profile/UpdateProfilePage";
import ChatPage from "./pages/ChatPage";
import { SettingsPage } from "./pages/SettingsPage";
import LandingPage from "./pages/LandingPage";
import userAtom from "./atoms/userAtom";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import { sunsetTheme } from "./themes/sunsetTheme";
import { winterTheme } from "./themes/winterTheme";

function App() {
  const user = useRecoilValue(userAtom);
  const [themeName, setThemeName] = useState(() => localStorage.getItem("theme") || "sunset");

  const toggleTheme = () => {
    const newTheme = themeName === "sunset" ? "winter" : "sunset";
    setThemeName(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const currentTheme = themeName === "sunset" ? sunsetTheme : winterTheme;
  const ToggleIcon = themeName === "sunset" ? MoonIcon : SunIcon;
  const toggleLabel = themeName === "sunset" ? "Switch to Winter Theme" : "Switch to Sunset Theme";
  const iconColor = useColorModeValue("white", "gray.100");
  const bgColor = useColorModeValue("black", "gray.700");

  return (
    <ChakraProvider theme={currentTheme}>
      <ColorModeScript initialColorMode={currentTheme.config.initialColorMode} />

      {/* Theme Toggle Button */}
      <div style={{ padding: "1rem", textAlign: "right" }}>
        <IconButton
          onClick={toggleTheme}
          icon={<ToggleIcon />}
          aria-label={toggleLabel}
          variant="ghost"
          color={iconColor}
          bg={bgColor}
          _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
          size="md"
        />
      </div>

      <Routes>
        {/* Public Route - Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Public Route - Auth */}
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/home" />} />

        {/* Protected Routes wrapped with PageLayout */}
        <Route element={<PageLayout />}>
          <Route path="/home" element={user ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
          <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/auth" />} />
          <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/auth" />} />
           
           <Route path='/verify-otp' element={<VerifyOtpPage />} />
        </Routes>
      </PageLayout>
    </ChakraProvider>
  );
}

export default App;
