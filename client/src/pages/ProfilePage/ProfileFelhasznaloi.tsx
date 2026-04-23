import { Button, Form, Spinner } from "react-bootstrap";
import { Autentikacio } from "../../context/AuthContext";
import { useRef } from "react";

const ProfileFelhasznaloi = () => {
  const { user, loading, setUser, logout, getAuthHeader } = Autentikacio();
  const vezeteknevRef = useRef(null);
  const keresztnevRef = useRef(null);
  const telefonszamRef = useRef(null);
  const emailRef = useRef(null);
  const utcaRef = useRef(null);
  const varosRef = useRef(null);
  const irszamRef = useRef(null);

  if (loading) return <div className="text-center p-5"><Spinner animation="grow" /></div>;
  if (!user) return <p className="text-center mt-5">Kérjük, jelentkezzen be!</p>;

  const updateLocalUser = (updatedData) => {
    const frissitettUser = { ...user, ...updatedData };
    setUser(frissitettUser);
    localStorage.setItem("user", JSON.stringify(frissitettUser));
  };

  const handleUpdateNev = async () => {
    const ujVezeteknev = vezeteknevRef.current.value;
    const ujKeresztnev = keresztnevRef.current.value;

    try {
      const response = await fetch(
        `http://localhost:7777/vevo/${user.VevoID}/teljes-nev`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
          body: JSON.stringify({
            vezeteknev: ujVezeteknev,
            keresztnev: ujKeresztnev,
          }),
        },
      );

      if (response.ok) {
        updateLocalUser({ Vezeteknev: ujVezeteknev, Keresznev: ujKeresztnev });
        alert("Sikeresen elmetve az adatbázisba.");
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
  };

  const handleUpdateTelefonszam = async () => {
    try {
      const tel = telefonszamRef.current.value;
      const response = await fetch(
        `http://localhost:7777/vevo/${user.VevoID}/telefonszam`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({ telefonszam: tel }),
        },
      );

      if (response.ok) {
        updateLocalUser({ Telefonszam: tel });
        alert("Telefonszám módosítva");
      }
    } catch (error) {
      console.error("Hiba:", error);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const mail = emailRef.current.value;
      const response = await fetch(
        `http://localhost:7777/vevo/${user.VevoID}/email`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({ vevoEmail: mail }),
        },
      );

      if (response.ok) {
        updateLocalUser({ VevoEmail: mail });
        alert("Email módosítva");
      }
    } catch (error) {
      alert("Hiba történt az email módosításakor.");
    }
  };

  const handleUpdateCim = async () => {
    try {
      const teljesCim = `${irszamRef.current.value} ${varosRef.current.value}, ${utcaRef.current.value}`;

      const response = await fetch(
        `http://localhost:7777/vevo/${user.VevoID}/cim`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({ Cim: teljesCim }),
        },
      );

      if (response.ok) {
        updateLocalUser({ Cim: teljesCim });
        alert("Cím sikeresen mentve");
      }
    } catch (error) {
      console.error("Cím hiba:", error);
    }
  };

  const handleFiokTorlese = async () => {
    if (!window.confirm("Biztosan törölni szeretnéd a fiókodat?")) return;

    try {
      const response = await fetch(
        `http://localhost:7777/vevo/${user.VevoID}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
        },
      );

      if (!response.ok) {
        alert("Fiók sikeresen törölve!");
        logout();
      }
    } catch (error) {
      console.error("Törlési hiba", error);
    }
  };

  const cimReszek = user.Cim ? user.Cim.split(/[ ,]+/) : ["", "", ""];

  return (
    <div key={user.VevoID}>
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

        <Button onClick={handleUpdateTelefonszam}>
          Telefonszám Módosítása
        </Button>
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

      <hr />
      <h4>Számlázási cím</h4>
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Irányítószám</Form.Label>
          <Form.Control ref={irszamRef} defaultValue={cimReszek[0]} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Város</Form.Label>
          <Form.Control ref={varosRef} defaultValue={cimReszek[1]} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Utca és házszám</Form.Label>
          <Form.Control
            ref={utcaRef}
            defaultValue={cimReszek.slice(2).join(" ")}
          />
        </Form.Group>
        <Button onClick={handleUpdateCim}>Cím Mentése</Button>
      </Form>

      <hr />
      <h4>A fiók felfüggesztése</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            A fiók törlése után már nem vonható vissza a folyamat.
          </Form.Label>
        </Form.Group>
        <Button onClick={handleFiokTorlese}>Fiók törlése</Button>
      </Form>
    </div>
  );
};

export default ProfileFelhasznaloi;
