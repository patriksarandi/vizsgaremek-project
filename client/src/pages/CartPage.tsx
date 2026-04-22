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
  const { kosarTetelek, osszeg, emptyKosar, updateTermekMennyiseg } = useKosar();
  const [rendelesiOsszeg, setRendelesiOsszeg] = useState(0);

  const vevoId = user?.id || user?.VevoID;

  const handleRendeles = async (vevoId: number) => {
    try {
      const response = await fetch("http://localhost:7777/rendeles", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({vevoId: Number(vevoId)}),
      });

      if (response.ok) {
        emptyKosar();
        alert("Köszönjük! A rendelést rögzítettük.");
      }
    } catch (error) {
      alert("Hálózati hiba")
    }
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <Row>
          <Col lg={8}>
            <h2 className="mb-4">Kosarad</h2>
            {kosarTetelek.length > 0 ? (
              kosarTetelek.map((tetel) => (
                <CartItem
                  key={tetel.KosarTetelID}
                  tetel={tetel}
                  updateTermekMennyiseg={updateTermekMennyiseg}
                />
              ))
            ) : (
              <div className="alert alert-info">A kosár tartalma üres.</div>
            )}
          </Col>
          <Col lg={4}>
            <div className="p-4 border rounded shadow-sm bg-light">
              <h4 className="mb-3">Összegzés</h4>
              <div className="d-flex justify-content-between mb-3">
                <span>Végösszeg:</span>
                <b className="fs-5">{osszeg.toLocaleString()} Ft</b>
              </div>
              <Button
                variant="primary"
                className="w-100"
                disabled={kosarTetelek.length === 0}
                onClick={() => handleRendeles(vevoId)}
              >
                Megrendelés elküldése
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartPage;
