import { extendTheme } from "@chakra-ui/react";

// themes/zenDark.js

export const sunsetTheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    background: "#0f172a", // slate-900
    primary: "#3b82f6", // blue-500
    secondary: "#38bdf8", // sky-400
    accent: "#22c55e", // green-500
    text: "#f1f5f9", // slate-100
    card: "#1e293b", // slate-800
  },
  styles: {
    global: {
      body: {
        bg: "#0f172a",
        color: "#f1f5f9",
      },
    },
  },
});
export default sunsetTheme;