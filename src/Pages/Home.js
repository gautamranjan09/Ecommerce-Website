import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import './Home.css'; // Create a separate CSS file for styling

const Home = () => {
  const events = [
    { date: "JUL 16", location: "DETROIT, MI", venue: "DTE ENERGY MUSIC THEATRE" },
    { date: "JUL 19", location: "TORONTO, ON", venue: "BUDWEISER STAGE" },
    { date: "JUL 22", location: "BRISTOW, VA", venue: "JIGGY LUBE LIVE" },
    { date: "JUL 29", location: "PHOENIX, AZ", venue: "AK-CHIN PAVILION" },
    { date: "AUG 2", location: "LAS VEGAS, NV", venue: "T-MOBILE ARENA" },
    { date: "DEC 12", location: "CONCORD, CA", venue: "CONCORD PAVILION" },
  ];

  const featuredEvents = [
    { title: "Special Event 1", date: "AUG 15", location: "NEW YORK, NY" },
    { title: "Special Event 2", date: "AUG 20", location: "LOS ANGELES, CA" },
  ];

  // State for countdown
  const [countdown, setCountdown] = useState("");

  // Countdown logic
  useEffect(() => {
    const eventDate = new Date("2024-12-12T00:00:00"); // Set your event date here
    const interval = setInterval(() => {
      const now = new Date();
      const timeLeft = eventDate - now;

      if (timeLeft <= 0) {
        clearInterval(interval);
        setCountdown("Event has started!"); // Update as necessary
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Container fluid className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <Carousel>
          <Carousel.Item>
            <img src="/hero_section_home-page1.jpg" alt="First slide" className="d-block w-100" />
            <Carousel.Caption>
              <h3>Welcome to Our Events</h3>
              <p>Join us for unforgettable experiences!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="/hero_section_home-page2.jpg" alt="Second slide" className="d-block w-100" />
            <Carousel.Caption>
              <h3>Get Your Tickets Now!</h3>
              <p>Don't miss out on our upcoming events.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Featured Events Section */}
      <Container className="my-5">
        <h2 className="text-center">Featured Events</h2>
        {featuredEvents.map((event, index) => (
          <Row className="my-3" key={index}>
            <Col md={12} className="text-center">
              <h4>{event.title}</h4>
              <p>{event.date} - {event.location}</p>
              <Button variant="primary">Buy Tickets</Button>
            </Col>
          </Row>
        ))}
      </Container>

      {/* Countdown Timer Section */}
      <div className="countdown-section text-center my-5">
        <h2>Upcoming Event Countdown</h2>
        <h3>{events[5].date} - {events[5].location}</h3>
        <p>{countdown}</p>
      </div>

      {/* Upcoming Events Section */}
      <Container className="my-5">
        <h2 className="text-center">Upcoming Events</h2>
        {events.map((event, index) => (
          <Row className="event-row my-4" key={index}>
            <Col md={3} className="text-center date-column">
              <h4>{event.date}</h4>
            </Col>
            <Col md={6} className="text-center venue-column">
              <h5>{event.location}</h5>
              <p>{event.venue}</p>
            </Col>
            <Col md={3} className="text-center button-column">
              <Button variant="primary">Buy Tickets</Button>
            </Col>
          </Row>
        ))}
      </Container>

      {/* Testimonials Section */}
      <Container className="my-5">
        <h2 className="text-center">What Our Customers Say</h2>
        <Row className="my-3">
          <Col md={12} className="text-center">
            <p>"An amazing experience! Can't wait for the next event!" - Customer A</p>
            <p>"The best events in town! Highly recommend!" - Customer B</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
