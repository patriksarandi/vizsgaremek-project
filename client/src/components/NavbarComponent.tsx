import {
  Button,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Autentikacio } from "../context/AuthContext";
import { useState } from "react";
import { useKosar } from "../context/CartContext";
import CartItem from "./CartItem";

const NavbarComponent = ({ searchTerm = "", setSearchTerm = () => {}  }) => {
  const { user, logout } = Autentikacio();
  const { kosarTetelek, updateTermekMennyiseg } = useKosar();

  const isAdmin = user?.Role === "ADMIN";

  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm py-3 mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/marketplace" className="fw-bold fs-3 text-primary">
          OnFret
        </Navbar.Brand>


        <div className="d-flex d-lg-none ms-auto align-items-center">
          <Link to="/kosar" className="text-primary me-3">
            <i className="bi bi-cart3 fs-2"></i>
          </Link>
          <Button variant="outline-primary" onClick={handleShow} className="rounded-pill">
            <i className="bi bi-list fs-4"></i>
          </Button>
        </div>

-
        <Navbar.Collapse id="main-nav" className="d-none d-lg-flex">
          <Nav className="mx-auto w-100" style={{ maxWidth: "500px" }}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Keresés..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-pill"
              />
            </InputGroup>
          </Nav>

          <Nav className="ms-auto align-items-center">
            

            <Dropdown 
              as={Nav.Item} 
              className="me-lg-3"
              show={showCartDropdown}
              onMouseEnter={() => setShowCartDropdown(true)}
              onMouseLeave={() => setShowCartDropdown(false)}
            >
              <Dropdown.Toggle 
                as={Link} 
                to="/kosar" 
                className="d-flex align-items-center text-primary text-decoration-none nav-link"
              >
                <i className="bi bi-cart3 fs-4 me-2"></i>
                <span className="fw-medium">Kosár</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow border-0 p-3" style={{ minWidth: '250px' }}>
                <h6 className="fw-bold border-bottom pb-2">Kosár tartalma</h6>
                {kosarTetelek.length > 0 ? (
                  <>
                    <Dropdown.Item>
                      {kosarTetelek.map((p) => (
                        <CartItem key={p.TermekID} tetel={p} updateTermekMennyiseg={updateTermekMennyiseg}/>
                      ))}
                    </Dropdown.Item>
                    <div className="small text-muted mb-2">A kosaradban {kosarTetelek.length} termék van.</div>
                    <Button as={Link} to="/kosar" variant="primary" size="sm" className="w-100">
                      Tovább a kosárhoz
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-2 small">A kosarad jelenleg üres.</div>
                )}
              </Dropdown.Menu>
            </Dropdown>


            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-primary" className="rounded-pill px-4">
                <i className="bi bi-person me-2"></i>
                {user?.name ? user?.name : "Fiók"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow border-0">
                <Dropdown.Item as={Link} to="/profile">Profil</Dropdown.Item>
                {isAdmin && <Dropdown.Item as={Link} to="/admin/dashboard">Kezelőfelület</Dropdown.Item>}
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} className="text-danger">Kijelentkezés</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>


        <Offcanvas show={show} onHide={handleClose} placement="end" className="d-lg-none">
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title className="fw-bold text-primary">Menü</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column gap-3">
              <Form className="mb-3">
                <Form.Control
                  type="search"
                  placeholder="Keresés..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-pill"
                />
              </Form>
              <Nav.Link as={Link} to="/kosar" onClick={handleClose} className="fs-5 d-flex align-items-center text-dark">
                <i className="bi bi-cart3 me-3 text-primary"></i> Kosár
              </Nav.Link>
              <Nav.Link as={Link} to="/profile" onClick={handleClose} className="fs-5 d-flex align-items-center text-dark">
                <i className="bi bi-person me-3 text-primary"></i> Profil
              </Nav.Link>
              <hr />
              <Button variant="danger" onClick={() => { logout(); handleClose(); }} className="w-100 rounded-pill">
                Kijelentkezés
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
