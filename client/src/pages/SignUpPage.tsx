import { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:7777/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log("Sign Up successful:", data);

      setUsername("");
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
        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            <p>{error}</p>
          </Alert>
        )}
        <h2 className="mb-4 text-center">Sign Up</h2>
        <Form onSubmit={handleSignUp}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="mb-2">Felhasználónév</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Felhasználónév"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
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
                Sign Up
              </Button>
              <Form.Label>
                Already have an account?
                <Link to="/signin">Sign In</Link>
              </Form.Label>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default SignUpPage;
