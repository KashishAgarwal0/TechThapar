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
import userAtom from "./atoms/userAtom";

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

  // Determine icon and accessible label based on theme
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

      <PageLayout>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
          <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/auth" />} />
          <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/auth" />} />
        </Routes>
      </PageLayout>
    </ChakraProvider>
  );
}

export default App;
