import { useRef, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSignUp = async (event) => {
    event.preventDefault();

    const signupData = {
      name: usernameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      role: "USER",
    };

    try {
      const response = await fetch("http://localhost:7777/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      if (!response.ok) {
        const errorBody = await response.json();
        console.log("SERVER RESPONSE:", errorBody);
        throw new Error(errorBody.message || `Error: ${response.status}`);
      }

      const data = await response.json();
      navigate("/signin");
      console.log("Sign Up successful:", data);
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
              <h2 className="mb-4 text-center fw-bold">Regisztráció</h2>

              {error && (
                <Alert variant="danger" className="py-2 small" dismissible onClose={() => setError("")}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Felhasználónév</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Minta Janos"
                    ref={usernameRef}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">E-mail cím</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email@pelda.hu"
                    ref={emailRef}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold">Jelszó</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Minimum 6 karakter"
                    ref={passwordRef}
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100 py-2 mb-3 fw-bold">
                  Fiók létrehozása
                </Button>

                <div className="text-center mt-3 small">
                  <span>Már van fiókja? </span>
                  <Link to="/signin" className="fw-bold text-decoration-none">
                    Jelentkezzen be
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

export default SignUpPage;
