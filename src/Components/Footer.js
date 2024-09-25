import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';  // Import icons.
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="py-4" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>
      <Container fluid className=" px-lg-5">
        <Row>
          <Col md={4} className=' mb-3 mb-md-0'>
            <h3>Customer Support</h3>
            <p>
              Need help? Reach out to our customer support:
              <br />
              Email: gautamranjan96@gmail.com
              <br />
              Phone: +91 9074063364
              <br />
              Available: Mon-Fri, 9am-6pm
            </p>
          </Col>

          <Col md={4} className=' mb-3'>
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex">
              <li className="me-3">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-light">
                  <FaFacebook size={24} className="footer-social-icon" /> {/* Facebook icon */}
                </a>
              </li>
              <li className="me-3">
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-light">
                  <FaTwitter size={24} className="footer-social-icon" /> {/* Twitter icon */}
                </a>
              </li>
              <li className="me-3">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-light">
                  <FaInstagram size={24} className="footer-social-icon" /> {/* Instagram icon */}
                </a>
              </li>
              <li className="me-3">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-light">
                  <FaLinkedin size={24} className="footer-social-icon" /> {/* LinkedIn icon */}
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-light">
                  <FaGithub size={24} className="footer-social-icon" /> {/* LinkedIn icon */}
                </a>
              </li>
            </ul>
          </Col>

          <Col sm={6} md={4} className=' mb-5 mb-md-0'>
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get the latest news and updates straight to your inbox!</p>
            <form className='footer-form'>
              <input type="email" placeholder="Enter your email id" className="form-control footer-form-control mb-2" required />
              <button type="submit" className="btn btn-outline-warning">Subscribe</button>
            </form>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <p className="mb-0">© {new Date().getFullYear()} E-Commerce Platform. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
