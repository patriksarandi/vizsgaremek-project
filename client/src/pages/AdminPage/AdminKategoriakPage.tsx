import { useState } from "react";
import { Form, Container, Table, Button } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";
import { useFetchData } from "../../components/useFetchData";

const AdminKategoriakPage = () => {
  const [kategoriaNev, setKategoriaNev] = useState<string>("");
  const { getAuthHeader } = Autentikacio();
  const { data: categories, loading, refresh } = useFetchData("/kategoria", getAuthHeader())

  const handleAdd = async () => {
    if (!kategoriaNev.trim()) {
      alert("Kérlek, adj meg egy kategória nevet!");
      return;
    }

    try {
      const response = await fetch("http://localhost:7777/kategoria", {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ kategoriaNev: kategoriaNev }),
      });

      if (!response.ok) throw new Error("Nem sikerült a kategória hozzáadása.");

      alert("Sikeres hozzáadás!");
      setKategoriaNev("");
      refresh();
    } catch (error: any) {
      console.error("Hiba a küldés során:", error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a kategóriát?")) return;

    try {
      const response = await fetch(`http://localhost:7777/kategoria/${id}`, {
        method: "DELETE",
        headers: getAuthHeader()
      });
      
      if (response.ok) {
        alert("Kategória törölve!");
        refresh();
      }

    } catch (error) {
      alert("Hiba a törlés során.")
    }
  };

  if (loading) return <Container className="mt-4"><p>Betöltés...</p></Container>

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
          {categories && categories.length > 0 ? (
            categories.map((k) => (
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
