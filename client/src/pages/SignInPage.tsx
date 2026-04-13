import { useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
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
    setError("")

    const signinData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await fetch("http://localhost:7777/auth/signin", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
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
    <Container fluid className="p-3 my-5 flex flex-column w-50">
      <Card className="p-5">
        <h2 className="mb-4 text-center">Sign In</h2>
        <Form onSubmit={handleLogin}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="mb-2">E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Jelszó"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Sign In
              </Button>
              <Form.Label>Forgot your password?</Form.Label>
              <Form.Label>
                Don't have an account?
                <Link to="/signup">Sign Up</Link>
              </Form.Label>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default SignInPage;
