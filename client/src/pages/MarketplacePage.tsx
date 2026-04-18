import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Autentikacio } from "../components/AuthContext";
import NavbarComponent from "../components/NavbarComponent";
import ProductComponent from "../components/ProductComponent";
import FilterSidebarComponent from "../components/FilterSidebarComponent";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MarketplacePage = ({ productsData, categoriesData, productsBrands }) => {
  const { user, loading, getAuthHeader } = Autentikacio();
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000000,
  });
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);

  const productUpdate = (termekId, ujErtekeles) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.TermekID === termekId
          ? {
              ...p,
              Ertekelesek: [
                {
                  ErtekelesSzam: ujErtekeles,
                  VevoID: user.id || user.VevoID,
                },
              ],
            }
          : p,
      ),
    );
  };

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

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
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({
            KosarID: Number(kosarId),
            TermekID: Number(termekId),
            TetelMennyiseg: Number(tetelMennyiseg),
          }),
        },
      );
      if (!response.ok) {
        console.error("Hiba történt:", response.status);
        return;
      }

      const data = await response.json();
      console.log("Hozzáadott termék:", data);
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

  if (loading) return null;

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
              {filteredProducts.length > 0
                ? filteredProducts.map((p) => {
                    const sajatErtekeles = p.Ertekelesek?.find(
                      (e) =>
                        String(e.VevoID) === String(user.id || user.VevoID),
                    );

                    const jelenlegiErtekeles = sajatErtekeles
                      ? sajatErtekeles.ErtekelesSzam
                      : 0;

                    return (
                      <Col key={p.TermekID} xs={12} sm={6} md={4} lg={3}>
                        <ProductComponent
                          product={p}
                          handleKosarTetel={handleKosarTetel}
                          termekErtekeles={jelenlegiErtekeles || null}
                          onErtekelesFrissites={productUpdate}
                        />
                      </Col>
                    );
                  })
                : "Nem található a keresésnek megfelelő termék."}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MarketplacePage;
