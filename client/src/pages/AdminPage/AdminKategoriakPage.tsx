import { useState } from "react";
import { Form, Container, Table, Button } from "react-bootstrap";

interface KategoriaProps {
    kategoriaNev: string;
}

const AdminKategoriakPage = ({ categoriesData }) => {
  const [kategoriaNev, setKategoriaNev] = useState<string>("");
  const [error, setError] = useState<string>("");
  const kategoriaAddUrl = "http://localhost:7777/kategoria";
  const ujKategoria = {
    kategoriaNev: kategoriaNev,
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:7777/kategoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({kategoriaNev}),
      });

      if (!response)
        throw new Error("Nem sikerült a termék hozzáadása.", response.status);

      const data = await response.json();
      console.log("Server:", data);


    } catch (error: any) {
      console.error("Hiba a küldés során:", error.message);
    }
  };

  const handleDelete = async (url) => {
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

  return (
    <Container>
      <Table>
        <tr>
          <td>
            <Form>
              <Form.Control
                type="text"
                placeholder="Kategória név"
                value={kategoriaNev}
                onChange={(e) => setKategoriaNev(e.target.value)}
              />
            </Form>
          </td>
          <td>
            <Button
              onClick={() => {
                handleAdd();
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
          <th>Kategória Név</th>
        </thead>
        <tbody>
          {categoriesData?.map((k) => (
            <tr key={k.KategoriaID}>
              <td>
                <Button
                  onClick={() => {
                    const kategoriaId = k.KategoriaID;
                    const url = `http://localhost:7777/kategoria/${kategoriaId}`;
                    handleDelete(url);
                  }}
                  variant="danger"
                >
                  Törlés
                </Button>
              </td>
              <td>{k.Nev}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminKategoriakPage;
