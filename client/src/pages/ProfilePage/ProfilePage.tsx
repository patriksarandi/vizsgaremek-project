import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { Autentikacio } from "../../components/AuthContext";


const ProfilePage = () => {
  const { logout } = Autentikacio()

  return (
    <>
      <Navbar expand="lg" bg="dark" className="border-bottom border-secondary">
        <Container fluid>
          <Navbar.Brand style={{ color: "white", fontWeight: "bold" }} href="/marketplace">
            OnFret
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button onClick={() => logout()}>Kijelentkezés</Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="d-flex">
        <div className="p-3" style={{ width: "210px" }}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item className="mb-2">
              <Nav.Link as={NavLink} to="profile">
                Felhasználói fiók
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link as={NavLink} to="megrendelesek">
                Megrendeléseim
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => logout()}>
                Kilépés
              </Nav.Link>
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

export default ProfilePage;
