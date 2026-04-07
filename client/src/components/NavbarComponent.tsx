import {
  Button,
  Container,
  Dropdown,
  Form,
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
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">OnFret</Navbar.Brand>
        <Nav className="me-auto">
          <Form>
            <Form.Control
              type="search"
              placeholder="Keresés"
              className="me-2 w-300"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </Form>
        </Nav>
        <Nav className="me-auto">
          <Dropdown>
            <Dropdown.Toggle variant="success">Button</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="profile">{user.VevoNev}</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button onClick={logout}>Kijelentkezés</Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        {isAdmin && (
          <Nav.Link
            as={Link}
            to="/admin/dashboard"
            className="ms-2 fw-bold text-danger"
          >
            Admin
          </Nav.Link>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
