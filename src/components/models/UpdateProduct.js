import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Modal, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchBrands, fetchOneBrand } from "../../http/brandApi";
import { fetchImageProduct, fetchOneProduct, updateProduct } from "../../http/productApi";
import { fetchTypes } from "../../http/typeApi";
import { Context } from "../../index";
import { SHOP_ROUTE } from "../../utils/consts";


  
const UpdateProduct = observer(({ show, onHide, prod }) => {
  const { product } = useContext(Context);
    const navigate = useNavigate();
  const [info, setInfo] = useState(prod.info);
  const [name, setName] = useState(prod.name);
  const [price, setPrice] = useState(prod.price);
  const [brand, setBrand] = useState(prod.brandId);
  const [type, setType] = useState(prod.typeId);
  const [file, setFile] = useState(prod.img);
  useEffect(() => {
    fetchTypes().then((data) => {
      product.setTypes(data);
    });
    fetchBrands().then((data) => product.setBrands(data));
    product.setSelectedBrand(product.brands.find((brand)=>{return brand.id === prod.brandId}))
    product.setSelectedType(product.types.find((type)=>{return type.id === prod.typeId}))
  }, []);

  const addInfo = () => {
    console.log(info)
    setInfo([...info, { title: "", description: "", id: Date.now() }]);
  };
  const removeInfo = (id) => {
    setInfo(info.filter((i) => i.id !== id));
  };

  const changeInfo = (key, value, id) => {
    setInfo(
      info.map((i) => (i.id === id ? { ...i, [key]: value } : i))
    );
  };
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };
  const updProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", product.selectedBrand.id);
    formData.append("typeId", product.selectedType.id);
    formData.append("info", JSON.stringify(info));
    console.log(formData)
    updateProduct(prod.id, formData).then((data) => onHide());
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {product.selectedType.name || "Choose type"}
            </Dropdown.Toggle>
            <Dropdown.Menu key={"1"}>
              {product.types.map((type) => (
                <Dropdown.Item
                  onClick={() => product.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {product.selectedBrand.name || "Choose brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => product.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Name..."
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Price..."
            type="number"
          />
          <Form.Control onChange={selectFile} className="mt-3" type="file"/>
          <hr />
          <Button variant={"outline-dark"} onClick={addInfo}>
            Add new Field info
          </Button>
          {info.map((i) => (
            <Row className="mt-3" key={i.id}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.id)
                  }
                  placeholder="Name..."
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.id)
                  }
                  placeholder="Description..."
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.id)}
                  variant={"outline-danger"}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Close
        </Button>
        <Button variant={"outline-success"} onClick={updProduct}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default UpdateProduct;
