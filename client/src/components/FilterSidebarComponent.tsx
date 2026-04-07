import { Container, Form } from "react-bootstrap";

const FilterSidebarComponent = () => {
  return (
    <>
      <div>
        <h2>Szűrés</h2>
        <Container>
          <hr />
          <Form>
            <Form.Label>Termék Ár</Form.Label>
            <Form.Range />
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
