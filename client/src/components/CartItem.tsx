import { Button } from "react-bootstrap";

const CartItem = ({ tetel, updateTermekMennyiseg }: { tetel: any }) => {
  const termekId = tetel.TermekID || tetel.Termek?.TermekID;

  if (!tetel || !tetel.Termek) return null;

  return (
    <div className="border p-2 p-md-3 mb-2 shadow-sm rounded bg-white d-flex flex-wrap justify-content-between align-items-center">
      <div className="me-2" style={{ minWidth: "120px", flex: "1" }}>
        <h6
          className="mb-1 fw-bold text-truncate"
          style={{ maxWidth: "200px" }}
        >
          {tetel.Termek.TermekNev}
        </h6>
        <p className="mb-0 small text-muted">
          {tetel.TetelMennyiseg} db × {tetel.Termek.TermekAr.toLocaleString()}{" "}
          Ft
        </p>
      </div>

      <div className="d-flex align-items-center gap-2 border rounded p-1">
        <Button
          variant="light"
          size="sm"
          className="fw-bold"
          onClick={(e) => {
            e.preventDefault();
            termekId && updateTermekMennyiseg(termekId, -1);
          }}
        >
          -
        </Button>
        <span className="px-2 fw-bold">{tetel.TetelMennyiseg}</span>
        <Button
          variant="light"
          size="sm"
          className="fw-bold text-primary"
          onClick={(e) => {
            e.preventDefault();
            termekId && updateTermekMennyiseg(termekId, 1);
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
