import { extendTheme } from "@chakra-ui/react";

export const winterTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  colors: {
    background: "#f1f5f9",
    primary: "#0ea5e9",
    secondary: "#94a3b8",
    accent: "#7dd3fc",
    text: "#0f172a",
  },
  styles: {
    global: {
      body: {
        bg: "#f1f5f9",
        color: "#0f172a",
      },
    },
  },
});
export default winterTheme;