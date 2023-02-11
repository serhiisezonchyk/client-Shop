import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Context } from "../index";
import CreateBrand from "../components/models/CreateBrand";
import CreateProduct from "../components/models/CreateProduct";
import CreateType from "../components/models/CreateType";
import { fetchBrands } from "../http/brandApi";
import { fetchTypes } from "../http/typeApi";

const AdminPage = () => {
  const {product} = useContext(Context);
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  useEffect(() => {
    fetchBrands().then((data) => product.setBrands(data));
  }, [product.brands]);
  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
  }, [product.types]);
  return (
    <Container className="d-flex flex-column">
      <Button variant={"outline-dark"}
       className="mt-2 p-2"
       onClick={()=>setTypeVisible(true)}>
        Add type
      </Button>
      <Button variant={"outline-dark"} 
      className="mt-2 p-2"
      onClick={()=>setBrandVisible(true)}>
        Add brand
      </Button>
      <Button variant={"outline-dark"}
       className="mt-2 p-2"
       onClick={()=>setProductVisible(true)}>
        Add product
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateProduct
        show={productVisible}
        onHide={() => setProductVisible(false)}
      />
    </Container>
  );
};

export default AdminPage;
