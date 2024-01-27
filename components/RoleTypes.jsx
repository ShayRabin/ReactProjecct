import { useContext } from "react";
import { GeneralContext } from "../App";

export const useGeneralContext = () => {
  const { user, setUser, setLoader, userRoleType, setUserRoleType } = useContext(GeneralContext);
  return { user, setUser, setLoader, userRoleType, setUserRoleType };
};
export const RoleTypes = {
  none: 0,
  user: 1,
  business: 2,
  admin: 3,
};

export const checkPermissions = (permissions, userRoleType) => {
  return permissions.includes(userRoleType);
};

export const pages = [
  { route: "/about", title: "About" },
  { route: "/login", title: "Login", permissions: [RoleTypes.none] },
  { route: "/SignUp", title: "SignUp", permissions: [RoleTypes.none] },
  {
    route: "/favorite",
    title: "Fav cards",
    permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin],
  },
  {
    route: "/my-cards",
    title: "My cards",
    permissions: [RoleTypes.business, RoleTypes.admin],
  },
  { route: "/admin", title: "User management", permissions: [RoleTypes.admin] },
];

export const useLogout = (setUser, setUserRoleType, setLoader, navigate, handleCloseUserMenu) => {
  const logout = () => {
    setLoader(true);

    fetch(`https://api.shipap.co.il/clients/logout`, {
      credentials: "include",
    }).then(() => {
      setUser();
      setUserRoleType(RoleTypes.none);
      setLoader(false);
      navigate("./login");
    });

    handleCloseUserMenu();
  };

  return logout;
};