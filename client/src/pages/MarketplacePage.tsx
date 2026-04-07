import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Autentikacio } from "../components/AuthContext";
import NavbarComponent from "../components/NavbarComponent";
import ProductComponent from "../components/ProductComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterSidebarComponent from "../components/FilterSidebarComponent";
import { useState } from "react";

const MarketplacePage = ({ productsData, categoriesData }) => {
  const { user, logout } = Autentikacio();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 100
  });
  const [filteredCategories, setFilteredCategories] = useState([])
  const CategoryById = (kategoriaId: number) => {
    let kategoriaNev = "";
    switch (kategoriaId) {
      case 1: kategoriaNev = "string"; break;
      case 4: kategoriaNev = "wind"; break;
      default: break;
    }

    return kategoriaNev;
  }

  const filteredProducts = productsData.filter((product) => {
    const matchesName = product?.TermekNev?.toLowerCase()?.includes(searchTerm.toLowerCase());
    const matchesPrice = Number(product?.TermekAr) >= priceRange.min && Number(product?.TermekAr) <= priceRange.max;
    const matchesCategory = filteredCategories.length === 0 || filteredCategories.includes(product?.KategoriaNev)
    return matchesName && matchesPrice && matchesCategory;
  })

  if (!user) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Kérlek jelentkezz be!</Alert>
      </Container>
    );
  }

  return (
    <>
      <NavbarComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Container fluid className="mt-4">
        <Row flex-nowrap="true">
          <Col xs={3} md={2} lg={2} className="border-end">
            <div className="sticky-top" style={{ top: "20px" }}>
              <FilterSidebarComponent filteredCategories={filteredCategories} setFilteredCategories={setFilteredCategories} categoriesData={categoriesData} priceRange={priceRange} setPriceRange={setPriceRange} />
            </div>
          </Col>
          <Col xs={8} md={9} lg={10}>
            <Row className="g-4">
              {filteredProducts.map((p) => (
                <Col key={p.TermekID} xs={12} sm={6} md={4} lg={3}>
                  <div
                    style={{
                      border: "1px solid #ddd",
                      padding: "15px",
                      borderRadius: "8px",
                      height: "100%",
                    }}
                  >
                    <ProductComponent product={p} />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MarketplacePage;
