import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Accordion } from "react-bootstrap";
import { Prompt, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './Contact.css'; // Ensure this CSS file handles all the new styles

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subscribe: false,
  });
  const [isEntering, setIsEntering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "", subscribe: false });
    setTimeout(() => {
      history.push("/main/thank-you");
    }, 3000); // Redirect after 3 seconds
  };

  return (
    <Container fluid className="contactpage-container">
      <Prompt when={isEntering} message="Are you sure you want to leave? All your entered data will be lost!" />

      <h2 className="contactpage-title text-center my-5">Get in touch!</h2>

      {isSubmitted && (
        <Alert variant="success" className="contactpage-alert text-center">
          Thank you for contacting us! We will get back to you shortly.
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} onFocus={() => setIsEntering(true)} className="contactpage-form">
            <Form.Group controlId="formName">
              <Form.Label className="contactpage-label">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="contactpage-form-control"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="contactpage-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="contactpage-form-control"
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="contactpage-label">Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="contactpage-form-control"
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label className="contactpage-label">Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="contactpage-form-control"
              />
            </Form.Group>

            <Form.Group controlId="formNewsletter">
              <Form.Check
                type="checkbox"
                label="Subscribe to our newsletter"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
                className="contactpage-checkbox"
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={() => setIsEntering(false)} className="contactpage-submit-button mt-2">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>

      {/* FAQ Section */}
      <Row className="my-5">
        <Col md={12}>
          <h4 className="contactpage-faq-title">Frequently Asked Questions</h4>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="contactpage-faq-header">How can I contact customer support?</Accordion.Header>
              <Accordion.Body className="contactpage-faq-body">
                You can contact us using the form above or by calling +1 (555) 123-4567.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="contactpage-faq-header">What is your return policy?</Accordion.Header>
              <Accordion.Body className="contactpage-faq-body">
                We offer a 30-day return policy for all products. For more details, visit our <a href="/returns">Returns Page</a>.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className="contactpage-faq-header">Do you offer international shipping?</Accordion.Header>
              <Accordion.Body className="contactpage-faq-body">
                Yes, we offer worldwide shipping. Additional charges may apply.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      {/* Contact Information Section */}
      <Row className="my-5 text-center">
        <Col md={12}>
          <h4 className="contactpage-contact-info-title">Contact Information</h4>
          <p className="contactpage-email">Email: gautamranjan96@gmail.com</p>
          <p className="contactpage-phone">Phone: +91 9074063364</p>
          <p className="contactpage-social-media">Follow us on social media:</p>
          <p className="contactpage-social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
