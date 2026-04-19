import { useEffect, useState } from "react";
import { Table, Container, Badge, Spinner } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";

const ProfileMegrendelesek = () => {
  const [rendelesek, setRendelesek] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, getAuthHeader } = Autentikacio();

  useEffect(() => {
    const fetchRendelesek = async () => {
      if (!user) return;
      try {
        const response = await fetch(
          `http://localhost:7777/rendeles/user/${user.VevoID}`,
          {
            headers: { ...getAuthHeader() },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setRendelesek(data);
        }
      } catch (error) {
        console.error("Hiba a rendelések betöltésekor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRendelesek();
  }, [user]);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Korábbi megrendeléseim</h3>
      {rendelesek.length === 0 ? (
        <p className="text-muted text-center">
          Még nem volt leadott rendelésed.
        </p>
      ) : (
        <Table responsive hover className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Rendelés ID</th>
              <th>Dátum</th>
              <th>Termékek</th>
              <th>Összeg</th>
              <th>Státusz</th>
            </tr>
          </thead>
          <tbody>
            {rendelesek.map((r) => (
              <tr key={r.RendelesID}>
                <td>#{r.RendelesID}</td>
                <td>
                  {new Date(r.RendelesiDatum).toLocaleDateString("hu-HU")}
                </td>
                <td>
                  <ul
                    className="list-unstyled mb-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {(r.RendeltTermekek || r.RendeltTermek)?.map((rt: any) => (
                      <li key={rt.TermekID}>
                        {rt.RendeltMennyiseg}x {rt.Termek?.TermekNev}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="fw-bold">
                  {Number(r.RendelesiVegosszeg).toLocaleString()} Ft
                </td>
                <td>
                  <Badge bg={r.Statusz === "Aktív" ? "success" : "secondary"}>
                    {r.Statusz}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ProfileMegrendelesek;
