import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Autentikacio } from "../components/AuthContext";

const ProductPage = ({ productsData }) => {
  const { termekNev } = useParams();
  const { user, getAuthHeader, logout } = Autentikacio();

  const product = productsData.find((p) => p.TermekNev === termekNev);
  const kosarId = user?.VevoID || user?.id;

  const handleKosarTetel = async (kosarId, termekId, tetelMennyiseg) => {
    if (!kosarId) {
      alert("Kérjük, jelentkezz be a vásárláshoz!");
      return;
    }

    if (product.Keszlet < 1) {
      alert("Sajnos ez a termék elfogyott.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:7777/rendeles/kosartetel",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({
            KosarID: Number(kosarId),
            TermekID: Number(termekId),
            TetelMennyiseg: Number(tetelMennyiseg),
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        alert("Sikeresen a kosárhoz adva!");
      } else {
        console.error("Szerver hiba:", response.status);
      }
    } catch (error) {
      console.error("Hálózati hiba:", error.message);
    }
  };

  if (!product) {
    return (
      <Container className="mt-5">Betöltés vagy nem található...</Container>
    );
  }

  return (
    <>
      <Navbar expand="lg" className="border-bottom mb-4">
        <Container>
          <Navbar.Brand href="/marketplace" className="fw-bold">
            OnFret
          </Navbar.Brand>
          <Nav className="ms-auto"></Nav>
        </Container>
      </Navbar>

      <Container className="py-5">
        <Row className="gy-4">
          <Col lg={6}>
            <Card
              className="h-100 border-0 shadow-sm bg-light d-flex align-items-center justify-content-center"
              style={{ minHeight: "400px" }}
            >
              <div className="text-center">
                <div className="display-1 text-secondary opacity-25"></div>
                <p className="text-muted mt-3 italic">
                  Illusztráció nem elérhető
                </p>
              </div>
            </Card>
          </Col>

          <Col lg={6}>
            <div className="ps-lg-4">
              <h6 className="text-uppercase text-primary fw-bold mb-2">
                {product.Brand}
              </h6>
              <h1 className="display-5 fw-bold mb-3">{product.TermekNev}</h1>

              <div className="mb-4">
                <h2 className="text-dark fw-normal">
                  {new Intl.NumberFormat("hu-HU").format(product.TermekAr)} Ft
                </h2>
                {product.Keszlet > 0 ? (
                  <Badge
                    bg="success-subtle"
                    className="text-success border border-success"
                  >
                    Készleten: {product.Keszlet} db
                  </Badge>
                ) : (
                  <Badge
                    bg="danger-subtle"
                    className="text-danger border border-danger"
                  >
                    Jelenleg nem elérhető
                  </Badge>
                )}
              </div>

              <hr className="my-4" />

              <div className="bg-white p-3 border rounded mb-4">
                <h5>Termékjellemzők</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <strong>Kategória:</strong> Hangszer
                  </li>
                  <li>
                    <strong>Garancia:</strong> 24 hónap
                  </li>
                  <li>
                    <strong>Szállítás:</strong> 1-3 munkanap
                  </li>
                </ul>
              </div>

              <Button
                size="lg"
                className="w-100 py-3 fw-bold"
                variant="primary"
                disabled={product.Keszlet === 0}
                onClick={() => handleKosarTetel(kosarId, product.TermekID, 1)}
              >
                <i className="bi bi-cart-plus me-2"></i> Kosárba teszem
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
