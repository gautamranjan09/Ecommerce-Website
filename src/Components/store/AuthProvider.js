import React, { useEffect, useRef, useState } from "react";
import AuthContext from "./auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

let logoutTimer;

const retriveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedGuestLoggedIn = localStorage.getItem('guestLoggedIn');
  const storedUsername =  localStorage.getItem('username');
  const storedEmail = localStorage.getItem('email');
  const storedExpirationTime = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 36000) {
    localStorage.removeItem("token");
    localStorage.removeItem('guestLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('expirationTime');

    return null;
  }

  return {
    token: storedToken,
    guestLoggedIn: storedGuestLoggedIn,
    email: storedEmail,
    username: storedUsername,
    duration: remainingTime,
  };
};

const calculateRemainingTime = (expirationTime)=>{
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjExpirationTime - currentTime;

  return  remainingTime;
};

const AuthProvider = (props) => {
  const tokenData = retriveStoredToken();
  const [token, setToken] = useState(tokenData ? tokenData.token : "");
  const [username, setUsername] = useState(tokenData ? tokenData.username : "");
  const [email,  setEmail] = useState(tokenData ? tokenData.email : "");

  const guestLoggedIn = useRef(tokenData ? tokenData.guestLoggedIn: "");
  const history =  useHistory();
  
  
  const logoutHaldler = () => {
    setToken("");
    guestLoggedIn.current=false;  
    localStorage.removeItem('token');
    localStorage.removeItem("guestLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem('expirationTime');

    history.replace('/auth');
    
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    };
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
  const loginHandler = (token, name, email, expirationTime) => {
    setToken(token);
    setUsername(name);
    setEmail(email);
    guestLoggedIn.current=true;
    localStorage.setItem('token', token);
    localStorage.setItem("guestLoggedIn", (guestLoggedIn.current));
    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHaldler, remainingTime);
  };

  const guestLoginHandler=()=>{
    setUsername("Guest");
    guestLoggedIn.current=true;
    history.push("/main/home");
  }

  useEffect(()=>{
    if(tokenData){
      logoutTimer = setTimeout(logoutHaldler, tokenData.duration);
    }
  },[tokenData]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: !!token,
        guestLoggedIn:  guestLoggedIn.current,
        username,
        email,
        guestLogin: guestLoginHandler,
        login: loginHandler,
        logout: logoutHaldler,
        signup: signupHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
