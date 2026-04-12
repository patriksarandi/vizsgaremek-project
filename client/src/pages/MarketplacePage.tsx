import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Autentikacio } from "../components/AuthContext";
import NavbarComponent from "../components/NavbarComponent";
import ProductComponent from "../components/ProductComponent";
import FilterSidebarComponent from "../components/FilterSidebarComponent";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MarketplacePage = ({ productsData, categoriesData, productsBrands }) => {
  const { user, getAuthHeader } = Autentikacio();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000000,
  });
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);

  const handleKosarTetel = async (
    kosarId: number,
    termekId: number,
    tetelMennyiseg: number,
  ) => {
    try {
      const response = await fetch("http://localhost:7777/rendeles/kosartetel", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({
          kosarId: kosarId,
          termekId: termekId,
          tetelMennyiseg: tetelMennyiseg,
        }),
      });
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

  const CategoryById = (kategoriaId: number) => {
    let kategoriaNev = "";
    switch (kategoriaId) {
      case 1:
        kategoriaNev = "Gitár";
        break;
      case 2:
        kategoriaNev = "BasszusGitár";
        break;
      case 3:
        kategoriaNev = "Billentyűs";
        break;
      case 4:
        kategoriaNev = "Ütős";
        break;
      case 5:
        kategoriaNev = "Fúvós";
        break;
      case 6:
        kategoriaNev = "Vonós";
        break;
      case 7:
        kategoriaNev = "Stúdió";
        break;
      case 8:
        kategoriaNev = "Tartozékok";
        break;
      default:
        break;
    }

    return kategoriaNev;
  };

  const filteredProducts = productsData.filter((product) => {
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

  if (!user || !getAuthHeader) {
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
              <FilterSidebarComponent
                filteredCategories={filteredCategories}
                setFilteredCategories={setFilteredCategories}
                categoriesData={categoriesData}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                productsBrands={productsBrands}
                filteredBrands={filteredBrands}
                setFilteredBrands={setFilteredBrands}
              />
            </div>
          </Col>
          <Col xs={8} md={9} lg={10}>
            <Row className="g-4">
              {filteredProducts.map((p) => (
                <Col key={p.TermekID} xs={12} sm={6} md={4} lg={3}>
                  <ProductComponent
                    product={p}
                    handleKosarTetel={handleKosarTetel}
                  />
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
