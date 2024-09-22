import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Carousel,
} from "react-bootstrap";
import {
  FaUsers,
  FaHandsHelping,
  FaRegSmileBeam,
  FaLeaf,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import "./About.css";

const About = () => {
  return (
    <Container fluid className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
        <img src="/hero-section-image.webp" alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1 className="hero-title">Welcome to GR Trendz</h1>
          <p className="hero-subtitle">
            Your one-stop destination for the trendiest products, where quality
            meets excellence.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <Container className="my-5 text-center mission-section">
        <h2 className="section-title">Our Mission</h2>
        <p>
          At GR Trendz, we strive to redefine the shopping experience by
          providing exceptional products and unparalleled service, ensuring
          every customer feels valued and satisfied. Our dedication to
          innovation and quality drives us to exceed expectations and foster
          lasting relationships. We believe that shopping should be a delightful
          journey, filled with inspiration and convenience. That's why we
          meticulously curate our selection to offer only the latest trends that
          reflect our customers' unique styles and preferences. Our commitment
          to sustainability also guides our practices, as we work to minimize
          our environmental impact and contribute positively to our community.
          Every team member at GR Trendz shares a passion for customer
          satisfaction, and we are dedicated to continuous improvement, always
          seeking feedback to enhance our offerings. Together, we aim to create
          a welcoming and engaging environment where customers can explore,
          discover, and connect with the products they love.
        </p>
      </Container>

      {/* Core Values with Icons */}
      <Container className="my-5 text-center core-values">
        <Row>
          <Col md={3}>
            <FaRegSmileBeam size={50} className="mb-3 core-icon" />
            <h5>Customer First</h5>
            <p>
              We prioritize our customers' needs to provide the best shopping
              experience.
            </p>
          </Col>
          <Col md={3}>
            <FaLeaf size={50} className="mb-3 core-icon" />
            <h5>Sustainability</h5>
            <p>
              Our eco-friendly practices ensure a positive impact on the
              environment.
            </p>
          </Col>
          <Col md={3}>
            <FaHandsHelping size={50} className="mb-3 core-icon" />
            <h5>Integrity</h5>
            <p>
              We believe in transparency and uphold the highest ethical
              standards.
            </p>
          </Col>
          <Col md={3}>
            <FaUsers size={50} className="mb-3 core-icon" />
            <h5>Community</h5>
            <p>
              We strive to build a strong connection with our customers and
              community.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Milestones Section with Progress Bars */}
      <Container className="my-5 text-center milestones-section">
        <h2 className="section-title">Our Achievements</h2>
        <Row className="milestones">
          <Col md={4}>
            <h5>Customer Satisfaction</h5>
            <ProgressBar variant="success" now={90} label="90%" />
          </Col>
          <Col md={4}>
            <h5>Orders Delivered</h5>
            <ProgressBar variant="info" now={80} label="80K+" />
          </Col>
          <Col md={4}>
            <h5>Products Sold</h5>
            <ProgressBar variant="warning" now={95} label="95%" />
          </Col>
        </Row>
      </Container>

      {/* Our Story Section */}
      <Container className="my-5 story-section">
        <h2 className="text-center section-title">Our Story</h2>
        <Row className="d-flex  justify-content-between">
          <Col md={9} className="story-text">
            <p>
              GR Trendz began as a passion project in 2018, with a vision to
              make the latest fashion trends accessible to all. Starting from
              humble beginnings, we quickly recognized the demand for stylish
              yet affordable products and set out to curate collections that
              resonate with diverse tastes. Our commitment to quality and
              craftsmanship became the foundation of our brand as we established
              partnerships with ethical suppliers. Over the years, our
              dedication to innovation has allowed us to expand our product
              range, keeping our customers excited and engaged. Today, GR Trendz
              is a well-respected brand serving thousands of customers
              worldwide. Our journey reflects our belief that fashion should
              empower individuals and promote self-expression. As we look to the
              future, we remain committed to quality, sustainability, and
              customer satisfaction, striving to make a positive impact on the
              lives of our customers.
            </p>
          </Col>
          <Col md={3}>
            <img
              src="/story.webp"
              alt="Our Story"
              className="img-fluid story-image"
            />
          </Col>
        </Row>
      </Container>

      {/* Meet the Team with Hover and Social Links */}
      <Container className="my-5 team-section">
        <h2 className="text-center section-title">Meet the Team</h2>
        <Row className="text-center">
          <Col md={4}>
            <Card className="team-card">
              <Card.Img variant="top" src="path_to_team_member_image" />
              <Card.Body>
                <Card.Title>Gautam Ranjan</Card.Title>
                <Card.Text>CEO & Founder</Card.Text>
                <div className="team-socials">
                  <FaFacebook className="social-icon" />
                  <FaTwitter className="social-icon" />
                  <FaLinkedin className="social-icon" />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="team-card">
              <Card.Img variant="top" src="/elon.jpg" />
              <Card.Body>
                <Card.Title>Elon Musk</Card.Title>
                <Card.Text>Chief Marketing Officer</Card.Text>
                <div className="team-socials">
                  <FaFacebook className="social-icon" />
                  <FaTwitter className="social-icon" />
                  <FaLinkedin className="social-icon" />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="team-card">
              <Card.Img variant="top" src="/jef.jpg" />
              <Card.Body>
                <Card.Title>Jeff Bezos</Card.Title>
                <Card.Text>Product Manager</Card.Text>
                <div className="team-socials">
                  <FaFacebook className="social-icon" />
                  <FaTwitter className="social-icon" />
                  <FaLinkedin className="social-icon" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Testimonials Carousel */}
      <Container className="my-5 testimonials-section">
        <h2 className="text-center section-title">What Our Customers Say</h2>
        <Carousel>
          <Carousel.Item>
            <p className="testimonial">
              "GR Trendz has completely transformed my shopping experience. The
              quality and customer service are top-notch!"
            </p>
            <p className="testimonial-author">- Sarah P.</p>
          </Carousel.Item>
          <Carousel.Item>
            <p className="testimonial">
              "I love the trendy products and fast delivery. Highly recommend GR
              Trendz!"
            </p>
            <p className="testimonial-author">- Michael D.</p>
          </Carousel.Item>
        </Carousel>
      </Container>
    </Container>
  );
};

export default About;
