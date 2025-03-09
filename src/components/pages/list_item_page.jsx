import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Input, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getProduct, getSingleProduct } from '../../redux/slice';
import { updateCart } from '../../utils/cartUtils';

const { Meta } = Card;

function ListItem() {
  const { productdata } = useSelector((state) => state.productSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});

  const storedProduct = localStorage.getItem('selectedProduct');
  useEffect(() => {
    if (storedProduct) {
      dispatch(getProduct(storedProduct));
    }

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const initialQuantities = storedCart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [dispatch]);

  const cardClick = (item) => {
    dispatch(getSingleProduct(item.id));
    localStorage.setItem('selectedProductId', item.id);
    navigate('/products/view');
  };

  return (
    <div>
      <Button onClick={() => navigate('/')}>Back</Button>
      <div className='grid-container'>
        {productdata?.map((item) => {
          const quantity = quantities[item.id] || 0;

          return (
            <Card
              key={item.id}
              hoverable
              className='grid-item'
              style={{ border: '2px solid black', padding: '20px' }}
              cover={<img alt={item.title} style={{ height: '200px' }} src={item.image} />}
              onClick={() => cardClick(item)}
            >
              <Meta title={item.title} description={`Price: $${item.price}`} />

              <div style={{ marginTop: '10px' }}>
                <Rate allowHalf disabled value={item.rating.rate} />
                <br />
                <span style={{ marginLeft: '8px' }}>({item.rating.count} reviews)</span>
              </div>

              <div
                className='inputContainer'
                style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateCart(item, Math.max(0, quantity - 1), setQuantities);
                  }}
                >
                  -
                </Button>
                <Input
                  type='number'
                  style={{ width: '100px', textAlign: 'center' }}
                  value={quantity}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    const newQuantity = Math.max(0, parseInt(e.target.value) || 0);
                    updateCart(item, newQuantity, setQuantities);
                  }}
                />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateCart(item, quantity + 1, setQuantities);
                  }}
                >
                  +
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default ListItem;
