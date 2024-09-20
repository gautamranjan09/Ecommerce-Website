import React, { useState } from 'react';
import { Container, Form, Button, Tabs, Tab } from 'react-bootstrap';
import './AuthenticationForm.css'; // Import the CSS file for styling

const AuthenticationForm = () => {
  const [key, setKey] = useState('login');

  return (
    <Container className="AuthenticationForm-container"  fluid={true}>

      <h2 className="AuthenticationForm-title">Welcome to GR Trendz</h2>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 AuthenticationForm-tabs">
        <Tab eventKey="login" title="Login" className="AuthenticationForm-tab-content">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="AuthenticationForm-button">
              Log In
            </Button>
          </Form>
          <Button variant="link" className="AuthenticationForm-forgot-password">
            Forgot Password?
          </Button>
        </Tab>

        <Tab eventKey="signup" title="Sign Up" className="AuthenticationForm-tab-content">
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="AuthenticationForm-button">
              Sign Up
            </Button>
          </Form>
        </Tab>
      </Tabs>

      <Button variant="secondary" className="AuthenticationForm-continue-guest">
        Continue as Guest
      </Button>
    </Container>
  );
};

export default AuthenticationForm;
