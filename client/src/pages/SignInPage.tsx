import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:7777/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login successful:", data);

      setEmail("");
      setPassword("");
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Jelszó"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Sign In
              </Button>
              <Form.Label>Forgot your password?</Form.Label>
              <Form.Label>Don't have an account? 
                <Link to="/signup">Sign Up</Link></Form.Label>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default SignInPage;
