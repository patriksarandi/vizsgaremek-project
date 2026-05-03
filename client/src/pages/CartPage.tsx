import { API_BASE_URL } from "../lib/api";
import { Button, Col, Container, Row } from "react-bootstrap";
import CartItem from "../components/CartItem";
import NavbarComponent from "../components/NavbarComponent";
import { Autentikacio } from "../context/AuthContext";
import { useKosar } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { user, logout, getAuthHeader } = Autentikacio();
  const navigate = useNavigate();
  const { kosarTetelek, osszeg, emptyKosar, updateTermekMennyiseg } =
    useKosar();

  const nincsKitoltveCim = (cim) => {
    return !cim || cim.trim() === "" || cim.trim() === "-";
  };

  const handleRendeles = async () => {
    if (!user) {
      alert("A rendeléshez be kell jelentkezned!");
      navigate("/login");
      return;
    }

    if (kosarTetelek.length === 0) {
      alert("A kosár üres.");
      return;
    }

    if (nincsKitoltveCim(user.Cim)) {
      alert("A rendeléshez előbb ki kell töltened a számlázási címedet!");
      navigate("/profile");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/rendeles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          vevoId: user.VevoID,
          RendelesiVegosszeg: osszeg,
          RendelesiDatum: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sikeres rendelés!");
        emptyKosar();
        navigate("/profile");
      } else {
        alert(`Szerver hiba: ${data.message}`);
      }
    } catch (error) {
      console.error("Hiba:", error);
      alert("Hiba történt a rendelés leadása közben.");
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
              <div className="alert alert-info shadow-sm">
                A kosár tartalma jelenleg üres.
              </div>
            )}
          </Col>

          <Col lg={4}>
            <div
              className="p-4 border rounded shadow-sm bg-light sticky-top"
              style={{ top: "20px" }}
            >
              <h4 className="mb-3">Összegzés</h4>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">Végösszeg:</span>
                <strong className="fs-4 text-primary">
                  {new Intl.NumberFormat("hu-HU").format(osszeg)} Ft
                </strong>
              </div>

              {nincsKitoltveCim(user?.Cim) && (
                <div className="alert alert-warning py-2">
                  A rendeléshez előbb ki kell töltened a számlázási címedet.
                </div>
              )}

              <Button
                variant="success"
                size="lg"
                className="w-100 fw-bold"
                disabled={kosarTetelek.length === 0}
                onClick={handleRendeles}
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