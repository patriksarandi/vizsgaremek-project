import { Button, Card } from "react-bootstrap";
import { Autentikacio } from "./AuthContext";

const ProductComponent = ({ product, handleKosarTetel }) => {
  const { user } = Autentikacio();
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
    <Card className="h-100">
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{product.TermekNev}</Card.Title>
        <Card.Text>{GetKategoria(product.KategoriaID)}</Card.Text>
        <Card.Text>
          <b>{product.TermekAr} Ft</b>
        </Card.Text>
        <Card.Text>
          {product.Keszlet
            ? "Készleten: " + product.Keszlet + " db"
            : "Elfogyott"}
        </Card.Text>
        <Button
          disabled={product.Keszlet === 0}
          onClick={() => {
            const kosarId = user?.VevoID || user?.id;
            const termekId = product.TermekID;
            
            if (product.Keszlet < 1) {
              alert("Sajnos nincs több készleten!");
              return;
            }

            if (!kosarId) {
              console.error("Hiba: Nincs felhasználói azonosító!")
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
