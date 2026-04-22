import { Col, Container, Form, Row } from "react-bootstrap";
import "./FilterSidebar.css";
import { useEffect, useState } from "react";

const FilterSidebarComponent = ({
  filteredCategories,
  setFilteredCategories,
  categoriesData,
  priceRange,
  setPriceRange,
  productsBrands,
  filteredBrands,
  setFilteredBrands,
}) => {
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

  return (
    <>
      <Container className="filter-sidebar">
        <h2>Szűrés</h2>
        <hr />

        <Form.Group>
          <Form.Label>Termék Ár</Form.Label>
          <Row className="align-items-center g-2 mb-3">
            <Col>
              <Form.Control
                type="number"
                value={priceRange.min}
                onChange={handleMinChange}
              />
            </Col>
            <Col xs="auto">-</Col>
            <Col>
              <Form.Control
                type="number"
                value={priceRange.max}
                onChange={handleMaxChange}
              />
            </Col>
            <Col xs="auto">Ft</Col>
          </Row>
        </Form.Group>
        <hr />

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Kategória</Form.Label>
          <div className="filter-group-scroll">
            {categoriesData?.map((c) => (
              <Form.Check
                key={c.KategoriaID}
                type="checkbox"
                id={`cat-${c.KategoriaID}`}
                label={c.Nev}
                checked={filteredCategories.includes(c.KategoriaID)}
                onChange={() => handleCategoryChange(c.KategoriaID)}
                className="mb-1"
              />
            ))}
          </div>
        </Form.Group>
        <hr />

        <Form.Group>
          <Form.Label>Márka</Form.Label>
          {productsBrands?.map((brand) => (
            <Form.Check
              key={brand}
              type="checkbox"
              label={brand}
              checked={filteredBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
          ))}
        </Form.Group>
      </Container>
    </>
  );
};

export default FilterSidebarComponent;
