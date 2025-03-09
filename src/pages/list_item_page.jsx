import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Rate, Spin } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProduct } from '../redux/slice/product_slice';
import AddToCart from '../components/input_component';

const { Meta } = Card;

function ListItem() {
  const { productdata, loading } = useSelector((state) => state.productSlice);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const category = location.state?.category;

  useEffect(() => {
    dispatch(getProduct(category));
  }, [category, dispatch]);

  const cardClick = (item, event) => {
    if (event) event.stopPropagation();
    navigate(`/products/view`, { state: { productId: item.id } });
  };

  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin />
        </div>
      ) : (
        <div>
          <h1>Product List</h1>
          <div className='grid-container'>
            {productdata?.map((item) => (
              <Card
                key={item.id}
                hoverable
                className='grid-item'
                style={{ border: '2px solid black', padding: '20px' }}
                cover={<img alt={item.title} style={{ height: '200px' }} src={item.image} />}
                onClick={(event) => cardClick(item, event)}
              >
                <Meta title={item.title} description={`Price: $${item.price}`} />

                <div style={{ marginTop: '10px' }}>
                  <Rate allowHalf disabled value={item.rating.rate} />
                  <br />
                  <span style={{ marginLeft: '8px' }}>({item.rating.count} reviews)</span>
                </div>

                <div onClick={(event) => event.stopPropagation()}>
                  <AddToCart item={item} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ListItem;
