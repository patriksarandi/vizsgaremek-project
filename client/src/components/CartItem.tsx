import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Autentikacio } from "./AuthContext";

const CartItem = ({
  tetel,
  updateTermekMennyiseg,
}: {
  tetel: any;
}) => {
  const { user } = Autentikacio();

  if (!tetel || !tetel.Termek) return null;

  return (
    <div className="border p-3 mb-2 shadow-sm rounded bg-white d-flex justify-content-between align-items-center">
      <div>
        <h5 className="mb-1">{tetel.Termek.TermekNev}</h5>
        <p className="mb-0">
          {tetel.TetelMennyiseg} db x {tetel.Termek.TermekAr} Ft
        </p>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Button 
            variant="outline-secondary"
            size="sm"
            onClick={() => updateTermekMennyiseg(tetel.TermekID, -1)}>-</Button>
        <Button
            variant="outline-primary"
            size="sm"
            onClick={() => updateTermekMennyiseg(tetel.TermekID, 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
