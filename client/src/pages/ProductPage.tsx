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
import { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";

const ProductPage = ({ productsData }) => {
    const { termekNev } = useParams()
  const { user, getAuthHeader, logout } = Autentikacio();
  const [mennyiseg, SetMennyiseg] = useState(1)
  const product = productsData.find((p) => p.TermekNev === termekNev);

  const handleKosarTetel = async () => {
    const vevoId = Number(user?.VevoID || user?.id);
    const termekId = Number(product?.TermekID);

    if (!vevoId || !termekId) {
        alert("Hiba: Hiányzó felhasználói vagy termék adatok!");
        return;
    }

    try {
      const response = await fetch(
        "http://localhost:7777/rendeles/kosartetel",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({
            KosarID: vevoId,
            TermekID: termekId,
            TetelMennyiseg: 1
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
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
      <NavbarComponent/>

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
                  A kép jelenleg nem elérhető
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
                onClick={handleKosarTetel}
              >
                <i className="bi bi-cart-plus me-2"></i> Kosárba
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
