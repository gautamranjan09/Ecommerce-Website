import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState("");

  const logoutHaldler = () => {
    setToken("");
  };
  const loginHandler = (token) => {
    setToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: !!token,
        login: loginHandler,
        logout: logoutHaldler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
