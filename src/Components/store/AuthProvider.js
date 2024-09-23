import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState("");
  let defaultUsername = "Guest";
  const [username, setUsername] = useState(defaultUsername);

  const logoutHaldler = () => {
    setToken("");
    setUsername(defaultUsername);
  };
  const signupHandler =async (token,name)=>{
    let URL= "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCmVNApFRGhZUEdeW5nAImteSXqdRKPi3U";
    const response = await fetch (URL, {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        displayName: name
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
  const loginHandler = (token, name) => {
    setToken(token);
    setUsername(name);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: !!token,
        login: loginHandler,
        logout: logoutHaldler,
        signup: signupHandler,
        username
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
