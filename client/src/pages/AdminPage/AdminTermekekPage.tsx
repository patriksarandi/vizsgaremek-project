import { useState } from "react";
import { Form, Container, Table, Button } from "react-bootstrap";

interface TermekProps {
  kategoriaId: number;
  termekNev: string;
  termekAr: number;
  keszlet: number;
}

const AdminTermekekPage = ({ termekAdatok }) => {
  const [kategoriaId, setKategoriaId] = useState(0);
  const [termekNev, setTermekNev] = useState("");
  const [termekAr, setTermekAr] = useState(0);
  const [keszlet, setKeszlet] = useState(0);
  const termekAddUrl = "http://localhost:7777/termek";

  const handleAdd = async (dto: TermekProps | KategoriaProps, url) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });

      if (!response)
        throw new Error("Nem sikerült a termék hozzáadása.", response.status);

      const data = await response.json();
      console.log("Server:", data);
    } catch (error: any) {
      console.error("Hiba a küldés során:", error.message);
    }
  };

  const handleDelete = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response) throw new Error("Sikertelen törlés.");

      const data = await response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const ujTermek: TermekProps = {
    kategoriaId: Number(kategoriaId),
    termekNev: termekNev,
    termekAr: Number(termekAr),
    keszlet: Number(keszlet),
  };

  return (
    <Container>
      <Table>
        <tr>
          <td>
            <Form>
              <Form.Control
                type="number"
                placeholder="Kategória ID"
                value={kategoriaId}
                onChange={(e) => setKategoriaId(Number(e.target.value))}
              />
            </Form>
          </td>
          <td>
            <Form>
              <Form.Control
                type="text"
                placeholder="Termék név"
                value={termekNev}
                onChange={(e) => setTermekNev(e.target.value)}
              />
            </Form>
          </td>
          <td>
            <Form>
              <Form.Control
                type="number"
                placeholder="Termék ár"
                value={termekAr}
                onChange={(e) => setTermekAr(Number(e.target.value))}
              />
            </Form>
          </td>
          <td>
            <Form>
              <Form.Control
                type="number"
                placeholder="Készlet"
                value={keszlet}
                onChange={(e) => setKeszlet(Number(e.target.value))}
              />
            </Form>
          </td>
          <td>
            <Button
              onClick={() => {
                handleAdd(ujTermek, termekAddUrl);
              }}
            >
              Hozzáad
            </Button>
          </td>
        </tr>
      </Table>

      <Table>
        <thead>
          <th>Művelet</th>
          <th>Termék Név</th>
          <th>Termék Ár</th>
          <th>Készlet</th>
        </thead>
        <tbody>
          {termekAdatok.map((t) => (
            <tr key={t.TermekID}>
              <td>
                <Button
                  onClick={() => {
                    const termekId = t.TermekID;
                    const url = `http://localhost:7777/termek/${termekId}`;
                    handleDelete(url);
                  }}
                  variant="danger"
                >
                  Törlés
                </Button>
              </td>
              <td>{t.TermekNev}</td>
              <td>{t.TermekAr}</td>
              <td>{t.Keszlet}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminTermekekPage;
