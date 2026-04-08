import { Button, Form } from "react-bootstrap";
import { Autentikacio } from "../../components/AuthContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ProfileFelhasznaloi = () => {
  const { user, setUser, logout } = Autentikacio();

  const vezeteknevRef = useRef(user.Vezeteknev);
  const keresztnevRef = useRef(user.Keresztnev);
  const telefonszamRef = useRef(user.Telefonszam);
  const emailRef = useRef(user.VevoEmail);
  const navigate = useNavigate()

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
            keresztnev: keresztnevRef.current.value,
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

  const handleUpdateTelefonszam = async () => {
    try {
      if (!telefonszamRef.current?.value) {
        console.error("Hiányos mező");
        return;
      }

      const response = await fetch(
        `http://localhost:7777/vevo/${user.VevoID}/telefonszam`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            telefonszam: telefonszamRef.current.value,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        const frissitettUser = {
          ...user,
          Telefonszam: telefonszamRef.current.value,
        };

        localStorage.setItem("user", JSON.stringify(frissitettUser));
        setUser(frissitettUser);

        alert("Telefonszám sikeresen módosítva");
        console.log("Sikeresen módosított telefonszám", data)
      } else {
        const errorData = await response.json();
        console.error("Szerver hiba:", errorData);
      }
    } catch (error: any) {
      console.error("Fetch hiba: ", error.message);
      alert(error.message);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      if (!emailRef.current?.value) {
        console.error("Hiányos mező");
        return;
      }

      const response = await fetch(
        `http://localhost:7777/vevo/${user.VevoID}/email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            vevoEmail: emailRef.current.value,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        const frissitettUser = {
          ...user,
          VevoEmail: emailRef.current.value,
        };

        localStorage.setItem("user", JSON.stringify(frissitettUser));
        setUser(frissitettUser);

        alert("Email sikeresen módosítva");
      } else {
        const errorData = await response.json();
        console.error("Szerver hiba:", errorData);
      }
    } catch (error: any) {
      console.error("Fetch hiba: ", error.message);
      alert(error.message);
    }
  };

  const handleFiokTorlese = async () => {
    if (!window.confirm("Biztosan törölni szeretnéd a fiókodat? Ez a folyamat nem vonható vissza!")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:7777/vevo/${user.VevoID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        alert(errorData.message || "Sikertelen törlése");
        return;
      } 

      alert("Fiók sikeresen törölve!")
      logout();

    } catch (error: any) {
      console.error("Törlési hiba", error);
      alert("Hálózati hiba történt a törlés során.");
    }
  }

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

        <Button onClick={handleUpdateTelefonszam}>Telefonszám Módosítása</Button>
      </Form>

      <hr />
      <h4>E-mail cím</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>E-mail cím</Form.Label>
          <Form.Control ref={emailRef} defaultValue={user.VevoEmail} />
        </Form.Group>
        <Button onClick={handleUpdateEmail}>E-mail Módosítása</Button>
      </Form>

      <hr/>
      <h4>A fiók felfüggesztése</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>A fiók törlése után már nem vonható vissza a folyamat.</Form.Label>
        </Form.Group>
        <Button onClick={handleFiokTorlese}>Fiók törlése</Button>
      </Form>
    </>
  );
};

export default ProfileFelhasznaloi;
