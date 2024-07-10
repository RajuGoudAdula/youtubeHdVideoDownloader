import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import Form from "./Components/Form";
import About from './Components/About';
import Service from './Components/Service';
import PrivacyPolicy from './Components/PrivacyPolicy';
import TermsConditions from './Components/TermsConditions';
import Contact from './Components/Contact';
import Logo from './Components/StepsImages/Logo.png';
import Footer from './Components/Footer';

const styles = {
  containerField: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  navbar: {
    fontFamily: "Google Sans, Roboto, Arial, sans-serif",
    borderBottom: "solid 1px #d3cece"
  },
  navItem: {
    marginRight: "10px",
    color: "rgb(60,64,67)",
    fontWeight: "550",
    lineHeight: "1.25rem",
    fontSize: ".875rem",
    letterSpacing: ".0178571429em",
  },
  contentField: {
    flex: 1,
  },
  Logo:{
    maxWidth: "100px",
    height: "auto",
    marginRight: "10px",
  },
}

function App() {
  return (
    <div style={styles.containerField}>
      <Navbar data-bs-theme="light" style={styles.navbar}>
        <Container>
          <Navbar.Brand as={Link} to="/">
           <img src={Logo} style={styles.Logo}></img>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={styles.navItem}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" style={styles.navItem}>About us</Nav.Link>
            <Nav.Link as={Link} to="/service" style={styles.navItem}>Service</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div style={styles.contentField}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Form />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
