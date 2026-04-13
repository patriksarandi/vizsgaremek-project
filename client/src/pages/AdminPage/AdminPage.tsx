import {
  Container,
  Dropdown,
  Nav,
  Navbar,
} from "react-bootstrap";
import React, { useState } from 'react';
import { Outlet, NavLink } from "react-router-dom";


const AdminPage = () => {
  const [selectedPage, setSelectedPage] = useState("");

  return (
    <>
      <Navbar expand="lg" bg="dark" className="border-bottom border-secondary">
        <Container fluid>
          <Navbar.Brand style={{ color: "white", fontWeight: "bold" }} href="/marketplace">
            OnFret
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle variant="success">Profile</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profil</Dropdown.Item>
                <Dropdown.Item onClick={() => console.log("Kijelentkezés")}>
                  Kijelentkezés
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      <div className="d-flex">
        <div className="p-3" style={{ width: "210px" }}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item className="mb-2">
              <Nav.Link 
              as={NavLink}
              to="termekek" 
              onClick={() => setSelectedPage("termekek")}>
                Termékek
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link 
              as={NavLink}
              to="kategoriak" 
              onClick={() => setSelectedPage("kategoriak")}
              >
                Kategóriák
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
              as={NavLink}
              to="felhasznalok" 
              onClick={() => setSelectedPage("felhasznalok")}>Felhasználók</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <main className="flex-grow-1 p-4 bg-light overflow-auto">
          <Outlet/>
        </main>
      </div>
    </>
  );
};

export default AdminPage;
