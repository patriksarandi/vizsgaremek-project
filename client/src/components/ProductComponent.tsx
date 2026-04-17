import { Button, Card } from "react-bootstrap";
import { Autentikacio } from "./AuthContext";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

const ProductComponent = ({ product, handleKosarTetel, termekErtekeles, onErtekelesFrissites }) => {
  const { user, getAuthHeader } = Autentikacio();
  const [ertekeles, setErtekeles] = useState(termekErtekeles || 0);

  useEffect(() => {
    setErtekeles(termekErtekeles);
  }, [termekErtekeles])


  const handleErtekeles = async (ertekelesiErtek: number | null) => {
    if (ertekelesiErtek === null) return;

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

      if (!response.ok) {
        throw new Error("Hiba történt");
      } else {
        console.log("Leadott értékelés", ertekelesiErtek)
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
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{product.TermekNev}</Card.Title>
        <Card.Text className="text-muted">
          {GetKategoria(product.KategoriaID)}
        </Card.Text>
        <Card.Text>
          <b>{product.TermekAr} Ft</b>
        </Card.Text>
        <Card.Text>
          {product.Keszlet
            ? "Készleten: " + product.Keszlet + " db"
            : "Elfogyott"}
        </Card.Text>
        <div className="mb-3">
          <Rating
            precision={1}
            value={ertekeles}
            onChange={(event, newValue) => {
              console.log("New Rating:", newValue);
              handleErtekeles(newValue);
            }}
          />
        </div>
        <Button
          className="w-100"
          variant="primary"
          disabled={product.Keszlet === 0}
          onClick={() => {
            const kosarId = user?.VevoID || user?.id;
            const termekId = product.TermekID;

            if (product.Keszlet < 1) {
              alert("Sajnos nincs több készleten!");
              return;
            }

            if (!kosarId) {
              console.error("Hiba: Nincs felhasználói azonosító!");
              return;
            }

            handleKosarTetel(kosarId, termekId, 1);
          }}
        >
          Kosárba
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductComponent;