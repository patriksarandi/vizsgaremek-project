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

const CartPage = () => {
  const { user, logout, getAuthHeader } = Autentikacio();

  const [kosarTetelek, setKosarTetelek] = useState([]);
  const [rendelesiOsszeg, setRendelesiOsszeg] = useState(0);

  const vevoId = user?.id || user?.VevoID;

  const getKosarTetelek = async () => {
    if (!vevoId) {
      console.log("Még nincs felhasználói azonosító, várakozás...");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:7777/rendeles/kosartetel/${vevoId}`,
        { headers: getAuthHeader() },
      );
      if (!response) throw new Error("Nem sikerült lekérni a kosártételeket!");
      const data = await response.json();

      if (data && data.Tetelek) {
        setKosarTetelek(data.Tetelek);
        setRendelesiOsszeg(data.Vegosszeg || 0);
      } else {
        setKosarTetelek([]);
        setRendelesiOsszeg(0);
      }
    } catch (error: any) {
      console.error("Hiba a kosár lekérdezésekor:", error.message);
    }
  };

  const updateTermekMennyiseg = async (termekId: number, valtozas: number) => {
    try {
      const response = await fetch(
        "http://localhost:7777/rendeles/kosartetel/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
          body: JSON.stringify({
            vevoId: Number(vevoId),
            termekId: Number(termekId),
            valtozas: Number(valtozas),
          }),
        },
      );

      if (response.ok) {
        getKosarTetelek();
      }
    } catch (error: any) {
      console.error("Hiba a módosítás során:", error);
    }
  };

  const handleRendeles = async (vevoId: number) => {
    if (!vevoId) return;

    try {
      const response = await fetch("http://localhost:7777/rendeles", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader },
        body: JSON.stringify({
          vevoId: Number(vevoId),
        }),
      });

      if (!response.ok) {
        throw new Error("Hiba történt a rendelés leadása során.");
      } else {
        const data = await response.json();
        console.log("Sikeres rendelés: ", data);
        setKosarTetelek([]);
        alert("Köszönjük! A rendelést rögzítettük.");
      }
    } catch (error) {
      throw new Error("Hiba történt", error.message);
    }
  };

  const handleKosarTetel = async (
    kosarId: number,
    termekId: number,
    tetelMennyiseg: number,
  ) => {
    try {
      const response = await fetch(
        "http://localhost:7777/rendeles/kosartetel",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kosarId: kosarId,
            termekId: termekId,
            tetelMennyiseg: tetelMennyiseg,
          }),
        },
      );
      if (!response.ok) {
        console.error("Hiba történt:", response.status);
        return;
      }

      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getKosarTetelek();
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
