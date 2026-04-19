import { Container, Table, Button } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";

const AdminFelhasznalokPage = ({ customersData }) => {
  const { getAuthHeader } = Autentikacio();

  const handleDelete = async (id: number) => {
    if (!window.confirm("Biztosan törölni szeretnéd?")) return;

    try {
      const url = `http://localhost:7777/vevo/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          ...getAuthHeader(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ismeretlen hiba történt.");
      }

      alert("Sikeres törlés!");
      window.location.reload();
    } catch (error: any) {
      alert("Hiba: " + error.message);
    }
  }; // <--- Itt zárul le a handleDelete függvény!

  // A return-nek a függvényen KÍVÜL kell lennie, hogy a komponens kirajzolódjon
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Regisztrált Felhasználók</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Művelet</th>
            <th>Név</th>
            <th>E-mail</th>
            <th>Cím</th>
            <th>Regisztráció ideje</th>
          </tr>
        </thead>
        <tbody>
          {customersData && customersData.length > 0 ? (
            customersData.map((f) => (
              <tr key={f.VevoID}>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(f.VevoID)}
                  >
                    Törlés
                  </Button>
                </td>
                <td>{f.VevoNev}</td>
                <td>{f.VevoEmail}</td>
                <td>{f.Cim || "Nincs megadva"}</td>
                <td>
                  {f.createdAt
                    ? new Date(f.createdAt).toLocaleDateString("hu-HU")
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                Nincsenek felhasználók.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminFelhasznalokPage;
