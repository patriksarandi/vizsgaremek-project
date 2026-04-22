import { Badge, Button, Card } from "react-bootstrap";
import { Autentikacio } from "./AuthContext";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

const ProductComponent = ({
  product,
  handleKosarTetel,
  termekErtekeles,
  onErtekelesFrissites,
}) => {
  const { user, getAuthHeader } = Autentikacio();
  const [ertekeles, setErtekeles] = useState(termekErtekeles ?? 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (termekErtekeles !== undefined) {
      setErtekeles(termekErtekeles);
    }
  }, [termekErtekeles]);

  const handleErtekeles = async (ertekelesiErtek: number | null) => {
    if (ertekelesiErtek === null) return;

    const biztosErtek = ertekelesiErtek ?? 0;

    try {
      const response = await fetch(
        `http://localhost:7777/ertekeles/${user.id || user.VevoID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
          body: JSON.stringify({
            VevoID: Number(user.id || user.VevoID),
            TermekID: Number(product.TermekID),
            ErtekelesSzam: Number(biztosErtek),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Hiba történt");
      } else {
        console.log("Leadott értékelés", ertekelesiErtek);
        setErtekeles(ertekelesiErtek);
        if (onErtekelesFrissites) {
          onErtekelesFrissites(product.TermekID, ertekelesiErtek);
        }
      }
    } catch (error: any) {
      console.error("Hiba történt:", error.message);
    }
  };

  const GetKategoria = (id) => {
    const kategoriak = [
      "",
      "Gitár",
      "Basszus Gitár",
      "Billentyűs",
      "Ütős",
      "Fúvós",
      "Vonós",
      "Stúdió",
      "Tartozékok",
    ];
    return kategoriak[id] || "Ismeretlen";
  };

  return (
    <Card className="h-100 border-0 shadow-sm hover-shadow transition">
      <div
        className="d-flex align-items-center justify-content-center bg-light text-secondary"
        style={{ height: "180px", cursor: "pointer" }}
        onClick={() => navigate(`/termek/${product.TermekID}`)}
      >
        <div className="text-center opacity-50">
          <i className="bi bi-music-note-beamed display-4"></i>
          <p className="small mb-0 mt-2">A kép jelenleg nem elérhető</p>
        </div>
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <small
            className="text-primary fw-bold text-uppercase"
            style={{ fontSize: "0.75rem" }}
          >
            {product.Brand}
          </small>
          <Card.Title
            className="h5 mb-1 text-truncate"
            title={product.TermekNev}
          >
            {product.TermekNev}
          </Card.Title>
          <Card.Text className="text-muted small mb-2">
            {GetKategoria(product.KategoriaID)}
          </Card.Text>
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold">
              {new Intl.NumberFormat("hu-HU").format(product.TermekAr)} Ft
            </h5>
            {product.Keszlet > 0 ? (
              <Badge
                bg="success-subtle"
                className="text-success border border-success-subtle"
              >
                Készleten
              </Badge>
            ) : (
              <Badge
                bg="danger-subtle"
                className="text-danger border border-danger-subtle"
              >
                Elfogyott
              </Badge>
            )}
          </div>

          <div className="d-flex align-items-center mb-3">
            <Rating
              size="small"
              precision={1}
              value={ertekeles || 0}
              onChange={(event, newValue) => handleErtekeles(newValue)}
            />
            <span className="ms-2 small text-muted">({ertekeles})</span>
          </div>

          <Button
            variant="primary"
            className="w-100 fw-bold py-2 shadow-sm"
            onClick={() => navigate(`/termek/${product.TermekID}`)}
          >
            Részletek
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductComponent;
