import { Alert, Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { Autentikacio } from "../components/AuthContext";
import NavbarComponent from "../components/NavbarComponent";
import ProductComponent from "../components/ProductComponent";
import FilterSidebarComponent from "../components/FilterSidebarComponent";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useKosar } from "../components/CartContext";

const MarketplacePage = ({
  productsData,
  categoriesData,
  productsBrands,
  userRatings,
}) => {
  const { user, loading, getAuthHeader } = Autentikacio();
  const { kosarTetelek, refreshKosar } = useKosar();
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  //console.log("Kosár tételek:", kosarTetelek);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const params = new URLSearchParams();

        if (searchTerm) params.append("search", searchTerm);
        if (priceRange.min) params.append("minPrice", priceRange.min);
        if (priceRange.max) params.append("maxPrice", priceRange.max);

        if (filteredCategories.length > 0) {
          params.append("category", filteredCategories.join(","));
        }

        if (filteredBrands.length > 0) {
          params.append("brand", filteredBrands.join(","));
        }

        const response = await fetch(`http://localhost:7777/termek?${params}`, {
          headers: { ...getAuthHeader() },
        });

        const data = await response.json();
        setProducts(data.data || data);
      } catch (error) {
        console.error("Szűrési hiba:", error);
      }
    };

    if (user && !loading) {
      fetchFilteredProducts();
    }
  }, [searchTerm, priceRange, filteredCategories, filteredBrands, user, loading, getAuthHeader]);


  const productUpdate = async (termekId, ujErtekeles) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.TermekID === termekId
          ? { ...p, ideiglenesErtekeles: ujErtekeles }
          : p,
      ),
    );

    if (onRatingUpdate) {
      await onRatingUpdate();
    }
  };

  const filterProps = {
    filteredCategories,
    setFilteredCategories,
    categoriesData,
    priceRange,
    setPriceRange,
    productsBrands,
    filteredBrands,
    setFilteredBrands,
  };

  if (loading) {
    <Container className="mt-5 text-center">
      <p>Betöltés</p>
    </Container>;
  }

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

      <Container fluid className="mt-4 px-lg-5">
        <Row>
          <Col lg={3} xl={2} className="d-none d-lg-block border-end">
            <div className="sticky-top" style={{ top: "90px" }}>
              <FilterSidebarComponent {...filterProps} />
            </div>
          </Col>

          <Col xs={12} lg={9} xl={10}>
            <div className="d-lg-none mb-3">
              <Button
                variant="outline-dark"
                className="w-100 py-2 d-flex align-items-center justify-content-center shadow-sm"
                onClick={() => setShowMobileFilter(true)}
              >
                <i className="bi bi-sliders2 me-2"></i> Szűrés és válogatás
              </Button>
            </div>

            <Row className="g-3 g-md-4">
              {products && products.length > 0 ? (
                products.map((p) => (
                  <Col key={p.TermekID} xs={12} sm={6} md={4} xl={3}>
                    <ProductComponent
                      product={p}
                      termekErtekeles={userRatings[p.TermekID] || 0}
                      onErtekelesFrissites={productUpdate}
                    />
                  </Col>
                ))
              ) : (
                <Col className="text-center mt-5 text-muted">
                  Nincs a szűrésnek megfelelő termék.
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>

      <Offcanvas
        show={showMobileFilter}
        onHide={() => setShowMobileFilter(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-bold">Szűrés</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FilterSidebarComponent {...filterProps} />

          <Button
            variant="dark"
            className="w-100 mt-4 py-2 fw-bold d-lg-none"
            onClick={() => setShowMobileFilter(false)}
          >
            Kész
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MarketplacePage;
