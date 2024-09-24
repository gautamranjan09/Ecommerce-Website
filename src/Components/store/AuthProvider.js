import React, { useRef, useState } from "react";
import AuthContext from "./auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const retriveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedGuestLoggedIn = localStorage.getItem('guestLoggedIn');
  const storedUsername =  localStorage.getItem('username');
  const  storedEmail = localStorage.getItem('email');

  return {
    token: storedToken,
    guestLoggedIn: storedGuestLoggedIn,
    email: storedEmail,
    username: storedUsername
  };
};

const AuthProvider = (props) => {
  const tokenData = retriveStoredToken();
  const [token, setToken] = useState(tokenData ? tokenData.token : "");
  const [username, setUsername] = useState(tokenData ? tokenData.username : "");
  const [email,  setEmail] = useState(tokenData ? tokenData.email : "");

  const guestLoggedIn = useRef(tokenData.guestLoggedIn);
  const history =  useHistory();
  console.log(tokenData);
  
  const logoutHaldler = () => {
    setToken("");
    guestLoggedIn.current=false;  
    localStorage.removeItem('token');
    localStorage.removeItem("guestLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    history.replace('/auth');
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
  const loginHandler = (token, name, email) => {
    setToken(token);
    setUsername(name);
    setEmail(email);
    guestLoggedIn.current=true;
    localStorage.setItem('token', token);
    localStorage.setItem("guestLoggedIn", (guestLoggedIn.current));
    localStorage.setItem("username", name);
    localStorage.setItem("email", email);

  };

  const guestLoginHandler=()=>{
    setUsername("Guest");
    guestLoggedIn.current=true;
    history.push("/main/home");
  }

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
