import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Autentikacio } from "../components/AuthContext";
import NavbarComponent from "../components/NavbarComponent";
import { useEffect, useState } from "react";
import ProductComponent from "../components/ProductComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas } from "react-bootstrap";

const MarketplacePage = () => {
  const { user, logout } = Autentikacio();
  const [productsData, setProductsData] = useState([]);
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  const handleClose = () => setShowCartSidebar(false);
  const handleShow = () => setShowCartSidebar(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:7777/termek");
      const data = await response.json();
      setProductsData(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  });

  if (!user) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Kérlek jelentkezz be!</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <NavbarComponent/>
      <Container>
        <Row className="g-4">
          {productsData.map((p) => (
            <Col key={p.termekId} xs={6} md={4} lg={3}>
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                <ProductComponent product={p} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default MarketplacePage;
