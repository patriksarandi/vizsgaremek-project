import { Button, Form } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";
import { useRef } from "react";

const ProfileFelhasznaloi = () => {
  const { user } = Autentikacio();

  const vezeteknevRef = useRef(null);
  const keresztnevRef = useRef(null);
  const telefonszamRef = useRef(null);
  const emailRef = useRef(null);

  const handleUpdateNev = async () => {
    try {
      const response = await fetch(
        `http://localhost:7777/vevo/${user.VevoID}/teljes-nev`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vezeteknev: vezeteknevRef.current.value,
            keresztnev: keresztnevRef.current.value,
          }),
        },
      );

      // 1. ELŐSZÖR ellenőrizzük, hogy sikeres-e a válasz
      if (!response.ok) {
        // Ha 500-as hiba van, ide fog futni
        const hibaSzoveg = await response.text(); // JSON helyett szövegként olvassuk be a hibát
        throw new Error(`Szerver hiba (${response.status}): ${hibaSzoveg}`);
      }

      // 2. CSAK AKKOR olvassuk be JSON-ként, ha minden OK
      const data = await response.json();
      alert("Sikeres módosítás!");
    } catch (error) {
      console.error("Részletes hiba:", error);
      alert("Hiba történt: " + error.message);
    }
  };

  return (
    <>
      <h4>Elérhetőségek</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Vezetéknév</Form.Label>
          <Form.Control ref={vezeteknevRef} defaultValue={user.Vezeteknev} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Keresztnév</Form.Label>
          <Form.Control ref={keresztnevRef} defaultValue={user.Keresztnev} />
        </Form.Group>
        <Button onClick={handleUpdateNev}>Név Módosítása</Button>
      </Form>

      <hr />
      <h4>Telefonszám</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Telefonszám</Form.Label>
          <Form.Control ref={telefonszamRef} defaultValue={user.Telefonszam} />
        </Form.Group>

        <Button>Telefonszám Módosítása</Button>
      </Form>

      <hr />
      <h4>E-mail cím</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>E-mail cím</Form.Label>
          <Form.Control ref={emailRef} defaultValue={user.VevoEmail} />
        </Form.Group>
        <Button>E-mail Módosítása</Button>
      </Form>
    </>
  );
};

export default ProfileFelhasznaloi;
