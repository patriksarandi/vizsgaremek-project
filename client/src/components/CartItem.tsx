import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const CartItem = () => {
  return (
    <Card>
      <Row>
        <Col>
          <Form>
            <Form.Label>Termék neve</Form.Label>
            <Form.Text>Megrendelés: </Form.Text>
            <Form.Text>Szállítási cím: </Form.Text>
          </Form>
        </Col>
        <Col>
            <Button>+</Button>
            <Button>-</Button>
        </Col>
        <Col>*Mennyiség* db</Col>
      </Row>
    </Card>
  );
};

export default CartItem;
