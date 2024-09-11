import "./App.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import AppNavbar from "./Components/AppNavbar";
import Footer from "./Components/Footer";
import Store from "./Components/Store";

function App() {
  return (
    <>
      <AppNavbar />
      <Store/>
      <Footer />
    </>
  );
}

export default App;
