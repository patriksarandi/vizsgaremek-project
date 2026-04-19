import { Button, Col, Container, Dropdown, Nav, Navbar, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

const ProductPage = ({ productsData }) => {
  const { termekNev } = useParams();
  const termek = productsData.find((p) => p.TermekNev === termekNev);

  if (!termek) {
    return (
      <Container className="mt-5">Betöltés vagy nem található...</Container>
    );
  }

  return (
    <>
      <Navbar expand="lg" className="border-bottom border-secondary">
        <Container fluid>
          <Navbar.Brand
            href="/marketplace"
          >
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

      <Container>
        <Row>
            <Col>
                <img src="#"></img>
            </Col>
            <Col>
                <h3>{termek.TermekNev}</h3>
                <h4>{termek.TermekAr} Ft</h4>
                <h4>{termek.Keszlet ? (`Készleten > ${termek.Keszlet} db`) : ("Elfogyott")}</h4>
                <p>Brand: {termek.Brand}</p>
                <Button>Kosárba</Button>
            </Col>
        </Row>
      </Container>


    </>
  );
};

export default ProductPage;
