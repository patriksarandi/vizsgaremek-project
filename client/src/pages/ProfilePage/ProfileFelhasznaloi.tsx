import { Button, Form } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";
import { useState } from "react";

const ProfileFelhasznaloi = () => {
  const { user } = Autentikacio();

  const [vezeteknev, setVezeteknev] = useState(user.Vezeteknev);
  const [keresztnev, setKeresztnev] = useState(user.Keresztnev);
  const [telefonszam, setTelefonszam] = useState(user.Telefonszam);
  const [email, setEmail] = useState(user.Email);
  

  return (
    <>
      <h4>Elérhetőségek</h4>
      <Form>
        <Form.Label>Vezetéknév</Form.Label>
        <Form.Control
          value={vezeteknev}
          placeholder={vezeteknev ? vezeteknev : "Nincs megadva"}
        ></Form.Control>

        <Form.Label>Keresztnév</Form.Label>
        <Form.Control
          value={keresztnev}
          placeholder={keresztnev ? keresztnev : "Nincs megadva"}
        ></Form.Control>

        <Button>Módosítás</Button>
      </Form>

      <h4>Telefonszám</h4>
      <Form>
        <Form.Label>Telefonszám</Form.Label>
        <Form.Control
          value={telefonszam}
          placeholder={telefonszam ? telefonszam : "Nincs megadva"}
        ></Form.Control>

        <Button>Telefonszám Módosítás</Button>
      </Form>

      <h4>E-mail cím</h4>
      <Form>
        <Form.Label>E-mail cím</Form.Label>
        <Form.Control
          value={email}
          placeholder={email ? email : "Nincs megadva"}
        ></Form.Control>

        <Button>Telefonszám Módosítás</Button>
      </Form>

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
