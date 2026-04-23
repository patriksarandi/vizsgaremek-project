import { useState } from "react";
import { Form, Container, Table, Button } from "react-bootstrap";
import { Autentikacio } from "../../context/AuthContext";
import { useFetchData } from "../../components/useFetchData";

const AdminKategoriakPage = () => {
  const [kategoriaNev, setKategoriaNev] = useState<string>("");
  const [modositasId, setModositasId] = useState<string>(null);
  const [modositasNev, setModositasNev] = useState<string>("");
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

  const handleUpdate = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:7777/kategoria/${id}`, {
        method: "PUT",
        headers: { ...getAuthHeader(), "Content-Type": "application/json"},
        body: JSON.stringify({ kategoriaNev: modositasNev}),
      });

      if (response.ok) {
        setModositasId(null);
        refresh();
      }
    } catch (error) {
      alert("Hiba történt a módosítás során!");
    }
  }

  const handleEdit = (id: number, jelenlegiNev: string) => {
    setModositasId(id);
    setModositasNev(jelenlegiNev)
  }

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

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th style={{ width: "100px" }}>Művelet</th>
            <th>Kategória ID</th>
            <th>Kategória Név</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((k) => (
            <tr key={k.KategoriaID}>
              <td className="d-flex gap-1">
                {modositasId === k.KategoriaID ? (
                  <>
                    <Button variant="primary" size="sm" onClick={() => handleUpdate(k.KategoriaID)}>Mentés</Button>
                    <Button variant="secondary" size="sm" onClick={() => setModositasId(null)}>Mégse</Button>
                  </>
                ) : (
                  <>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(k.KategoriaID, k.Nev)}>Módosít</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(k.KategoriaID)}>Törlés</Button>
                  </>
                )}
              </td>
              <td>{k.KategoriaID}</td>
              <td>
                {modositasId === k.KategoriaID ? (
                  <Form.Control 
                    value={modositasNev} 
                    onChange={(e) => setModositasNev(e.target.value)} 
                  />
                ) : (
                  k.Nev
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminKategoriakPage;
