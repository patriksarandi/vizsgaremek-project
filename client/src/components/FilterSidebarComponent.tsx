import { Col, Container, Form, Row } from "react-bootstrap";
import "./FilterSidebar.css";
import { useEffect, useState } from "react";

const FilterSidebarComponent = ({ filteredCategories, setFilteredCategories, categoriesData, priceRange, setPriceRange, productsBrands, filteredBrands, setFilteredBrands, }) => {
  const [minAr, setMinAr] = useState(Number(priceRange.min))
  const [maxAr, setMaxAr] = useState(Number(priceRange.max))

  useEffect(() => {
    if (priceRange.min !== undefined && minAr===0) setMinAr(Number(priceRange.min))
    if (priceRange.max !== undefined && maxAr===0) setMaxAr(Number(priceRange.max))
  }, [priceRange.min, priceRange.max])
  
  return (
    <>
      <div>
        <h2>Szűrés</h2>
        <Container>
          <hr />
          <Form>
            <Form.Label>Termék Ár</Form.Label>
            <Row className="align-items-center g-2">
              <Col>
                <Form.Control min="0" type="number" value={minAr} onChange={(e) => setMinAr(Number(e.target.value))}></Form.Control>
              </Col>
              <Col xs="auto">
                <Form.Label>-</Form.Label>
              </Col>
              <Col>
                <Form.Control max="1000000" type="number" value={maxAr} onChange={(e) => setMaxAr(Number(e.target.value))}></Form.Control>
              </Col>
              <Col xs="auto">
                <Form.Label>Ft</Form.Label>
              </Col>
            </Row>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="99999"
                value={priceRange.min}
                onChange={(e) => {
                  const val = Math.min(
                    Number(e.target.value),
                    priceRange.max - 1,
                  );
                  setPriceRange((prev) => ({ ...prev, min: val }));
                }}
                className="thumb thumb--left"
              />
              <input
                type="range"
                min="0"
                max="1000000"
                value={priceRange.max}
                onChange={(e) => {
                  const value = Math.max(
                    Number(e.target.value),
                    priceRange.min + 1,
                  );
                  setPriceRange((prev) => ({ ...prev, max: value }));
                }}
                className="thumb thumb--right"
              />
              <div className="slider">
                <div className="slider__track" />
                <div
                  className="slider__range"
                  style={{ left: "10", width: "100" }}
                />
              </div>
            </div>
          </Form>
          <hr />
          <Form>
            <Form.Label>Kategória</Form.Label>
            {categoriesData?.map(c => (
              <Form.Check 
              key={c.KategoriaID}
              label={c.Nev} 
              name="kategoria" 
              value={c.Nev}
              onChange={(e) => {
                const { value, checked } = e.target;
                setFilteredCategories(prev => checked ? [...prev, value] : prev.filter(cat => cat !== value))
              }}
              />
            ))}
          </Form>
        </Container>
        <Container>
          <hr />
          <Form>
            <Form.Label>Márka</Form.Label>
            {productsBrands?.map(brand => (
              <Form.Check
                key={brand}
                type="checkbox"
                label={brand}
                name="brand"
                value={brand}
                onChange={(e) => {
                  const {value, checked} = e.target;
                  setFilteredBrands(prev => checked ? [...prev, value] : prev.filter(brand => brand !== value))
                }}
                />
            ))}
          </Form>
        </Container>
      </div>
    </>
  );
};

export default FilterSidebarComponent;
