import { Button, Col, Container, Dropdown, Nav, Navbar, Row } from "react-bootstrap";
import CartItem from "../components/CartItem";
import NavbarComponent from "../components/NavbarComponent";

const CartPage = () => {
  return (
    <>
        <Navbar
          expand="lg"
          bg="dark"
          className="border-bottom border-secondary"
        >
          <Container fluid>
            <Navbar.Brand
              style={{ color: "white", fontWeight: "bold" }}
              href="/"
            >
              OnFret
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Button>Kijelentkezés</Button>
            </Nav>
          </Container>
        </Navbar>
        <Row>
          <Col>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
          </Col>
          <Col>
            <Container>
                <Container>
                    <Row>
                        <Col>Összesen</Col>
                        <Col>*Összeg*</Col>
                    </Row>
                    <Row>
                        <Button>Fizetés</Button>
                    </Row>
                </Container>
            </Container>
          </Col>
        </Row>
    </>
  );
};

export default CartPage;
