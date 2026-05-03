import { API_BASE_URL } from "../../lib/api";
import { useState } from "react";
import { Form, Container, Table, Button, Modal } from "react-bootstrap";
import { Autentikacio } from "../../context/AuthContext";
import { useFetchData } from "../../components/useFetchData";

const AdminTermekekPage = () => {
  const [kategoriaId, setKategoriaId] = useState<number>(0);
  const [termekNev, setTermekNev] = useState<string>("");
  const [termekAr, setTermekAr] = useState<number>(0);
  const [keszlet, setKeszlet] = useState<number>(0);
  const [brand, setBrand] = useState<string>("Ismeretlen");
  const [showModositas, setShowModositas] = useState(false);
  const [selectedTermek, setSelectedTermek] = useState<any>(null);
  const { getAuthHeader } = Autentikacio();
  const {
    data: termekek,
    loading,
    refresh,
  } = useFetchData("/termek", getAuthHeader());

  const handleEdit = (termek) => {
    setSelectedTermek(termek);
    setShowModositas(true);
  };

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
      const response = await fetch(`${API_BASE_URL}/termek`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(ujTermekDto),
      });

      if (!response.ok) {
        throw new Error(`Hiba: ${response.status}`);
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

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/termek/${selectedTermek.TermekID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
          body: JSON.stringify({
            KategoriaID: Number(selectedTermek.KategoriaID),
            TermekNev: selectedTermek.TermekNev,
            TermekAr: Number(selectedTermek.TermekAr),
            Keszlet: Number(selectedTermek.Keszlet),
            Brand: selectedTermek.Brand,
          }),
        },
      );

      if (!response.ok) throw new Error("Sikertelen frissítés.");
      alert("Termék sikeresen frissítve!");
      setShowModositas(false);
      refresh();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a terméket?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/termek/${id}`, {
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
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(t)}
                  >
                    Módosítás
                  </Button>

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
      <Modal show={showModositas} onHide={() => setShowModositas(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Termék módosítása</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedTermek && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Termék neve</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedTermek.TermekNev}
                  onChange={(e) =>
                    setSelectedTermek({
                      ...selectedTermek,
                      TermekNev: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Kategória ID</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedTermek.KategoriaID}
                  onChange={(e) =>
                    setSelectedTermek({
                      ...selectedTermek,
                      KategoriaID: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Márka</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedTermek.Brand || ""}
                  onChange={(e) =>
                    setSelectedTermek({
                      ...selectedTermek,
                      Brand: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ár</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedTermek.TermekAr}
                  onChange={(e) =>
                    setSelectedTermek({
                      ...selectedTermek,
                      TermekAr: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Készlet</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedTermek.Keszlet}
                  onChange={(e) =>
                    setSelectedTermek({
                      ...selectedTermek,
                      Keszlet: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModositas(false)}>
            Mégse
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Mentés
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminTermekekPage;
