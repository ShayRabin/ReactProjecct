import { useState, createContext, useEffect } from "react";
import "./App.css";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Snackbar from "./components/Snackbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FavoriteLabel from "./components/FavoriteLabel";
import CssBaseline from "@mui/material/CssBaseline";
import { RoleTypes } from "./components/RoleTypes";

export const GeneralContext = createContext();

function App() {
  const [themeLight, setThemeType] = useState(true);
  const [user, setUser] = useState(true);
  const [loader, setLoader] = useState(true);
  const [snackbarText, setSnackbarText] = useState("");

  const snackbar = (text) => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(""), 3 * 1000);
  };
  const [userRoleType, setUserRoleType] = useState(RoleTypes.none);

  function handleThemeChange() {
    setThemeType(!themeLight);
  }

  const theme = createTheme({
    palette: {
      mode: themeLight ? "light" : "dark",
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  useEffect(() => {
    fetch(`https://.shipap.co.il/clients/login`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response:", data);
        setUser(data);
        setUserRoleType(RoleTypes.user);

        if (data.business) {
          setUserRoleType(RoleTypes.business);
        } else if (data.admin) {
          setUserRoleType(RoleTypes.admin);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setUserRoleType(RoleTypes.none);
      })
      .finally(() => setLoader(false));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GeneralContext.Provider
        value={{
          user,
          setUser,
          snackbar,
          setLoader,
          userRoleType,
          setUserRoleType,
        }}
      >
        <Navbar onThemeChange={handleThemeChange} theme={theme} />
      <Router theme={theme} /> 
        {loader && <Loader />} 
      {snackbarText && <Snackbar text={snackbarText} />} 
        <FavoriteLabel />
      </GeneralContext.Provider>
    </ThemeProvider>
  );
}

export default App;
