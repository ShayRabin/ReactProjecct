import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Tooltip,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import "../styles/Navbar.css";
import {
  checkPermissions,
  pages,
  useGeneralContext,
  useLogout,
} from "./RoleTypes";
import { useAnchors } from "./useAnchors";
import { ThemeProvider } from "@mui/material/styles";

export default function Navbar({ onThemeChange, theme }) {
  const {
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
  } = useAnchors();

  const { user, setUser, setLoader, userRoleType, setUserRoleType } =
    useGeneralContext();

  const navigate = useNavigate();
  const path = useResolvedPath().pathname;
  const logout = useLogout(
    setUser,
    setUserRoleType,
    setLoader,
    navigate,
    handleCloseUserMenu
  );

  return (
    <>
      {
        <ThemeProvider theme={theme}>
          <AppBar id="myNavBar" position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <b id="myNavBarBtn" style={{ fontFamily: "initial" }}>
                    {" "}
                    Music App
                  </b>
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: "block", md: "none" } }}
                  >
                    {pages
                      .filter(
                        (p) =>
                          !p.permissions ||
                          checkPermissions(p.permissions, userRoleType)
                      )
                      .map((p) => (
                        <Link
                          key={p.route}
                          to={p.route}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                              {p.title}
                            </Typography>
                          </MenuItem>
                        </Link>
                      ))}
                  </Menu>
                </Box>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <b style={{ fontFamily: "initial" }}> Chananel</b>
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages
                    .filter(
                      (p) =>
                        !p.permissions ||
                        checkPermissions(p.permissions, userRoleType)
                    )
                    .map((p) => (
                      <Link
                        key={p.route}
                        to={p.route}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Button
                          container={undefined}
                          id="myNavBarBtn"
                          onClick={handleCloseNavMenu}
                          sx={{
                            my: 2,
                            color: "inherit",
                            textDecoration: "none",
                            display: "block",
                            backgroundColor: p.route === path ? "##7c7b7b" : "",
                            borderRadius: "30px",
                          }}
                        >
                          {p.title}
                        </Button>
                      </Link>
                    ))}
                </Box>
                {user ? (
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          id="avatarPageNav"
                          alt={user ? user.fullName || user.none : ""}
                          src={
                            user && user.admin
                              ? "https://ideogram.ai/api/images/direct/-v0aqxnQTpOG6STx2inSrg.jpg"
                              : (user && user.imgUrl) || ""
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <Link
                        to="/account"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">
                            {user.fullName}
                          </Typography>
                        </MenuItem>
                      </Link>
                      <MenuItem onClick={logout}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </Menu>
                    <IconButton
                      sx={{ ml: 3 }}
                      onClick={onThemeChange}
                      color="inherit"
                    >
                      {theme.palette.mode === "dark" ? (
                        <LightModeIcon />
                      ) : (
                        <DarkModeIcon />
                      )}
                    </IconButton>
                  </Box>
                ) : (
                  ""
                )}
              </Toolbar>
            </Container>
          </AppBar>
        </ThemeProvider>
      }
    </>
  );
}
