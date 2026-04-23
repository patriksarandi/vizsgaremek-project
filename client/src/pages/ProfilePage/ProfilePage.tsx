import { Navbar, Container, Nav, Button, Col, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { Autentikacio } from "../../context/AuthContext";


const ProfilePage = () => {
  const { logout } = Autentikacio()

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-secondary sticky-top shadow-sm">
        <Container>
          <Navbar.Brand as={NavLink} to="/marketplace" className="fw-bold fs-3 text-primary">
            OnFret
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="profile-nav" />
          <Navbar.Collapse id="profile-nav">
            <Nav className="ms-auto mt-2 mt-lg-0">
              <Button variant="outline-light" size="sm" onClick={logout} className="rounded-pill px-4">
                <i className="bi bi-box-arrow-right me-2"></i>Kijelentkezés
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="flex-grow-1 p-0">
        <Row className="g-0 min-vh-100">
          <Col xs={12} lg={3} xl={2} className="bg-white border-end shadow-sm">
            <div className="p-3 sticky-lg-top" style={{ top: "80px" }}>
              <h5 className="d-none d-lg-block mb-4 fw-bold text-muted px-3 text-uppercase small">Fiókbeállítások</h5>
              
              <Nav variant="pills" className="flex-lg-column flex-row justify-content-start overflow-auto text-nowrap flex-nowrap custom-profile-nav">
                <Nav.Item className="mb-lg-2 me-2 me-lg-0">
                  <Nav.Link as={NavLink} to="profile" className="px-3 py-2">
                    <i className="bi bi-person-circle me-2"></i>Felhasználói fiók
                  </Nav.Link>
                </Nav.Item>
                
                <Nav.Item className="mb-lg-2 me-2 me-lg-0">
                  <Nav.Link as={NavLink} to="megrendelesek" className="px-3 py-2">
                    <i className="bi bi-bag-check me-2"></i>Megrendeléseim
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item className="d-lg-none">
                  <Nav.Link onClick={logout} className="text-danger px-3 py-2">
                    <i className="bi bi-box-arrow-right me-2"></i>Kilépés
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>

          <Col xs={12} lg={9} xl={10} className="p-3 p-md-5">
            <div className="bg-white p-4 rounded shadow-sm border mx-auto" style={{ maxWidth: "1000px" }}>
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
