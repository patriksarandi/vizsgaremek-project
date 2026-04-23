import { Container, Table, Button } from "react-bootstrap";
import { Autentikacio } from "../../context/AuthContext";
import { useFetchData } from "../../components/useFetchData";

const AdminFelhasznalokPage = () => {
  const { getAuthHeader } = Autentikacio();
  const { data: customers, loading, refresh } = useFetchData("/vevo", getAuthHeader())

  const handleDelete = async (id) => {
    if (!window.confirm("Biztosan törölni szeretnéd?")) return;

    const response = await fetch(`http://localhost:7777/vevo/${id}`, {
        method: "DELETE",
        headers: getAuthHeader()
      });

      if (response.ok) {
        alert("Sikeres törlés!");
        refresh();
      }

      if (loading) return <p>Betöltés...</p>
  };

 
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
          {customers && customers.length > 0 ? (
            customers.map((f) => (
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
