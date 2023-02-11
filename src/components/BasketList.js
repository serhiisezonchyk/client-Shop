import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Context } from "../index";
import BasketItem from "./BasketItem";

const BasketList = observer(() => {
  const { basket } = useContext(Context);
  const getTotals = (data, key) => {
    let total = 0;
    data.forEach(item => {
      total += item.product[key];
    });
    return total;
  };
  useEffect(() => {}, [basket]);
  return (
    <div className="row justify-content-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product image</th>
            <th>Brand</th>
            <th>Product</th>
            <th>Raiting</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {basket.products.map((product) => (
            <BasketItem key={product.product.id} product={product.product} />
          ))}
          <tr>
            <td colSpan={5}>Total price: {getTotals(basket.products, 'price')}</td>
            <td><Button variant="outline-success">Order</Button></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
});

export default BasketList;
