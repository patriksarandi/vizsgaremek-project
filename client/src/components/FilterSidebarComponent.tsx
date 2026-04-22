import { Col, Container, Form, Row } from "react-bootstrap";
import "./FilterSidebar.css";
import { useProducts } from "./ProductContext";

const FilterSidebarComponent = ({
  filteredCategories,
  setFilteredCategories,
  priceRange,
  setPriceRange,
  filteredBrands,
  setFilteredBrands,
}) => {
  const { categories, brands, loading } = useProducts();

  const handleMinChange = (e) => {
    const ertek = Math.min(Number(e.target.value), priceRange.max - 1);
    setPriceRange((prev) => ({ ...prev, min: ertek }));
  };

  const handleMaxChange = (e) => {
    const ertek = Math.max(Number(e.target.value), priceRange.min + 1);
    setPriceRange((prev) => ({ ...prev, max: ertek }));
  };

  const handleCategoryChange = (id) => {
    setFilteredCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBrandChange = (brand) => {
    setFilteredBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  if (loading) return <div className="p-3 text-muted">Szűrők betöltése...</div>;

  return (
    <Container className="filter-sidebar p-3 bg-white rounded shadow-sm border">
      <h4 className="mb-3 fw-bold">Szűrés</h4>
      <hr />

      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small text-uppercase">Ár intervallum</Form.Label>
        <Row className="align-items-center g-2">
          <Col>
            <Form.Control
              type="number"
              size="sm"
              placeholder="Min"
              value={priceRange.min}
              onChange={handleMinChange}
            />
          </Col>
          <Col xs="auto" className="text-muted">-</Col>
          <Col>
            <Form.Control
              type="number"
              size="sm"
              placeholder="Max"
              value={priceRange.max}
              onChange={handleMaxChange}
            />
          </Col>
          <Col xs="auto" className="small text-muted">Ft</Col>
        </Row>
      </Form.Group>
      <hr />

      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small text-uppercase">Kategória</Form.Label>
        <div className="filter-group-scroll pe-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
          {categories?.map((c) => (
            <Form.Check
              key={c.KategoriaID}
              type="checkbox"
              id={`cat-${c.KategoriaID}`}
              label={c.Nev}
              checked={filteredCategories.includes(c.KategoriaID)}
              onChange={() => handleCategoryChange(c.KategoriaID)}
              className="mb-1 small"
            />
          ))}
        </div>
      </Form.Group>
      <hr />

      <Form.Group className="mb-2">
        <Form.Label className="fw-bold small text-uppercase">Márka</Form.Label>
        <div className="filter-group-scroll pe-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
          {brands?.map((brand) => (
            <Form.Check
              key={brand}
              type="checkbox"
              id={`brand-${brand}`}
              label={brand}
              checked={filteredBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
              className="mb-1 small"
            />
          ))}
        </div>
      </Form.Group>
    </Container>
  );
};

export default FilterSidebarComponent;
