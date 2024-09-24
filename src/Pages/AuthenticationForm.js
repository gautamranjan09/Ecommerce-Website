import React, { useContext, useRef, useState } from 'react';
import { Container, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import './AuthenticationForm.css'; // Import the CSS file for styling
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../Components/store/auth-context';

const AuthenticationForm = () => {
  //for toggle between tabs
  const [key, setKey] = useState('login');

  const [isLoading,  setIsLoading] = useState(false);
  const {login, signup, guestLogin}= useContext(AuthContext);
  const history = useHistory();
  
  //for login and signup data
  const loginFormRef = useRef(null);
  const signUpFormRef = useRef(null);
  const forgotPasswordFormRef = useRef(null);

  //for checking password and confirm password is same
  const [errorMessage,  setErrorMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    let URL;
    setIsLoading(true);
    const formRef = key === 'login' ? loginFormRef : signUpFormRef;

    console.log( formRef.current.email.value);
    
    const  formData = {
      "name": formRef.current.name?.value,
      "email":  formRef.current.email?.value,
      "password": formRef.current.password?.value,
      "confirmPassword": formRef.current.confirm_password?.value ,
    };
    console.log(formData);
    console.log(formData.name, formData.email);
    console.log(key);

    if(key === 'signup'){
      if(formData.password !==  formData.confirmPassword){
        console.log("error");
        setIsLoading(false);
        setErrorMessage('Passwords do not match');
        return;
      }
      URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmVNApFRGhZUEdeW5nAImteSXqdRKPi3U";
    }
    else{
      URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmVNApFRGhZUEdeW5nAImteSXqdRKPi3U";
    }
    
    try{
      const response = await fetch(URL, {
        method: 'POST',
        body:  JSON.stringify({
          "email": formData.email,
          "password": formData.password,
          "returnSecureToken": true
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("response",  response);
      setIsLoading(false);
      if(!response.ok){
        const  responseData = await response.json();
        throw new Error(responseData.error?.message || "Authentication failed!");
      }
      const responseData  = await response.json();
      console.log(responseData);

      if (key === 'signup') signup(responseData.idToken, formData.name);

      login(responseData.idToken, responseData.displayName, responseData.email);

      key === 'login' ? history.replace('/main/home'):setKey('login');

    } catch  (error) {
      alert(error.message);
    }

    formRef.current.reset()
    setErrorMessage("");
  }

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const email = forgotPasswordFormRef.current.email.value;

    try {
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCmVNApFRGhZUEdeW5nAImteSXqdRKPi3U", {
        method: 'POST',
        body: JSON.stringify({
          "requestType": "PASSWORD_RESET",
          "email": email,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setIsLoading(false);
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error?.message || "Password reset failed!");
      }
      alert("Password reset email sent. Please check your inbox.");
      setKey('login');
    } catch (error) {
      alert(error.message);
     // setErrorMessage(error.message);
    }

    forgotPasswordFormRef.current.reset();
  }

  return (
    <Container className="AuthenticationForm-container"  fluid={true}>
      <h2 className="AuthenticationForm-title">Welcome to GR Trendz</h2>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 AuthenticationForm-tabs ">
        <Tab eventKey="login" title="Login" className="AuthenticationForm-tab-content">
          <Form onSubmit={submitHandler} ref={loginFormRef}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email' placeholder="Enter your email" required/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name='password' placeholder="Password" required/>
            </Form.Group>

            <Button variant="primary" type="submit" className="AuthenticationForm-button fw-bolder" >
              {!isLoading && "Log In"}
              {isLoading && <><span className="spinner-border spinner-border-sm"></span> Loading...</>}
            </Button>
          </Form>
          <Button variant="link" className="AuthenticationForm-forgot-password" onClick={() => setKey('forgotPassword')}>
            Forgot Password?
          </Button>
        </Tab>

        <Tab eventKey="signup" title="Sign Up" className="AuthenticationForm-tab-content">
          { errorMessage && <Alert variant='danger'>{errorMessage}</Alert> }
          <Form onSubmit={submitHandler} ref={signUpFormRef}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name='name' placeholder="Enter your name" required/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email' placeholder="Enter your email" required/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name='password' placeholder="Password" required/>
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name='confirm_password' placeholder="Confirm password" required/>
            </Form.Group>

            <Button variant="primary" type="submit" className="AuthenticationForm-button fw-bolder">
              {!isLoading && "Sign Up"}
              {isLoading && <><span className="spinner-border spinner-border-sm"></span> Loading...</>}
            </Button>
            {isLoading && <p>Loading...</p>}
          </Form>
        </Tab>

        <Tab eventKey="forgotPassword" title="Forgot Password" className="AuthenticationForm-tab-content">
          <Form onSubmit={forgotPasswordHandler} ref={forgotPasswordFormRef}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email' placeholder="Enter your email" required/>
            </Form.Group>
            <Button variant="primary" type="submit" className="AuthenticationForm-button fw-bolder mt-3">
              {!isLoading && "Reset Password"}
              {isLoading && <><span className="spinner-border spinner-border-sm"></span> Loading...</>}
            </Button>
          </Form>
          <Button variant="link" className="AuthenticationForm-back-to-login mt-3" onClick={() => setKey('login')}>
            Back to Login
          </Button>
        </Tab>
      </Tabs>

      <Button variant="secondary" className="AuthenticationForm-continue-guest" onClick={guestLogin}>
        Continue as Guest
      </Button>
    </Container>
  );
};

export default AuthenticationForm;