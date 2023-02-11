import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ProductItem from "./ProductItem";
import { Form } from "react-bootstrap";

const ProductList = observer(() => {
  const { product } = useContext(Context);
  return (
    <Form className="d-flex">
      {product.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Form>
  );
});

export default ProductList;
