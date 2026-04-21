import {
  Button,
  Col,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import CartItem from "../components/CartItem";
import NavbarComponent from "../components/NavbarComponent";
import { useEffect, useState } from "react";
import { Autentikacio } from "../components/AuthContext";
import { useKosar } from "../components/CartContext";

const CartPage = () => {
  const { user, logout, getAuthHeader } = Autentikacio();
  const { kosarTetelek, emptyKosar, refreshKosar, updateTermekMennyiseg } =
    useKosar();
  const [rendelesiOsszeg, setRendelesiOsszeg] = useState(0);

  const vevoId = user?.id || user?.VevoID;

  const handleRendeles = async (vevoId: number) => {
    if (!vevoId) return;

    try {
      const response = await fetch("http://localhost:7777/rendeles", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({
          vevoId: Number(vevoId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Hiba történt a rendelés során.");
        return;
      }

      console.log("Sikeres rendelés: ", data);
      emptyKosar();
      alert("Köszönjük! A rendelést rögzítettük.");

    } catch (error) {
      console.error("Hiba történt", error);
      alert("Nem sikerült elérni a szervert!")
    }
  };

  useEffect(() => {
    refreshKosar();
  }, [user, vevoId]);

  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
        className="border-bottom border-secondary mb-4"
      >
        <Container fluid>
          <Navbar.Brand
            style={{ color: "white", fontWeight: "bold" }}
            href="/marketplace"
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
          {kosarTetelek.length > 0 ? (
            kosarTetelek.map((tetel) => (
              <CartItem
                key={tetel.KosarTetelID}
                tetel={tetel}
                updateTermekMennyiseg={updateTermekMennyiseg}
              />
            ))
          ) : (
            <p>A kosár tartalma üres</p>
          )}
        </Col>
        <Col>
          <Container>
            <Container>
              <Row>
                <Col>Összesen</Col>
                <Col>
                  <b>{rendelesiOsszeg} Ft</b>
                </Col>
              </Row>
              <Row>
                <Button
                  disabled={kosarTetelek.length == 0}
                  onClick={() => handleRendeles(user.VevoID)}
                >
                  Megrendelés
                </Button>
              </Row>
            </Container>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
