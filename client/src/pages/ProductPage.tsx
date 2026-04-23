import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Autentikacio } from "../components/AuthContext";
import { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { useKosar } from "../components/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const { user, getAuthHeader } = Autentikacio();
  const { hozzaadasAKosarhoz } = useKosar();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:7777/termek/${id}`);
        if (!response.ok) throw new Error(`Nem található termék`);

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Container className="mt-5">Betöltés...</Container>;

  return (
    <>
      <NavbarComponent />
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
                onClick={() => {
                  hozzaadasAKosarhoz(product.TermekID, 1);
                }}
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
