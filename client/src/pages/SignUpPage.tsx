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
                  ref={usernameRef}
                  required
                />
              </Form.Group>
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
