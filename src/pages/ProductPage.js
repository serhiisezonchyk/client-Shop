import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Container,
  Image,
  Row,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../index";
import { fetchOneBrand } from "../http/brandApi";
import { deleteProduct, fetchOneProduct } from "../http/productApi";
import getStarsArray from "../utils/getStarsArray";
import { SHOP_ROUTE } from "../utils/consts";
import UpdateProduct from "../components/models/UpdateProduct";
import { createBasketProduct, deleteBasketProduct, fetchOneBasketProduct } from "../http/basketApi";


const ProductPage = () => {
  const navigate = useNavigate();
  const { user, basket } = useContext(Context);
  const [product, setProduct] = useState({ info: [] });
  const [brand, setBrand] = useState("");
  const [raiting, setRaiting] = useState([]);
  const [productVisible, setProductVisible] = useState(false);
  const [isProdInBasket, setIsProdInBasket] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    fetchOneBasketProduct(id, user.user.id).then((data) => {
      data.length === 0 ? setIsProdInBasket(false) : setIsProdInBasket(true);
    });
    fetchOneProduct(id).then((data) => {
      setProduct(data);
      fetchOneBrand(data.brandId).then((brand) => setBrand(brand.name));
      const raiting = getStarsArray(data);
      setRaiting(raiting);
    });
  }, []);

  const clickBasketButton = async () => {
    if(isProdInBasket){
      deleteBasketProduct(id, user.user.id)
      setIsProdInBasket(false)
    }else{
      const basket_product={
        userId: user.user.id,
        productId: id
      }
      createBasketProduct(basket_product);
      setIsProdInBasket(true)
    }
  };

  return (
    <Container>
      <Row className="mt-3">
        <h2>
          {brand} {product.name}
        </h2>
      </Row>
      <Row>
        <Col sm={"auto"} style={{ borderRight: 2 + "px solid darkgray" }}>
          <Card className="mt-3" style={{ width: 400 }}>
            <Card.Img
              variant="top"
              src={process.env.REACT_APP_API_URL + product.img}
            />
            <Card.Body>
              <Card.Text>Users raiting {raiting}</Card.Text>
            </Card.Body>
            {user.user.role === "ADMIN" ? (
              <div className="ms-3 mb-3">
                <Button
                  variant="outline-success"
                  onClick={() => {
                    setProduct(product);
                    setProductVisible(true);
                  }}
                >
                  Update
                </Button>
                <Button
                  className="ms-3"
                  variant="outline-danger"
                  onClick={() => {
                    confirm("Delete this product?")
                      ? deleteProduct(product.id)
                      : "";
                    navigate(SHOP_ROUTE);
                  }}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <></>
            )}
          </Card>
        </Col>
        <Col className="ms-4">
          <Container>
            <Row>
              <Col sm={"auto"}>
                <h1>{product.price} $</h1>
              </Col>
              <Col>
                {isProdInBasket ? (
                  <Button className="mt-2" variant="danger" onClick={clickBasketButton}>
                    Remove from basket
                  </Button>
                ) : (
                  <Button className="mt-2" variant="success" onClick={clickBasketButton}>
                    To basket
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
          <Card className="mt-3">
            <Card.Body>
              <h1>Description</h1>
              {product.info.length !== 0 ? (
                product.info.map((info, index) => (
                  <Row
                    key={info.id}
                    style={{
                      background: index % 2 === 0 ? "lightgray" : "transparent",
                      padding: 10,
                    }}
                  >
                    {info.title}: {info.description}
                  </Row>
                ))
              ) : (
                <Row>
                  <p>No description</p>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {productVisible ? (
        <UpdateProduct
          show={productVisible}
          onHide={() => {
            setProductVisible(false);
            navigate(SHOP_ROUTE);
          }}
          prod={product}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};


export default ProductPage;
