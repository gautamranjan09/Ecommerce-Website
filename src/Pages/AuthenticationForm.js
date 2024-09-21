import React, { useContext, useRef, useState } from 'react';
import { Container, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import './AuthenticationForm.css'; // Import the CSS file for styling
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../Components/store/auth-context';

const AuthenticationForm = () => {
  //for toggle between tabs
  const [key, setKey] = useState('login');

  const [isLoading,  setIsLoading] = useState(false);
  const {login}= useContext(AuthContext);
  const history = useHistory();
  
  //for login and signup data
  const loginFormRef = useRef(null);
  const  signUpFormRef = useRef(null);

  //for checking password and confirm password is same
  const [errorMessage,  setErrorMessage] = useState('');

  const submitHandler =async (event)=>{
    event.preventDefault();
    let URL;
    setIsLoading(true);
    const formRef = key === 'login' ? loginFormRef : signUpFormRef;

    console.log( formRef.current.email.value);
    
    const  fromData = {
      "name": formRef.current.name?.value,
      "email":  formRef.current.email?.value,
      "password": formRef.current.password?.value,
      "confirmPassword": formRef.current.confirm_password?.value ,
    };
    console.log(fromData);
    console.log(fromData.name, fromData.email);
    console.log(key);

    if(key === 'signup'){
      if(fromData.password !==  fromData.confirmPassword){
        console.log("error");
  
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
          "email": fromData.email,
          "password": fromData.password,
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
      login(responseData.idToken);
      history.replace('/home');

    } catch  (error) {
      alert(error.message);
    }

    formRef.current.reset()
    setErrorMessage("");
  }


  return (
    <Container className="AuthenticationForm-container"  fluid={true}>

      <h2 className="AuthenticationForm-title">Welcome to GR Trendz</h2>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 AuthenticationForm-tabs">
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
              {isLoading && <><span class="spinner-border spinner-border-sm"></span> Loading...</>}
            </Button>
          </Form>
          <Button variant="link" className="AuthenticationForm-forgot-password">
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
              {isLoading && <><span class="spinner-border spinner-border-sm"></span> Loading...</>}
            </Button>
            {isLoading && <p>Loading...</p>}
          </Form>
        </Tab>
      </Tabs>

      <Button variant="secondary" className="AuthenticationForm-continue-guest" onClick={()=> history.push("/home")}>
        Continue as Guest
      </Button>
    </Container>
  );
};

export default AuthenticationForm;