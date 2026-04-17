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

        <Form.Group>
          <Form.Label>Kategória</Form.Label>
          {categoriesData?.map((c) => (
            <Form.Check
              key={c.KategoriaID}
              label={c.Nev}
              
              checked={filteredCategories.includes(c.Nev)}
              onChange={(e) => {
                const { checked } = e.target;
                setFilteredCategories(
                  (prev) =>
                    checked
                      ? [...prev, c.Nev]
                      : prev.filter((item) => item !== c.Nev),
                );
              }}
            />
          ))}
        </Form.Group>
        <hr />

        <Form.Group>
          <Form.Label>Márka</Form.Label>
          {productsBrands?.map((brand) => (
            <Form.Check
              key={brand}
              type="checkbox"
              label={brand}
              onChange={(e) => {
                const { checked } = e.target;
                setFilteredBrands((prev) =>
                  checked ? [...prev, brand] : prev.filter((b) => b !== brand),
                );
              }}
            />
          ))}
        </Form.Group>
      </Container>
    </>
  );
};

export default FilterSidebarComponent;
