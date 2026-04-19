import { useRef, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Autentikacio } from "../components/AuthContext";

const SignInPage = () => {
  const { login } = Autentikacio();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    const signinData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await fetch("http://localhost:7777/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Hiba: ${response.status}`);
      }

      login(data.user, data.access_token);

      navigate("/marketplace");
      console.log("Login successful:", data);
    } catch (error: any) {
      setError(error.message);
      throw new Error(error.message);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={5} xl={4}>
          <Card className="shadow border-0 p-4">
            <Card.Body>
              <h2 className="mb-4 text-center fw-bold">Bejelentkezés</h2>

              {error && (
                <Alert variant="danger" className="py-2 small">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">E-mail cím</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="pelda@email.com"
                    ref={emailRef}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <div className="d-flex justify-content-between">
                    <Form.Label className="small fw-bold">Jelszó</Form.Label>
                  </div>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    ref={passwordRef}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 mb-3 fw-bold"
                >
                  Belépés
                </Button>

                <div className="text-center mt-3 small">
                  <span>Nincs még fiókja? </span>
                  <Link to="/signup" className="fw-bold text-decoration-none">
                    Regisztráció
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
