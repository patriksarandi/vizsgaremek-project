import { useState } from "react";
import { Form, Container, Table, Button } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";

const AdminKategoriakPage = ({ categoriesData }) => {
  const [kategoriaNev, setKategoriaNev] = useState<string>("");
  const { getAuthHeader } = Autentikacio();
  const kategoriaAddUrl = "http://localhost:7777/kategoria";

  const handleAdd = async () => {
    if (!kategoriaNev.trim()) {
      alert("Kérlek, adj meg egy kategória nevet!");
    }

    try {
      const response = await fetch("http://localhost:7777/kategoria", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({ kategoriaNev: kategoriaNev }),
      });

      if (!response.ok) throw new Error("Nem sikerült a kategória hozzáadása.");

      const data = await response.json();
      console.log("Server:", data);
      console.log("Sikeresen hozzáadva!");
    } catch (error: any) {
      console.error("Hiba a küldés során:", error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a kategóriát?")) {
      return;
    }

    try {
      const response = await fetch(`${kategoriaAddUrl}/${id}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeader(),
        },
      });
      if (!response) {
        throw new Error("Sikertelen törlés.");
      }

      alert("Kategória törölve!");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Kategóriák kezelése</h2>

      {/* Hozzáadás szekció */}
      <div className="bg-light p-3 rounded shadow-sm mb-4">
        <Table borderless className="m-0">
          <tbody>
            <tr>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Új kategória neve (pl. Billentyűsök)"
                  value={kategoriaNev}
                  onChange={(e) => setKategoriaNev(e.target.value)}
                />
              </td>
              <td style={{ width: "150px" }}>
                <Button variant="success" className="w-100" onClick={handleAdd}>
                  Hozzáad
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Lista szekció */}
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th style={{ width: "100px" }}>Művelet</th>
            <th>Kategória ID</th>
            <th>Kategória Név</th>
          </tr>
        </thead>
        <tbody>
          {categoriesData && categoriesData.length > 0 ? (
            categoriesData.map((k) => (
              <tr key={k.KategoriaID}>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(k.KategoriaID)}
                  >
                    Törlés
                  </Button>
                </td>
                <td>{k.KategoriaID}</td>
                <td>{k.Nev}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center text-muted">
                Nincsenek kategóriák az adatbázisban.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminKategoriakPage;
