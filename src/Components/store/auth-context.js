import  { createContext } from "react";

const AuthContext = createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
    signup: (token, name) => {},
    username:""
});

export default AuthContext;