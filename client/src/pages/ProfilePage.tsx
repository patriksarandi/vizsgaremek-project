import { Navbar, Container, Nav, Button } from "react-bootstrap";


const ProfilePage = () => {
  return (
    <>
      <Navbar expand="lg" bg="dark" className="border-bottom border-secondary">
        <Container fluid>
          <Navbar.Brand style={{ color: "white", fontWeight: "bold" }} href="/">
            OnFret
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button onClick={() => console.log("Kijelentkezés")}>Kijelentkezés</Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="d-flex">
        <div className="p-3" style={{ width: "210px" }}>
          <Nav className="flex-column">
            <Nav.Item className="mb-2">
              <Nav.Link href="#">
                Felhasználói fiók
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link href="#">
                Megrendelések
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                Kilépés
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <main className="flex-grow-1 p-4 bg-light overflow-auto">
 
        </main>
      </div>
    </>
  );
};

export default ProfilePage;
