import { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

const AdminFelhasznalokPage = ({ customersData }) => {
  const [vevoNev, setVevoNev] = useState<string>("");
  const [vevoEmail, setVevoEmail] = useState<string>("");
  const [cim, setCim] = useState<string>("");

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

  return (
    <Container>
      <Table>
        <thead>
          <th>Művelet</th>
          <th>Vevő név</th>
          <th>Vevő Email</th>
          <th>Vevő Cím</th>
          <th>Regisztrált</th>
        </thead>
        <tbody>
          {customersData?.map((f) => (
            <tr key={f.VevoID}>
              <td>
                <Button
                  onClick={() => {
                    const felhasznaloId = f.VevoID;
                    const url = `http://localhost:7777/vevo/${felhasznaloId}`;
                    handleDelete(url);
                  }}
                  variant="danger"
                >
                  Törlés
                </Button>
              </td>
              <td>{f.VevoNev}</td>
              <td>{f.VevoEmail}</td>
              <td>{f.Cim}</td>
              <td>{f.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminFelhasznalokPage;
