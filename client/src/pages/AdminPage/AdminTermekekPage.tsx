import { useState } from "react";
import { Form, Container, Table, Button } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";
import { useFetchData } from "../../components/useFetchData";

const AdminTermekekPage = ({ termekAdatok }) => {
  const [kategoriaId, setKategoriaId] = useState<number>(0);
  const [termekNev, setTermekNev] = useState<string>("");
  const [termekAr, setTermekAr] = useState<number>(0);
  const [keszlet, setKeszlet] = useState<number>(0);
  const [brand, setBrand] = useState<string>("Ismeretlen");
  const { getAuthHeader } = Autentikacio();
  const {
    data: termekek,
    loading,
    refresh,
  } = useFetchData("/termek", getAuthHeader());

  const handleAdd = async (dto, url) => {
    if (!termekNev.trim() || kategoriaId === 0) {
      alert("Kérlek töltsd ki a nevet és a kategória ID-t!");
      return;
    }

    const ujTermekDto = {
      KategoriaID: Number(kategoriaId),
      TermekNev: termekNev,
      TermekAr: Number(termekAr),
      Keszlet: Number(keszlet),
      Brand: brand || "Ismeretlen",
    };

    try {
      const response = await fetch("http://localhost:7777/termek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(ujTermekDto),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // Ha a message egy tömb, írjuk ki az első elemét (pl. "TermekAr must be a number")
        const specificError = Array.isArray(errorData.message)
          ? errorData.message[0]
          : errorData.message;
        console.error("A konkrét mező hiba:", specificError);
        throw new Error(specificError || `Hiba: ${response.status}`);
      }

      setTermekNev("");
      setTermekAr(0);
      setKeszlet(0);
      setKategoriaId(0);
      setBrand("");

      alert("Termék sikeresen hozzáadva!");
      refresh();
    } catch (error) {
      alert("Hiba", error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a terméket?")) return;

    try {
      const response = await fetch(`http://localhost:7777/termek/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });

      if (!response.ok) throw new Error("Sikertelen törlés.");

      alert("Termék törölve!");
      refresh();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading)
    return (
      <Container className="mt-4">
        <p>Betöltés...</p>
      </Container>
    );

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
          {termekek && termekek.length > 0 ? (
            termekek.map((t) => (
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
