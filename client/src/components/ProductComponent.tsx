import { Badge, Button, Card } from "react-bootstrap";
import { Autentikacio } from "./AuthContext";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { useKosar } from "./CartContext";

export const KATEGORIAK = [
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

const ProductComponent = ({
  product,
  termekErtekeles,
  onErtekelesFrissites,
}) => {
  const { user, getAuthHeader } = Autentikacio();
  const { hozzaadasAKosarhoz } = useKosar();
  const [ertekeles, setErtekeles] = useState(termekErtekeles ?? 0);
  const navigate = useNavigate();

  const handleErtekeles = async (ertekelesiErtek: number | null) => {
    if (ertekelesiErtek === null || !user) return;

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
            ErtekelesSzam: Number(ertekelesiErtek),
          }),
        },
      );

      if (response.ok) {
        setErtekeles(ertekelesiErtek);
        onErtekelesFrissites?.(product.TermekID, ertekelesiErtek);
      }
    } catch (error) {
      console.error("Hiba történt:", error);
    }
  };

  useEffect(() => {
    if (termekErtekeles !== undefined) {
      setErtekeles(termekErtekeles);
    }
  }, [termekErtekeles]);

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
            {KATEGORIAK[product.KategoriaID] || "Ismeretlen"}
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

          <div className="d-flex gap-2">
            <Button
              variant="primary"
              className="flex-grow-1 fw-bold py-2 shadow-sm d-flex align-items-center justify-content-center"
              onClick={() => navigate(`/termek/${product.TermekID}`)}
            >
              <i className="bi bi-cart3 me-2"></i> Részletek
            </Button>

            <Button
              variant="outline-secondary"
              className="py-2 shadow-sm d-flex align-items-center justify-content-center"
              style={{ width: "45px", flexShrink: 0 }}
              onClick={() => hozzaadasAKosarhoz(product.TermekID, 1)}
              title="Kosárba"
            >
              <i className="bi bi-cart-plus"></i>
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductComponent;
