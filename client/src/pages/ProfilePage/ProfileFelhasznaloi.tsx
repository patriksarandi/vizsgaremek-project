import { Button, Form } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";
import { useRef } from "react";

const ProfileFelhasznaloi = () => {
  const { user, setUser } = Autentikacio();

  const vezeteknevRef = useRef(user.Vezeteknev);
  const keresztnevRef = useRef(user.Keresztnev);
  const telefonszamRef = useRef(null);
  const emailRef = useRef(null);

  const handleUpdateNev = async () => {

    try {
      if (!vezeteknevRef.current?.value || !keresztnevRef.current?.value) {
        console.error("Minden mezőt ki kell tölteni!");
        return;
      }

      const response = await fetch(
        `http://localhost:7777/vevo/${user.VevoID}/teljes-nev`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            vezeteknev: vezeteknevRef.current.value,
            keresztnev: keresztnevRef.current.value
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        const frissitettUser = {
          ...user,
          Vezeteknev: vezeteknevRef.current.value,
          Keresztnev: keresztnevRef.current.value,
        };

        localStorage.setItem("user", JSON.stringify(frissitettUser));
        setUser(frissitettUser);

        alert("Név sikeresen módosítva");
      } else {
        const errorData = await response.json();
        console.error("Szerver hiba:", errorData);
      }
    } catch (error: any) {
      console.error("Fetch hiba: ", error.message);
      alert(error.message);
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
