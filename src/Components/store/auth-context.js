import { createContext } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  guestLoggedIn: false,
  username: "",
  guestLogin: () => {},
  login: (token) => {},
  logout: () => {},
  signup: (token, name) => {},
});

export default AuthContext;
