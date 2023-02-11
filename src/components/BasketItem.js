import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { fetchOneBrand } from "../http/brandApi";
import { PRODUCT_ROUTE } from "../utils/consts";
import { deleteBasketProduct } from "../http/basketApi";

const BasketItem = ({ product }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  useEffect(() => {
    fetchOneBrand(product.brandId).then((data) => setBrand(data.name));
  }, []);

  return (
    <tr>
      <td>
        <Image
          style={{ cursor: "pointer" }}
          onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}
          height={100}
          src={process.env.REACT_APP_API_URL + product.img}
        />
      </td>
      <td>{brand}</td>
      <td>{product.name}</td>
      <td>{product.raiting}</td>
      <td>{product.price}</td>
      <td>
        <Button
          variant="outline-danger"
          onClick={() => {
            if (window.confirm("Delete this product from basket?"))
              deleteBasketProduct(product.id, user.user.id);
            window.location.reload();
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default BasketItem;
