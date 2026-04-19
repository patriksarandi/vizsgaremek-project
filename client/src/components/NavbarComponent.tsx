import {
  Button,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Autentikacio } from "./AuthContext";
import { useRef, useState } from "react";

const NavbarComponent = ({ searchTerm, setSearchTerm }) => {
  const { user, logout } = Autentikacio();
  const isAdmin = user?.Role === "ADMIN";

  return (
    <Navbar
      bg="white"
      expand="lg"
      className="border-bottom sticky-top shadow-sm py-2"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/marketplace"
          className="fw-bold fs-3 text-primary"
        >
          OnFret
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav
            className="mx-auto my-3 my-lg-0 w-100"
            style={{ maxWidth: "500px" }}
          >
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Keresés..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Nav>

          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={Link} to="/kosar" className="me-lg-3 py-2">
              <i className="bi bi-cart3 fs-5 d-none d-lg-inline"></i>
              <span className="d-lg-none">Kosár</span>
            </Nav.Link>

            <Dropdown align="end" className="mt-2 mt-lg-0">
              <Dropdown.Toggle
                variant="outline-primary"
                className="w-100 rounded-pill"
              >
                <i className="bi bi-person me-2"></i>
                {user?.VevoNev}
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow border-0 w-100">
                <Dropdown.Item as={Link} to="/profile">
                  Profil
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} className="text-danger">
                  Kijelentkezés
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
