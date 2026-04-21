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
  const { kosarTetelek, refreshKosar } = useKosar()
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  console.log("Kosár tételek:", kosarTetelek)


  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

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

  const CategoryById = (kategoriaId) => {
    const kategoriak = {
      1: "Gitár",
      2: "BasszusGitár",
      3: "Billentyűs",
      4: "Ütős",
      5: "Fúvós",
      6: "Vonós",
      7: "Stúdió",
      8: "Tartozékok",
    };
    return kategoriak[kategoriaId] || "";
  };

  const filteredProducts = products.filter((product) => {
    const matchesName = product?.TermekNev?.toLowerCase()?.includes(
      searchTerm.toLowerCase(),
    );
    const matchesPrice =
      Number(product?.TermekAr) >= priceRange.min &&
      Number(product?.TermekAr) <= priceRange.max;
    const currentProductCategoryName = CategoryById(product?.KategoriaID);
    const matchesCategory =
      filteredCategories.length === 0 ||
      filteredCategories.includes(currentProductCategoryName);

    const matchesBrands =
      filteredBrands.length === 0 || filteredBrands.includes(product?.Brand);

    return matchesName && matchesPrice && matchesCategory && matchesBrands;
  });

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
    <Container className="mt-5">
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
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
