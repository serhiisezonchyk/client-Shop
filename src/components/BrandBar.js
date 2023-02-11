import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Card, Container, Form, ListGroup } from "react-bootstrap";
import { Context } from "../index";

const BrandBar = observer(() => {
  const [searchValue, setSearchValue] = useState("");

  const { product } = useContext(Context);
  return (
    <Container style = {{paddingBottom: 10, marginTop: 5, borderBottom: 2+'px solid darkgray'}}>
    <Form.Control
      variant="secondary"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Brand.."
      className="mb-1"
    />
    <ListGroup
      style={{ maxHeight: 200, overflowY: "auto" }}
      className="list-group-flush"
    >
      <ListGroup.Item
        action
        variant="secondary"
        key={0}
        onClick={() => product.setSelectedBrand(0)}
        active={product.selectedBrand.id === 0}
        style={{ cursor: "pointer" }}
      >All brands</ListGroup.Item>
      {product.brands
        .filter((obj) => {
          return obj.name.toLowerCase().includes(searchValue.toLowerCase());
        })
        .map((brand) => (
          <ListGroup.Item
            action
            variant="secondary"
            key={brand.id}
            onClick={() => product.setSelectedBrand(brand)}
            active={brand.id === product.selectedBrand.id}
            style={{ cursor: "pointer" }}
          >
            {brand.name}
          </ListGroup.Item>
        ))}
    </ListGroup>
  </Container>
  );
});

export default BrandBar;
