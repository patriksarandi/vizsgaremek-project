import { Button, Card } from "react-bootstrap"

const ProductComponent = ({ product }) => {
    const GetKategoria = (kategoriaid: number) => {
        let kategoriaNev;
        switch (kategoriaid) {
            case 1: kategoriaNev = "Húros"; break;
            default:  break;
        }

        return kategoriaNev;
    }

    return (
        <Card className="h-100">
            <Card.Img variant="top"/>
            <Card.Body>
                <Card.Title>{product.TermekNev}</Card.Title>
                <Card.Text>
                    {GetKategoria(product.KategoriaID)}
                </Card.Text>
                <Card.Text>
                    <b>{product.TermekAr} Ft</b>
                </Card.Text>
                <Button>Kosárba</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductComponent