import { Col, Container, Dropdown, Nav, Navbar, Row } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import { Autentikacio } from "../../context/AuthContext";

const AdminPage = () => {
  const { logout } = Autentikacio();

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="border-bottom border-secondary sticky-top shadow"
      >
        <Container fluid className="px-lg-4">
          <Navbar.Brand
            as={NavLink}
            to="/marketplace"
            className="fw-bold fs-3 text-primary"
          >
            OnFret{" "}
            <span className="text-danger fs-6 ms-2 text-uppercase opacity-75">
              Admin
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="admin-navbar-nav" />

          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="ms-auto align-items-lg-center mt-3 mt-lg-0">
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline-info"
                  size="sm"
                  className="rounded-pill px-3"
                >
                  <i className="bi bi-person-gear me-2"></i>Adminisztrátor
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow border-0 mt-2">
                  <Dropdown.Item href="/profile">Saját profil</Dropdown.Item>
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

      <Container fluid className="flex-grow-1 p-0">
        <Row className="g-0 min-vh-100">
          <Col xs={12} lg={3} xl={2} className="bg-white border-end shadow-sm">
            <div className="p-3 sticky-lg-top" style={{ top: "75px" }}>
              <div className="d-none d-lg-block mb-4 px-3">
                <small className="text-muted fw-bold text-uppercase">
                  Kezelőpult
                </small>
              </div>

              <Nav
                variant="pills"
                className="flex-lg-column flex-row overflow-auto flex-nowrap custom-admin-nav pb-2 pb-lg-0"
              >
                <Nav.Item className="mb-lg-2 me-2 me-lg-0">
                  <Nav.Link
                    as={NavLink}
                    to="termekek"
                    className="d-flex align-items-center px-3 py-2"
                  >
                    <i className="bi bi-box-seam me-2"></i> Termékek
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item className="mb-lg-2 me-2 me-lg-0">
                  <Nav.Link
                    as={NavLink}
                    to="kategoriak"
                    className="d-flex align-items-center px-3 py-2"
                  >
                    <i className="bi bi-tags me-2"></i> Kategóriák
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item className="mb-lg-2 me-2 me-lg-0">
                  <Nav.Link
                    as={NavLink}
                    to="felhasznalok"
                    className="d-flex align-items-center px-3 py-2"
                  >
                    <i className="bi bi-people me-2"></i> Felhasználók
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-lg-2 me-2 me-lg-0">
                  <Nav.Link
                    as={NavLink}
                    to="rendelesek"
                    className="d-flex align-items-center px-3 py-2"
                  >
                    <i className="bi bi-cart-check me-2"></i> Megrendelések
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>

          <Col xs={12} lg={9} xl={10} className="p-3 p-md-4">
            <div className="bg-white rounded shadow-sm border p-3 p-md-4 min-vh-100">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminPage;
