import { createContext, useCallback, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

export const ThemeContext = createContext("default value");

const themeMUI = {
  light: createTheme({
    palette: {
      primary: {
        main: "#fffff",
      },
      secondary: {
        main: "#00000",
      },
    },
  }),
  dark: createTheme({
    palette: {
      primary: {
        main: "#17212b",
      },
      secondary: {
        main: "#00000",
      },
    },
  }),
};

const themes = {
  dark: {
    color: "#00000",
  },
  light: {
    color: "#fffff",
  },
};

export const CustomThemeProvider = ({ children, initialName = "dark" }) => {
  const [theme, setTheme] = useState({
    theme: themes[initialName],
    name: initialName,
  });

  const themeSetter = useCallback((name) => {
    if (!!themes[name]) {
      setTheme({
        name,
        theme: themes[name],
      });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeSetter, theme }}>
      <ThemeProvider theme={themeMUI[theme.name]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
