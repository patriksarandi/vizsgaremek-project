import { API_BASE_URL } from "../../lib/api";
import { Table, Badge, Container, Spinner, Form } from "react-bootstrap";
import { Autentikacio } from "../../context/AuthContext";
import { useFetchData } from "../../components/useFetchData";

const AdminRendelesekPage = () => {
  const { getAuthHeader } = Autentikacio();
  const { data: rendelesek, loading, refresh } = useFetchData("/rendeles/admin", getAuthHeader());

  const handleStatusChange = async (id: number, ujStatusz: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rendeles/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ Statusz: ujStatusz }),
      });

      if (!response.ok) throw new Error("Sikertelen frissítés");
      refresh();
    } catch (error: any) {
      alert("Hiba: " + error.message);
    }
  };

  if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;

  return (
    <Container fluid>
      <h2 className="mb-4">Megrendelések kezelése</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Dátum</th>
            <th>Végösszeg</th>
            <th>Státusz</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(rendelesek) ? (
            rendelesek.map((r: any) => (
              <tr key={r.RendelesID}>
                <td>#{r.RendelesID}</td>
                <td>{new Date(r.Datum).toLocaleString("hu-HU")}</td>
                <td>{Number(r.RendelesiVegosszeg).toLocaleString("hu-HU")} Ft</td>
                <td>
                  <Badge bg={r.Statusz === "Teljesítve" ? "success" : "warning"} text={r.Statusz === "Teljesítve" ? "white" : "dark"}>
                    {r.Statusz}
                  </Badge>
                </td>
                <td>
                  <Form.Select 
                    size="sm" 
                    value={r.Statusz}
                    onChange={(e) => handleStatusChange(r.RendelesID, e.target.value)}
                  >
                    <option value="Függőben">Függőben</option>
                    <option value="Teljesítve">Teljesítve</option>
                    <option value="Törölve">Törölve</option>
                  </Form.Select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-danger py-4">
                Nem sikerült betölteni az adatokat. Ellenőrizd a backendet!
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminRendelesekPage;
