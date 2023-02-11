import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchOneBrand } from "../http/brandApi";
import { PRODUCT_ROUTE } from "../utils/consts";
import getStarsArray from "../utils/getStarsArray";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  useEffect(() => {
    fetchOneBrand(product.brandId).then((data) => setBrand(data.name));
  }, []);
  const raiting = getStarsArray(product);

  return (
    <Col
      md={3}
      className={"mt-3 me-2"}
      onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}
    >
      <Card
        style={{ cursor: "pointer" }}
        border={"light"}
        className="shadow-sm mb-5 bg-body rounded "
      >
        <Card.Img
          variant="top"
          height={200}
          src={process.env.REACT_APP_API_URL + product.img}
        />
        <div className="p-1">
          <div className="text-black-50 d-flex justify-content-between align-items-center">
            <div>{brand}</div>
          </div>
          <div>{product.name}</div>
          <div className="d-flex align-items-center">
            <div>{raiting.map((data) => data)}</div>
          </div>

          <div style={{ textAlign: "end" }}>{product.price} $</div>
        </div>
      </Card>
    </Col>
  );
};

export default ProductItem;
