import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "../index";
import BrandBar from "../components/BrandBar";
import ProductList from "../components/ProductList";
import TypeBar from "../components/TypeBar";
import { fetchTypes } from "../http/typeApi";
import { fetchBrands } from "../http/brandApi";
import { fetchProducts } from "../http/productApi";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { product} = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProducts(null, null, product.page, 3).then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchProducts(
      product.selectedType.id,
      product.selectedBrand.id,
      product.page,
      3
    ).then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
  }, [product.page, product.selectedType.id, product.selectedBrand.id]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3} style={{ borderRight: 2 + "px solid darkgray" }}>
          <p className="ms-3 pt-2">Categories</p>
          <TypeBar />
          <BrandBar />
        </Col>
        <Col md={9}>
          <ProductList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
