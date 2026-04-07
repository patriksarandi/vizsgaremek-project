import { Container, Form } from "react-bootstrap";
import "./FilterSidebar.css";

const FilterSidebarComponent = ({ priceRange, setPriceRange }) => {
  return (
    <>
      <div>
        <h2>Szűrés</h2>
        <Container>
          <hr />
          <Form>
            <Form.Label>Termék Ár</Form.Label>
            <p>Min: {priceRange.min}</p>
            <p>Max: {priceRange.max}</p>
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
                max="100000"
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
            <Form.Check label="1" name="kategoria" />
            <Form.Check label="1" name="kategoria" />
            <Form.Check label="1" name="kategoria" />
            <Form.Check label="1" name="kategoria" />
            <Form.Check label="1" name="kategoria" />
          </Form>
        </Container>
        <Container>
          <hr />
          <Form>
            <Form.Label>Brand</Form.Label>
            <Form.Check label="1" name="kategoria" />
            <Form.Check label="1" name="kategoria" />
            <Form.Check label="1" name="kategoria" />
            <Form.Check label="1" name="kategoria" />
            <Form.Check label="1" name="kategoria" />
          </Form>
        </Container>
      </div>
    </>
  );
};

export default FilterSidebarComponent;
