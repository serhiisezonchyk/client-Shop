import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import { Container, Form } from "react-bootstrap";

const TypeBar = observer(() => {
  const { product } = useContext(Context);
  const [searchValue, setSearchValue] = useState("");
  return (
    <Container
      style={{
        paddingBottom: 10,
        marginTop: 3,
        borderBottom: 2 + "px solid darkgray",
      }}
    >
      <Form.Control
        variant="secondary"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Type.."
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
          onClick={() => product.setSelectedType(0)}
          active={product.selectedType.id === 0}
          style={{ cursor: "pointer" }}
        >
          All types
        </ListGroup.Item>
        {product.types
          .filter((obj) => {
            return obj.name.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map((type) => (
            <ListGroup.Item
              action
              variant="secondary"
              key={type.id}
              onClick={() => product.setSelectedType(type)}
              active={type.id === product.selectedType.id}
              style={{ cursor: "pointer" }}
            >
              {type.name}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  );
});

export default TypeBar;
