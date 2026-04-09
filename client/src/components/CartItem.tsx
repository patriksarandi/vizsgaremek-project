import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Autentikacio } from "./AuthContext";

const CartItem = ({ tetel, handleKosarTetel }: { tetel: any }) => {
  const { user } = Autentikacio();

  if (!tetel || !tetel.Termek) return null;

  return (
    <div className="border p-3 mb-2 shadow-sm rounded bg-white">
      <h5>{tetel.Termek.TermekNev}</h5>
      <p>
        {tetel.TetelMennyiseg} db x {tetel.Termek.TermekAr} Ft
      </p>
      <Button>-</Button>
      <Button onClick={()=> handleKosarTetel(user.VevoID, tetel.TermekID, 1)}>+</Button>
    </div>
  );
};

export default CartItem;
