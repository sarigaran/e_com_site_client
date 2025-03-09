import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategory } from '../redux/slice/product_slice';

const { Meta } = Card;

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorydata } = useSelector((state) => state.productSlice);
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleClick = (item) => {
    navigate(`/products`, { state: { category: item } });
  };
  return (
    <>
      <h1>Category</h1>
      <div className='grid-container'>
        {categorydata?.map((item, index) => (
          <Card
            onClick={() => {
              handleClick(item);
            }}
            style={{ border: '2px solid black', padding: '20px' }}
            key={index}
            hoverable
            className='grid-item'
            cover={
              <img
                alt='Product Image'
                style={{ height: '200px' }}
                src={
                  item === "men's clothing"
                    ? 'src/assets/mendress.jpg'
                    : item === 'electronics'
                    ? 'src/assets/phone.jpg'
                    : item === "women's clothing"
                    ? 'src/assets/womendress.jpg'
                    : item === 'jewelery'
                    ? 'src/assets/chain.jpg'
                    : 'src/assets/flowers.jpg'
                }
              />
            }
          >
            <Meta title={item.charAt(0).toUpperCase() + item.slice(1)} />
          </Card>
        ))}
      </div>
    </>
  );
};

export default HomePage;
