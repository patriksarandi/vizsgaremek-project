import { useEffect, useState } from "react";
import { Table, Container, Badge, Spinner } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";
import { useFetchData } from "../../components/useFetchData";

const ProfileMegrendelesek = () => {
  const { user, getAuthHeader } = Autentikacio();
  const { data: rendelesek, loading} = useFetchData(user ? `/rendeles/user/${user.VevoID}` : null, getAuthHeader())

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Korábbi megrendeléseim</h3>
      {!rendelesek || rendelesek.length === 0 ? (
        <p className="text-muted text-center py-5 border rounded bg-light">
          Még nem volt leadott rendelésed.
        </p>
      ) : (
        <Table responsive hover className="align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Azonosító</th>
              <th>Dátum</th>
              <th>Termékek</th>
              <th className="text-end">Végösszeg</th>
              <th className="text-center">Státusz</th>
            </tr>
          </thead>
          <tbody>
            {rendelesek.map((r) => (
              <tr key={r.RendelesID}>
                <td className="fw-bold">#{r.RendelesID}</td>
                <td>{new Date(r.RendelesiDatum).toLocaleDateString("hu-HU")}</td>
                <td>
                  <ul className="list-unstyled mb-0 small">
                    {r.RendeltTermek?.map((rt) => (
                      <li key={rt.TermekID}>
                        <i className="bi bi-caret-right-fill text-primary small me-1"></i>
                        {rt.RendeltMennyiseg}x {rt.Termek?.TermekNev} 
                        <span className="text-muted"> ({Number(rt.RendeltEgysegar).toLocaleString()} Ft/db)</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="text-end fw-bold text-nowrap">
                  {Number(r.RendelesiVegosszeg).toLocaleString()} Ft
                </td>
                <td className="text-center">
                  <Badge bg={r.Statusz === "Teljesítve" ? "success" : "warning"} className="px-3 py-2">
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
