import {
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  Offcanvas,
  Table,
} from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import { useState } from "react";

interface TermekProps {
  kategoriaId: number;
  termekNev: string;
  termekAr: number;
  keszlet: number;
}

interface KategoriaProps {
  kategoriaNev: string;
}

const FelhasznalokPage = ({customersData, handleDelete}) => {
    const [vevoNev, setVevoNev] = useState<string>("");
    const [vevoEmail, setVevoEmail] = useState<string>("");
    const [cim, setCim] = useState<string>("");

  return (
    <Container>
      <Table>
        <thead>
          <th>Művelet</th>
          <th>Vevő név</th>
          <th>Vevő Email</th>
          <th>Vevő Cím</th>
          <th>Regisztrált</th>
        </thead>
        <tbody>
          {customersData?.map((f) => (
            <tr key={f.VevoID}>
              <td>
                <Button
                  onClick={() => {
                    const felhasznaloId = k.VevoID;
                    const url = `http://localhost:7777/vevo/${felhasznaloId}`;
                    handleDelete(url);
                  }}
                  variant="danger"
                >
                  Törlés
                </Button>
              </td>
              <td>{f.VevoNev}</td>
              <td>{f.VevoEmail}</td>
              <td>{f.Cim}</td>
              <td>{f.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const KategoriakPage = ({ categoriesData, handleAdd, handleDelete }) => {
  const [kategoriaNev, setKategoriaNev] = useState<string>("");
  const [error, setError] = useState<string>("")
  const kategoriaAddUrl = "http://localhost:7777/kategoria";
  const ujKategoria = {
    kategoriaNev: kategoriaNev,
  };

  return (
    <Container>
      <Table>
        <tr>
          <td>
            <Form>
              <Form.Control
                type="text"
                placeholder="Kategória név"
                value={kategoriaNev}
                onChange={(e) => setKategoriaNev(e.target.value)}
              />
            </Form>
          </td>
          <td>
            <Button
              onClick={() => {
                handleAdd(ujKategoria, kategoriaAddUrl);
              }}
            >
              Hozzáad
            </Button>
          </td>
        </tr>
      </Table>

      <Table>
        <thead>
          <th>Művelet</th>
          <th>Kategória Név</th>
        </thead>
        <tbody>
          {categoriesData?.map((k) => (
            <tr key={k.KategoriaID}>
              <td>
                <Button
                  onClick={() => {
                    const kategoriaId = k.KategoriaID;
                    const url = `http://localhost:7777/kategoria/${kategoriaId}`;
                    handleDelete(url);
                  }}
                  variant="danger"
                >
                  Törlés
                </Button>
              </td>
              <td>{k.Nev}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const TermekekPage = ({ termekAdatok, handleAdd, handleDelete }) => {
  const [kategoriaId, setKategoriaId] = useState(0);
  const [termekNev, setTermekNev] = useState("");
  const [termekAr, setTermekAr] = useState(0);
  const [keszlet, setKeszlet] = useState(0);
  const termekAddUrl = "http://localhost:7777/termek";

  const ujTermek: TermekProps = {
    kategoriaId: Number(kategoriaId),
    termekNev: termekNev,
    termekAr: Number(termekAr),
    keszlet: Number(keszlet),
  };

  return (
    <Container>
      <Table>
        <tr>
          <td>
            <Form>
              <Form.Control
                type="number"
                placeholder="Kategória ID"
                value={kategoriaId}
                onChange={(e) => setKategoriaId(Number(e.target.value))}
              />
            </Form>
          </td>
          <td>
            <Form>
              <Form.Control
                type="text"
                placeholder="Termék név"
                value={termekNev}
                onChange={(e) => setTermekNev(e.target.value)}
              />
            </Form>
          </td>
          <td>
            <Form>
              <Form.Control
                type="number"
                placeholder="Termék ár"
                value={termekAr}
                onChange={(e) => setTermekAr(Number(e.target.value))}
              />
            </Form>
          </td>
          <td>
            <Form>
              <Form.Control
                type="number"
                placeholder="Készlet"
                value={keszlet}
                onChange={(e) => setKeszlet(Number(e.target.value))}
              />
            </Form>
          </td>
          <td>
            <Button
              onClick={() => {
                handleAdd(ujTermek, termekAddUrl);
              }}
            >
              Hozzáad
            </Button>
          </td>
        </tr>
      </Table>

      <Table>
        <thead>
          <th>Művelet</th>
          <th>Termék Név</th>
          <th>Termék Ár</th>
          <th>Készlet</th>
        </thead>
        <tbody>
          {termekAdatok.map((t) => (
            <tr key={t.TermekID}>
              <td>
                <Button
                  onClick={() => {
                    const termekId = t.TermekID;
                    const url = `http://localhost:7777/termek/${termekId}`;
                    handleDelete(url);
                  }}
                  variant="danger"
                >
                  Törlés
                </Button>
              </td>
              <td>{t.TermekNev}</td>
              <td>{t.TermekAr}</td>
              <td>{t.Keszlet}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const AdminPage = ({
  productsData,
  setProductsData,
  categoriesData,
  setCategoriesData,
  customersData,
  setCustomersData
}) => {
  const [selectedPage, setSelectedPage] = useState("");

  const handleAdd = async (dto: TermekProps | KategoriaProps, url) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });

      if (!response)
        throw new Error("Nem sikerült a termék hozzáadása.", response.status);

      const data = await response.json();
      console.log("Server:", data);
    } catch (error: any) {
      console.error("Hiba a küldés során:", error.message);
    }
  };

  const handleDelete = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response) throw new Error("Sikertelen törlés.");

      const data = await response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const PageSelector = () => {
    switch (selectedPage) {
      case "termekek":
        return (
          <TermekekPage
            termekAdatok={productsData}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
          />
        );

      case "kategoriak":
        return (
          <KategoriakPage
            categoriesData={categoriesData}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
          />
        );

      case "felhasznalok":
        return <FelhasznalokPage customersData={customersData} handleDelete={handleDelete} />;

      default:
        break;
    }
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" className="border-bottom border-secondary">
        <Container fluid>
          <Navbar.Brand style={{ color: "white", fontWeight: "bold" }} href="/">
            OnFret
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle variant="success">Profile</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profil</Dropdown.Item>
                <Dropdown.Item onClick={() => console.log("Kijelentkezés")}>
                  Kijelentkezés
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      <div className="d-flex">
        <div className="p-3" style={{ width: "210px" }}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item className="mb-2">
              <Nav.Link href="#" onClick={() => setSelectedPage("termekek")}>
                Termékek
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-2">
              <Nav.Link href="#" onClick={() => setSelectedPage("kategoriak")}>
                Kategóriák
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setSelectedPage("felhasznalok")}>Felhasználók</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <main className="flex-grow-1 p-4 bg-light overflow-auto">
          {PageSelector()}
        </main>
      </div>
    </>
  );
};

export default AdminPage;
