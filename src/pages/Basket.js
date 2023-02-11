import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '../index';
import BasketList from '../components/BasketList';
import { fetchBasketProduct } from '../http/basketApi';
import { fetchBrands } from '../http/brandApi';
import { fetchTypes } from '../http/typeApi';

const Basket = observer(() => {
    const { basket, user } = useContext(Context);
  
    useEffect(() => {
      fetchBasketProduct(user.user.id).then(data=>{
        basket.setProducts(data.rows);
        basket.setTotalCount(data.count);
      })
    }, []);
  
    // useEffect(() => {
    //     fetchBasketProduct(user.user.id,

    //   ).then((data) => {
    //     basket.setProducts(data.rows);
    //     basket.setTotalCount(data.count);
    //   });
    // }, [basket.page]);
    
  
    return (
      <Container>
        <Row className="mt-2" >
          <Col md={9}>
            <BasketList />
          </Col>
        </Row>
      </Container>
    );
  });

export default Basket;