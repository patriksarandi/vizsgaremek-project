import { Button, Form } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";
import { useRef, useState } from "react";

const ProfileFelhasznaloi = () => {
  const { user } = Autentikacio();

  const vezeteknevRef = useRef(null);
  const keresztnevRef = useRef(null);
  const telefonszamRef = useRef(null);
  const emailRef = useRef(null);

  const handleUpdateNev = async () => {
    try {
      const teljesNev = {
        vezeteknev: vezeteknevRef.current.value,
        keresztnev: keresztnevRef.current.value,
      };

      const response = await fetch(
        `http://localhost:7777/vevo/${user.VevoID - 1}/teljes-nev`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(teljesNev),
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Hiba történt a mentés során.");

      console.log("Sikeres frissítés:", data);
      alert("Név sikeresen módosítva!");
    } catch (error: any) {
      console.error("Hiba:", error.message);
      alert("Hiba: " + error.message);
    }
  };

  return (
    <>
      <h4>Elérhetőségek</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Vezetéknév</Form.Label>
          <Form.Control
            ref={vezeteknevRef}
            defaultValue={user.Vezeteknev}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Keresztnév</Form.Label>
          <Form.Control
            ref={keresztnevRef}
            defaultValue={user.Keresztnev}
          ></Form.Control>
        </Form.Group>

        <Button onClick={handleUpdateNev}>Módosítás</Button>
      </Form>

      <hr />
      <h4>Telefonszám</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Telefonszám</Form.Label>
          <Form.Control
            ref={telefonszamRef}
            defaultValue={user.Telefonszam}
          ></Form.Control>
        </Form.Group>

        <Button>Telefonszám Módosítás</Button>
      </Form>

      <hr />
      <h4>E-mail cím</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>E-mail cím</Form.Label>
          <Form.Control
            ref={emailRef}
            defaultValue={user.VevoEmail}>
          </Form.Control>
        </Form.Group>

        <Button>Telefonszám Módosítás</Button>
      </Form>

      <hr/>
      <h4>Jelszó</h4>
      <Form>
        <Form.Label>Jelenlegi jelszó</Form.Label>
        <Form.Control></Form.Control>

        <Form.Label>Jelszó</Form.Label>
        <Form.Control></Form.Control>

        <Form.Label>Jelszó visszaigazolása</Form.Label>
        <Form.Control></Form.Control>
        <Button>Jelszó megváltoztatása</Button>
      </Form>

      <h4>Számlázási adatok</h4>

      <h4>Fiók felfüggesztése</h4>
      <Button>Fiók törlése</Button>
    </>
  );
};

export default ProfileFelhasznaloi;
