import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../redux/slice/product_slice';
import { useLocation } from 'react-router-dom';
import AddToCart from '../components/input_component';
import { Spin } from 'antd';

function ViewProduct() {
  const location = useLocation();
  const productId = location.state?.productId;
  const dispatch = useDispatch();
  const { singleproductdata, loading } = useSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, []);

  if (!singleproductdata) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin />
        </div>
      ) : (
        <>
          <h1>Product View</h1>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div className='imageWrapper'>
              <img src={singleproductdata.image} alt='image' style={{ height: '200px', width: '200px' }} />
            </div>

            <div className='imageWrapper'>
              <div>
                <h1>{singleproductdata.title}</h1>
                <p>{singleproductdata.description}</p>
                <p>
                  <b>Price: $ {singleproductdata.price}</b>
                </p>
                <AddToCart item={singleproductdata} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ViewProduct;
