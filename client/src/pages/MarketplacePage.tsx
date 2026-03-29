import { Alert, Button, Container } from "react-bootstrap";
import { Autentikacio } from "../components/AuthContext";

const MarketplacePage = () => {
  const { user, logout } = Autentikacio();

  if (!user) {
    return (
        <Container className="mt-5">
            <Alert variant="warning">
                Please Log IN!
            </Alert>
        </Container>
    )
  }

  return (
    <Container>
      <h1 className="mb-4">Welcome, {user.Vevonev}</h1>
      <p>Sikeresen bejelentkeztél mint: {JSON.stringify(user.VevoNev)}</p>
      <Button onClick={logout}></Button>
    </Container>
  );
};

export default MarketplacePage;
