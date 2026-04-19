import { useState } from "react";
import { Form, Container, Table, Button } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";

const AdminTermekekPage = ({ termekAdatok }) => {
  const [kategoriaId, setKategoriaId] = useState<number>(0);
  const [termekNev, setTermekNev] = useState<string>("");
  const [termekAr, setTermekAr] = useState<number>(0);
  const [keszlet, setKeszlet] = useState<number>(0);
  const [brand, setBrand] = useState<string>("Ismeretlen");
  const { getAuthHeader } = Autentikacio();
  const termekAddUrl = "http://localhost:7777/termek";

  const handleAdd = async (dto, url) => {
    const ujTermekDto = {
      KategoriaID: Number(kategoriaId),
      TermekNev: termekNev,
      TermekAr: termekAr,
      Keszlet: Number(keszlet),
      Brand: brand,
    };

    try {
      const response = await fetch(termekAddUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(ujTermekDto),
      });

      if (!response)
        throw new Error("Nem sikerült a termék hozzáadása.", response.status);

      const data = await response.json();

      setTermekNev("");
      setTermekAr(0);
      setKeszlet(0);
      setKategoriaId(0);

      console.log("Server:", data);
    } catch (error: any) {
      alert("Hiba", error.message);
      console.error("Hiba a küldés során:", error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a terméket?")) return;

    try {
      const url = `http://localhost:7777/termek/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          ...getAuthHeader(),
        },
      });

      if (!response) throw new Error("Sikertelen törlés.");
      console.log("Termék törölve!");

      const data = await response.json();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Termékek kezelése</h2>

      <Table bordered hover className="shadow-sm mb-5">
        <thead className="table-dark">
          <tr>
            <th>Kategória ID</th>
            <th>Termék Név</th>
            <th>Márka (Brand)</th>
            <th>Ár (Ft)</th>
            <th>Készlet</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control
                type="number"
                value={kategoriaId}
                onChange={(e) => setKategoriaId(Number(e.target.value))}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                placeholder="Pl: Gitár"
                value={termekNev}
                onChange={(e) => setTermekNev(e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={termekAr}
                onChange={(e) => setTermekAr(Number(e.target.value))}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={keszlet}
                onChange={(e) => setKeszlet(Number(e.target.value))}
              />
            </td>
            <td>
              <Button variant="success" className="w-100" onClick={handleAdd}>
                Hozzáad
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <h3 className="mb-3">Aktuális készlet</h3>
      <Table striped bordered hover responsive>
        <thead className="table-secondary">
          <tr>
            <th>ID</th>
            <th>Termék Név</th>
            <th>Ár</th>
            <th>Készlet</th>
            <th className="text-center">Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {termekAdatok && termekAdatok.length > 0 ? (
            termekAdatok.map((t) => (
              <tr key={t.TermekID}>
                <td>{t.TermekID}</td>
                <td>{t.TermekNev}</td>
                <td>{t.TermekAr.toLocaleString()} Ft</td>
                <td>{t.Keszlet} db</td>
                <td className="text-center">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(t.TermekID)}
                  >
                    Törlés
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                Nincsenek megjeleníthető termékek.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminTermekekPage;
